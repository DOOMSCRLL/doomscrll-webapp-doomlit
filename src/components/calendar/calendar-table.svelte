<script lang="ts">
	import { LOCALE_DEFAULT } from "const/locales"
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import DDate from "utils/d-date"
	import StylisticTimeFormat from "utils/stylistic-time-fmt"

	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DayCard from "./day-card.svelte"

	type Props = {
		month: number
		year: number
		reservations: number[]
		dailyReservationLimit: number
		selectedDay?: string
		prevHref?: `/?year=${number}&month=${number}`
		nextHref?: `/?year=${number}&month=${number}`
		isInteractive?: boolean
	}

	// TODO: Add a floating marker on the right edge of the calendar.
	let {
		month,
		year,
		reservations,
		dailyReservationLimit,
		selectedDay = $bindable(),
		prevHref,
		nextHref,
		isInteractive = true,
	}: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).reservation.calendar)
	const dateFmt = $derived(
		DateFmtContext.context.value || new StylisticTimeFormat(LocaleContext.context.value || LOCALE_DEFAULT),
	)

	const monthStart = $derived(DDate.fromParts({ year, month, day: 1 }))
	const weekdays = $derived(dateFmt.getAllShortDayNames())
	const monthLayout = $derived(DDate.getMonthLayout(monthStart))
	const leadingOffset = $derived(monthLayout.leadingEnd - monthLayout.leadingDays + 1)

	const today = DDate.today()

	const dayControlName = "day-control"
</script>

<div
	class={[
		"flex h-min w-full flex-col items-center gap-4 overflow-clip rounded-3xl border-4 border-inverse px-2 py-2",
		!isInteractive && "relative",
	]}>
	{#if !isInteractive}
		<div class="absolute inset-0 z-20 flex h-full w-full items-center justify-center bg-[black]/95">
			<p class="w-60/100 font-serif text-3xl font-medium text-inverse italic">{dict.textNotInteractiveWarn}</p>
		</div>
	{/if}
	<section class="grid w-fit grid-cols-[1fr_auto_1fr] items-center gap-6 [&>h2]:col-2 [&>h2+a]:col-3">
		{#if prevHref}
			<SlabAnchor href={prevHref} ariaLabel={dict.labelPrevious} fit="square">
				<Icon icon="ArrowBack" />
			</SlabAnchor>
		{/if}
		<h2 class="font-mono text-2xl tracking-widest uppercase">{dateFmt.getCalendarHeader({ year, month })}</h2>
		{#if nextHref}
			<SlabAnchor href={nextHref} ariaLabel={dict.labelNext} fit="square">
				<Icon icon="ArrowForward" />
			</SlabAnchor>
		{/if}
	</section>
	<section class="grid h-min w-full grid-cols-7 justify-items-center">
		{#each weekdays as day, i (`CALENDAR_DAY_ROW_DAY_${i}`)}
			<p class="font-mono text-sm font-bold tracking-widest text-inverse uppercase">{day}</p>
		{/each}
	</section>
	<section class="grid w-full auto-rows-[4rem] grid-cols-7 gap-2">
		{#if monthLayout.leadingDays > 0}
			{#each { length: monthLayout.leadingDays }, i}
				<DayCard
					date={DDate.fromParts({ year, month: month - 1, day: leadingOffset + i })}
					inputName={dayControlName}
					isPadding={true}
					bind:selectedDay />
			{/each}
		{/if}
		{#each { length: monthLayout.daysInMonth }, i}
			{@const date = DDate.fromParts({ year, month, day: i + 1 })}
			<DayCard
				{date}
				inputName={dayControlName}
				isPadding={date.isPrior(today) || date.isEqual(today)}
				reservationLimit={dailyReservationLimit}
				progress={reservations[i]}
				bind:selectedDay />
		{/each}
		{#if monthLayout.trailingDays > 0}
			{#each { length: monthLayout.trailingDays }, i}
				<DayCard
					date={DDate.fromParts({ year, month: month + 1, day: i + 1 })}
					inputName={dayControlName}
					isPadding={true}
					bind:selectedDay />
			{/each}
		{/if}
	</section>
</div>
