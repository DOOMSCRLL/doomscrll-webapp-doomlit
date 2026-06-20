<script lang="ts">
	import type { PageData } from "./$types"

	import { DateFmtContext, LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import IconButton from "comps/buttons/icon-button.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import CalendarAnchor from "comps/calendar/calendar-anchor.svelte"
	import CalendarTable from "comps/calendar/calendar-table.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"
	import InlineDoomlitIndicator from "comps/inline-doomlit-indicator.svelte"
	import ProfileButton from "comps/profile-button.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	let helpModalTrigger = $state<HTMLButtonElement>()

	const dict = getDictionaryOf(LocaleContext.context.value).reservation
	const fmt = DateFmtContext.context.value!

	const today = DDate.today()
	const date = $derived(DDate.fromParts({ day: 1, month: data.currentCalendar.month, year: data.currentCalendar.year }))

	const [prevDate, nextDate] = $derived([date.getPreviousMonth(), date.getNextMonth()])

	const maxMonthsInFuture = $derived(Math.ceil(data.rules.reservationWindowDays / 30))
	const currentOffsetMonths = $derived((date.year - today.year) * 12 + (date.month - today.month))
	const canGoNext = $derived(currentOffsetMonths < maxMonthsInFuture)
	const canGoPrev = $derived(currentOffsetMonths > 0)

	const reservationsArray = $derived.by(() => {
		const { daysInMonth } = DDate.getMonthLayout(date)
		return Array.from({ length: daysInMonth }).map((_, i) => {
			const dayNum = i + 1
			const key = `${date.year}-${String(date.month).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`
			return data.reservations.counts[key] ?? 0
		})
	})

	const defaultSelectedDay = $derived(
		date.year === today.year && date.month === today.month
			? today.toISOString()
			: DDate.fromParts({ year: date.year, month: date.month, day: 1 }).toISOString(),
	)

	let selectedDay = $derived(defaultSelectedDay)

	const activeDate = $derived(DDate.fromISOString(selectedDay))
	const activeProgress = $derived(
		activeDate.year === date.year && activeDate.month === date.month ? reservationsArray[activeDate.day - 1] : 0,
	)

	const currentProfile = ProfileContext.context.value
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="grid h-screen w-full grid-cols-2 gap-12 overflow-hidden px-8 supports-[height:100dvh]:h-dvh">
	<!-- < Calendar View -->
	<section class="flex flex-col items-start justify-between pb-4">
		<DoomscrllWordmark />
		<p class="font-serif text-2xl font-medium tracking-tighter">{dict.copy}</p>
		<CalendarTable
			month={date.month}
			year={date.year}
			reservations={reservationsArray}
			dailyReservationLimit={data.rules.maxReservationsPerDay}
			bind:selectedDay />

		<div class="flex items-center gap-4">
			{#if canGoPrev}
				<CalendarAnchor
					month={prevDate.month}
					year={prevDate.year}
					direction="backward"
					href={`/?year=${prevDate.year}&month=${prevDate.month}`} />
			{/if}
			{#if canGoNext}
				<CalendarAnchor
					month={nextDate.month}
					year={nextDate.year}
					direction="forward"
					href={`/?year=${nextDate.year}&month=${nextDate.month}`} />
			{/if}
		</div>
	</section>
	<!-- end Calendar View > -->

	<section class="flex flex-col justify-between py-4">
		<nav class="flex w-full justify-between">
			<IconButton icon="Help" variant="text" renderDecors={false} bind:reference={helpModalTrigger} />

			<ProfileButton />
		</nav>

		<section class="flex flex-col gap-12">
			<div class="flex flex-col items-center justify-center gap-2">
				<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(activeDate)}</p>
				<p class="font-mono font-bold tracking-widest uppercase">{fmt.getLongDayName(activeDate)}</p>
			</div>
			<div class="flex w-full justify-center gap-2">
				<InlineDoomlitIndicator current={activeProgress} max={data.rules.maxReservationsPerDay} />
				<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.cta.suffixSlotInfo}</p>
			</div>
			{#if activeProgress >= data.rules.maxReservationsPerDay}
				<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.noReservationCopy}</p>
			{:else}
				<div class="flex flex-col gap-4">
					<SlabButton alignment="center" fit="max" variant="outlined">
						<Icon icon="Doomeye" />
						{dict.cta.labelPreview}
					</SlabButton>

					{#if !currentProfile}
						<SlabButton alignment="center" fit="max" variant="filled" isDisabled={true}>
							<Icon icon="DoomeyeClosed" />
							{dict.cta.labelSignin}
						</SlabButton>
					{:else}
						<SlabButton alignment="center" fit="max" variant="filled">
							<Icon icon="Purchase" />
							{dict.cta.labelReserve}
						</SlabButton>
					{/if}
				</div>
			{/if}
		</section>

		<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
			{#each Object.values(dict.disclaimer) as d (d)}<li>{d}</li>{/each}
		</ol>
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
