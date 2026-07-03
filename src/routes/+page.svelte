<script lang="ts">
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
	import Dropdown from "comps/form/dropdown.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import InlineDoomlitIndicator from "comps/inline-doomlit-indicator.svelte"
	import ReservationForm from "comps/reservation-form.svelte"

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

	let helpModalTrigger = $state<HTMLButtonElement>()

	let isReserving = $state(false)
	function handleReserveClick() {
		isReserving = true
	}
	function handleReservationCancel() {
		isReserving = false
	}
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

{#snippet reservationPreview()}
	<div class="flex w-full justify-center gap-2">
		<InlineDoomlitIndicator current={selectedProgress} max={data.rules.maxReservationsPerDay} />
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
		<!-- < Calendar View -->
		<section class="flex flex-col items-start justify-center gap-4">
			<p class="font-serif text-2xl font-medium tracking-tighter">{dict.copy}</p>
			<CalendarTable
				month={date.month}
				year={date.year}
				reservations={reservationsArray}
				dailyReservationLimit={data.rules.maxReservationsPerDay}
				{prevHref}
				{nextHref}
				bind:selectedDay={selectedDayIso} />
		</section>
		<!-- end Calendar View > -->
		<!-- < Reservation View -->
		<section class="flex h-full flex-col justify-between pb-4">
			<section class="flex h-full flex-col justify-center gap-12">
				<div class="flex flex-col items-center justify-center gap-2">
					<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(selectedDate)}</p>
					<p class="font-mono font-bold tracking-widest uppercase">{fmt.getLongDayName(selectedDate)}</p>
				</div>

				{#if !isReserving}
					{@render reservationPreview()}
				{:else}
					<ReservationForm date={selectedDate} onCancel={handleReservationCancel} />
				{/if}
			</section>
			<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
				{#each Object.values(dict.disclaimer) as d (d)}<li>{d}</li>{/each}
			</ol>
		</section>
		<!-- end Reservation View > -->
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
