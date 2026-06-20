<script lang="ts">
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import DayCard from "./day-card.svelte"

	type Props = {
		month: number
		year: number
		reservations: number[]
		dailyReservationLimit?: number
	}

	const { month, year, reservations, dailyReservationLimit = 256 }: Props = $props()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dict = getDictionaryOf(LocaleContext.context.value)
	const dateFmt = DateFmtContext.context.value!

	const weekdays = dateFmt.getAllShortDayNames()
	const monthLayout = $derived(DDate.getMonthLayout(DDate.fromParts({ year, month, day: 1 })))
	const leadingOffset = $derived(monthLayout.leadingEnd - monthLayout.leadingDays + 1)

	const dayControlName = "day-control"
	let selectedDay = $state(DDate.today().toISOString())
	// TODO: Add a floating marker on the right edge of the calendar.
</script>

<div class="flex h-min w-full flex-col gap-2 overflow-clip rounded-3xl border-4 border-inverse px-2 py-2">
	<section class="flex h-min w-full items-center justify-center gap-2">
		<Icon icon="Starmark" size="normal" />
		<h2 class="font-mono tracking-widest uppercase">{dateFmt.getCalendarHeader({ year, month })}</h2>
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
			<DayCard
				date={DDate.fromParts({ year, month, day: i + 1 })}
				inputName={dayControlName}
				isPadding={false}
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
