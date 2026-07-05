<script lang="ts">
	import { enhance } from "$app/forms"
	import { afterNavigate, invalidateAll } from "$app/navigation"
	import type { PageData } from "./$types"

	import { LOCALE_DEFAULT } from "const/locales"
	import { DateFmtContext, LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"
	import StylisticTimeFormat from "utils/stylistic-time-fmt"

	import BrandNav from "comps/brand-nav.svelte"
	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import CalendarTable from "comps/calendar/calendar-table.svelte"
	import Countdown from "comps/countdown.svelte"
	import Dropdown from "comps/form/dropdown.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ReservationForm from "comps/reservation-form.svelte"
	import ReservationProgress from "comps/reservation-progress.svelte"
	import UrgentModal from "comps/urgent-modal.svelte"

	type Props = {
		data: PageData
	}

	const { data }: Props = $props()

	const currentProfile = ProfileContext.context.value

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf().reservation)
	const fmt = $derived(
		DateFmtContext.context.value || new StylisticTimeFormat(LocaleContext.context.value || LOCALE_DEFAULT),
	)

	let hasDraftExpired = $state(false)

	let selectedCategory = $state<Category>("Video Games")

	// #region Date Management
	const tomorrow = DDate.offsetByDays(DDate.today(), 1)
	const date = $derived(DDate.fromParts({ day: 1, month: data.currentCalendar.month, year: data.currentCalendar.year }))
	const reservationsArray = $derived.by(() => {
		const { daysInMonth } = DDate.getMonthLayout(date)
		return Array.from({ length: daysInMonth }, (_, i) => {
			const key = `${date.year}-${String(date.month).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`
			return data.reservations.counts[key] ?? 0
		})
	})

	type DateQueryString = `/?year=${number}&month=${number}`
	const prevHref = $derived.by<DateQueryString | undefined>(() => {
		if (DDate.getMonthDiff(tomorrow, date) <= 0) return undefined
		else return `/?year=${date.getPreviousMonth().year}&month=${date.getPreviousMonth().month}`
	})
	const nextHref = $derived.by<DateQueryString | undefined>(() => {
		if (DDate.getMonthDiff(tomorrow, date) >= data.rules.reservationWindowDays / 30) return undefined
		else return `/?year=${date.getNextMonth().year}&month=${date.getNextMonth().month}`
	})

	let selectedDayIso = $state(tomorrow.toISOString())
	$effect.pre(() => {
		if (date.isSameMonth(tomorrow)) {
			selectedDayIso = tomorrow.toISOString()
		} else {
			selectedDayIso = DDate.fromParts({ year: date.year, month: date.month, day: 1 }).toISOString()
		}
	})
	const selectedDate = $derived(DDate.fromISOString(selectedDayIso))
	const selectedProgress = $derived(
		selectedDate.year === date.year && selectedDate.month === date.month ? reservationsArray[selectedDate.day - 1] : 0,
	)
	// #endregion

	type PreviewSlugString = `/preview/${string}?category=${string}&reservations=${number}`
	const previewHref = $derived.by<PreviewSlugString>(() => {
		const ctg = encodeURIComponent(selectedCategory)
		return `/preview/${selectedDayIso}?category=${ctg}&reservations=${selectedProgress}`
	})

	let alertMsg = $state<{ title: string; body: string }>()
	let helpModalTrigger = $state<HTMLButtonElement>()

	// #region Reservation Management
	let isReserving = $state(false)
	function handleReserveClick() {
		isReserving = true
	}
	function handleReservationCancel() {
		isReserving = false
	}

	function handleReservationError(details?: { status?: string; message?: string }) {
		alertMsg = { title: dict.statusAlerts.reservation.error.title, body: details?.message ?? "" }
	}
	function handleReservationFail(details?: { status?: string; message?: string }) {
		alertMsg = { title: dict.statusAlerts.reservation.failure.title, body: details?.message ?? "" }
	}
	// #endregion

	// Guard for the case where user navigates back after confirming/cancelling their DOOMLIT.
	afterNavigate(({ type }) => {
		if (type === "popstate") invalidateAll()
	})
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

{#snippet reservationPreview()}
	<div class="flex w-full justify-center gap-2">
		<ReservationProgress current={selectedProgress} max={data.rules.maxReservationsPerDay} />
		<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.cta.suffixSlotInfo}</p>
	</div>
	{#if selectedProgress >= data.rules.maxReservationsPerDay}
		<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.noReservationCopy}</p>
	{:else}
		<div class="flex flex-col gap-4">
			<section class="flex gap-4">
				<Dropdown
					label={dict.cta.categoryDropdown.label}
					name="preview-category"
					placeholder={dict.cta.categoryDropdown.placeholder}
					doHideLabel={true}
					options={getCategories().map((c) => ({ label: getCategoryLabelFor(c, locale), value: c }))}
					bind:value={selectedCategory} />
				<SlabAnchor href={previewHref} alignment="center" fit="max" variant="outlined">
					<Icon icon="Doomeye" />
					{dict.cta.labelPreview}
				</SlabAnchor>
			</section>

			{#if !currentProfile}
				<SlabButton alignment="center" fit="max" variant="filled" isDisabled={true}>
					<Icon icon="DoomeyeClosed" />
					{dict.cta.labelSignin}
				</SlabButton>
			{:else}
				<SlabButton alignment="center" fit="max" variant="filled" onClick={handleReserveClick}>
					{dict.cta.labelReserve}
					<Icon icon="ArrowForward" />
				</SlabButton>
			{/if}
		</div>
	{/if}
{/snippet}

<main class="grid h-screen w-full grid-rows-[auto_1fr] gap-4 overflow-hidden px-6 supports-[height:100dvh]:h-dvh">
	<BrandNav bind:helpModalTrigger activeDraftRefId={data.activeDraftId} />
	<section class="grid h-full w-full grid-cols-2 gap-12">
		<!-- #region Calendar View -->
		<section class="flex flex-col items-start justify-center gap-4">
			<p class="font-serif text-2xl font-medium tracking-tighter">{dict.copy}</p>
			<CalendarTable
				month={date.month}
				year={date.year}
				reservations={reservationsArray}
				dailyReservationLimit={data.rules.maxReservationsPerDay}
				{prevHref}
				{nextHref}
				isInteractive={!isReserving}
				bind:selectedDay={selectedDayIso} />
		</section>
		<!-- #endregion Calendar View > -->
		<!-- #region Reservation View -->
		<section class="flex h-full flex-col justify-between pb-4">
			<section class="flex h-full flex-col justify-center gap-12">
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(selectedDate)}</p>
					<p class="font-mono font-bold tracking-widest uppercase">{fmt.getLongDayName(selectedDate)}</p>
				</div>

				{#if !isReserving}
					{@render reservationPreview()}
				{:else}
					<ReservationForm
						date={selectedDate}
						onCancel={handleReservationCancel}
						onError={handleReservationError}
						onFail={handleReservationFail} />
				{/if}
			</section>
			<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
				{#each Object.values(dict.disclaimer) as d (d)}<li>{d}</li>{/each}
			</ol>
		</section>
		<!-- #endregion Reservation View > -->
	</section>
</main>

{#if data.activeDraftId !== undefined}
	{const header = $derived(!hasDraftExpired ? dict.activeDraftWarning.title : dict.activeDraftWarning.postExpiration.title)}
	{const body = $derived(!hasDraftExpired ? dict.activeDraftWarning.body : dict.activeDraftWarning.postExpiration.body)}
	<UrgentModal {header} {body}>
		{#snippet actions()}
			{#if !hasDraftExpired}
				<form
					action="?/cancelDraft"
					method="POST"
					use:enhance={() =>
						async ({ result, update }) => {
							const cancelDict = dict.statusAlerts.cancellation
							if (result.type === "success") {
								alertMsg = { title: cancelDict.success.title, body: cancelDict.success.body }
							} else if (result.type === "failure") {
								alertMsg = { title: cancelDict.failure.title, body: result.data!.message as string }
							} else {
								alertMsg = { title: cancelDict.error.title, body: `${cancelDict.error.bodyPrefix} ${result.status}` }
							}
							update()
						}}>
					<input type="hidden" name="activeDraftId" value={data.activeDraftId} />
					<SlabButton variant="outlined" alignment="left" fit="max" hasAccent={true} buttonType="submit">
						<Icon icon="Remove" />
						{dict.activeDraftWarning.labelCancel}
					</SlabButton>
				</form>
				<SlabAnchor href="/reserve/{data.activeDraftId}" variant="filled" alignment="right" fit="max">
					{dict.activeDraftWarning.labelProceed}
					<Icon icon="ArrowForward" />
				</SlabAnchor>
				<Countdown
					durationMins={data.rules.draftExpirationMinutes}
					startTimestamp={new Date(data.activeDraftReservedAt!)}
					onCountdownEnd={() => (hasDraftExpired = true)} />
			{:else}
				<form
					action="?/cancelDraft"
					method="POST"
					use:enhance={() =>
						async ({ result, update }) => {
							const cancelDict = dict.statusAlerts.cancellation
							if (result.type === "success") {
								alertMsg = { title: cancelDict.success.title, body: cancelDict.success.body }
							} else if (result.type === "failure") {
								alertMsg = { title: cancelDict.failure.title, body: result.data!.message as string }
							} else {
								alertMsg = { title: cancelDict.error.title, body: `${cancelDict.error.bodyPrefix} ${result.status}` }
							}
							update()
						}}>
					<input type="hidden" name="activeDraftId" value={data.activeDraftId} />
					<SlabButton variant="outlined" alignment="left" fit="max" hasAccent={true} buttonType="submit">
						<Icon icon="ArrowBack" />
						{dict.activeDraftWarning.postExpiration.labelReturn}
					</SlabButton>
				</form>
			{/if}
		{/snippet}
	</UrgentModal>
{/if}

{#if alertMsg}
	<UrgentModal header={alertMsg.title} body={alertMsg.body}>
		{#snippet actions()}
			<SlabButton variant="filled" fit="max" onClick={() => (alertMsg = undefined)}
				>{dict.statusAlerts.labelClose}</SlabButton>
		{/snippet}
	</UrgentModal>
{/if}

<HelpModal bind:trigger={helpModalTrigger} />
