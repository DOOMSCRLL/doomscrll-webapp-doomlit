<script lang="ts">
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	import { untrack } from "svelte"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import { resolve } from "$app/paths"
	import BrandNav from "comps/brand-nav.svelte"
	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import CalendarTable from "comps/calendar/calendar-table.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ReservationProgress from "comps/reservation-progress.svelte"
	import UrgentModal from "comps/urgent-modal.svelte"

	const { data } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlitReschedule)
	const fmt = $derived(DateFmtContext.context.value!)

	const tomorrow = DDate.offsetByDays(DDate.today(), 1)

	const calendarDate = $derived(
		DDate.fromParts({ day: 1, month: data.currentCalendar.month, year: data.currentCalendar.year }),
	)
	const reservationsArray = $derived.by(() => {
		const { daysInMonth } = DDate.getMonthLayout(calendarDate)
		return Array.from({ length: daysInMonth }, (_, i) => {
			const key = `${calendarDate.year}-${String(calendarDate.month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
			return data.reservations.counts[key] ?? 0
		})
	})

	const initialDayIso = $derived(data.project.showcaseDate)
	const initialDay = $derived(DDate.fromISOString(initialDayIso))

	let selectedDayIso = $state<string>(untrack(() => initialDayIso))
	const selectedDay = $derived(DDate.fromISOString(selectedDayIso))
	const selectedProgress = $derived(
		selectedDay.year === calendarDate.year && selectedDay.month === calendarDate.month
			? reservationsArray[selectedDay.day - 1]
			: 0,
	)

	const isSelectedDayValid = $derived<boolean>(!selectedDay.isPrior(tomorrow) && !selectedDay.isEqual(initialDay))

	type DateQueryString = `?year=${number}&month=${number}`
	const prevHrefQ = $derived.by<DateQueryString | undefined>(() => {
		if (DDate.getMonthDiff(tomorrow, calendarDate) <= 0) return undefined
		return `?year=${calendarDate.getPreviousMonth().year}&month=${calendarDate.getPreviousMonth().month}`
	})
	const nextHrefQ = $derived.by<DateQueryString | undefined>(() => {
		return `?year=${calendarDate.getNextMonth().year}&month=${calendarDate.getNextMonth().month}`
	})

	let statusMsg = $state<{ title: string; body: string; isSuccess?: boolean }>()
	let helpModalTrigger = $state<HTMLButtonElement>()
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix} {data.project.name} | DOOMSCRLL</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="grid h-screen w-full grid-rows-[auto_1fr] gap-4 overflow-hidden px-6 supports-[height:100dvh]:h-dvh">
	<BrandNav hasDoomlitsMenu={false} bind:helpModalTrigger />
	<section class="grid h-full w-full grid-cols-2 items-center gap-12">
		<CalendarTable
			month={calendarDate.month}
			year={calendarDate.year}
			reservations={reservationsArray}
			dailyReservationLimit={data.rules.maxReservationsPerDay}
			prevHref={prevHrefQ && `/doomlits/${data.project.referenceId}/reschedule${prevHrefQ}`}
			nextHref={nextHrefQ && `/doomlits/${data.project.referenceId}/reschedule${nextHrefQ}`}
			bind:selectedDay={selectedDayIso} />
		<section class="flex h-full w-full flex-col justify-evenly">
			<section class="flex w-full flex-col items-center gap-4">
				<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.labelPrevDate}:</p>
				<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(initialDay)}</p>
			</section>
			<hr class="w-full border-inverse" />
			<section class="flex w-full flex-col gap-4">
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(selectedDay)}</p>
					<p class="font-mono font-bold tracking-widest uppercase">{fmt.getLongDayName(selectedDay)}</p>
				</div>
				<div class="flex w-full justify-center gap-2">
					<ReservationProgress current={selectedProgress} max={data.rules.maxReservationsPerDay} />
					<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.labelSuffixReserv}</p>
				</div>
			</section>
			<form
				action="?/reschedule"
				method="POST"
				class="flex w-full gap-4"
				use:enhance={() =>
					async ({ result, update }) => {
						if (result.type === "success") {
							statusMsg = {
								isSuccess: true,
								title: dict.statusMsg.success.title,
								body: dict.statusMsg.success.body,
							}
						} else if (result.type === "failure") {
							statusMsg = {
								title: dict.statusMsg.fail.title,
								body: dict.statusMsg.fail.body,
							}
						} else if (result.type === "error") {
							statusMsg = {
								title: dict.statusMsg.error.title,
								body: dict.statusMsg.error.body,
							}
						}
						update()
					}}>
				<input type="hidden" name="newDate" value={selectedDayIso} />
				<SlabAnchor href="/doomlits/{data.project.referenceId}" variant="outlined" fit="max">
					<Icon icon="ArrowBack" />
					{dict.actions.labelBack}
				</SlabAnchor>
				<SlabButton variant="filled" fit="max" buttonType="submit" isDisabled={!isSelectedDayValid}>
					<Icon icon="Upload" />
					{isSelectedDayValid ? dict.actions.labelValid : dict.actions.labelInvalid}
				</SlabButton>
			</form>
		</section>
	</section>
</main>

{#if statusMsg}
	<UrgentModal header={statusMsg.title} body={statusMsg.body}>
		{#snippet actions()}
			<SlabButton
				variant="filled"
				fit="max"
				onClick={() => {
					const success = statusMsg?.isSuccess
					statusMsg = undefined
					if (success) goto(resolve(`/doomlits/${data.project.referenceId}`))
				}}>{statusMsg?.isSuccess ? dict.statusMsg.action.labelClose : dict.statusMsg.action.labelReturn}</SlabButton>
		{/snippet}
	</UrgentModal>
{/if}

<HelpModal bind:trigger={helpModalTrigger} />
