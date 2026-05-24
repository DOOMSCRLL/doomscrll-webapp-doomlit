<script lang="ts">
	import DateFmtContext from "contexts/date-format-context"
	import LocaleContext from "contexts/locale-context"
	import { getDictionaryOf } from "repos/locales"

	import Icon from "comps/icons/icon.svelte"
	import getMonthLayout from "utils/date-utils/get-month-layout"
	import StylisticTimeFormat from "utils/date-utils/stylistic-time-fmt"
	import DayCard from "./day-card.svelte"

	interface Props {
		month: number
		year: number
	}

	const { month, year }: Props = $props()

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dict = getDictionaryOf(LocaleContext.getContext())
	const dateFmt = DateFmtContext.getContext()

	const weekdays = dateFmt.getAllShortDayNames()
	const monthLayout = $derived(getMonthLayout(month, year))

	const leadingOffset = $derived(monthLayout.prevMonthEnd - monthLayout.leadingDays + 1)

	const dayControlName = "day-control"

	let selectedDay = $state(StylisticTimeFormat.toIsoDate(new Date()))

	function generateDateKey(day: number, monthDirection: "previous" | "current" | "next"): string {
		switch (monthDirection) {
			case "previous":
				if (month === 0) return `${year - 1}-${11}-${day}`
				else return `${year}-${month - 1}-${day}`
			case "current":
				return `${year}-${month}-${day}`
			case "next":
				if (month === 11) return `${year + 1}-${0}-${day}`
				else return `${year}-${month + 1}-${day}`
		}
	}
</script>

<div class="h-min w-80">
	<section class="flex h-min w-full gap-4">
		<Icon icon="Starmark" />
		<h2 class="font-mono text-2xl tracking-wider uppercase">{dateFmt.getCalendarHeader(new Date(year, month, 1))}</h2>
	</section>

	<section class="grid h-min w-full grid-cols-7 items-center">
		{#each weekdays as day, i (`CALENDAR_DAY_ROW_DAY_${i}`)}
			<p class="font-mono text-xl font-bold tracking-widest text-inverse">{day}</p>
		{/each}
	</section>

	<section class="grid w-full auto-rows-[5rem] grid-cols-7">
		{#if monthLayout.leadingDays > 0}
			{#each { length: monthLayout.leadingDays }, i}
				<DayCard
					key={generateDateKey(leadingOffset + i, "previous")}
					day={leadingOffset + i}
					monthIndex={month === 0 ? 11 : month - 1}
					year={month === 0 ? year - 1 : year}
					inputName={dayControlName}
					isPadding={true}
					bind:selectedDay
				/>
			{/each}
		{/if}
		{#each { length: monthLayout.daysInMonth }, i}
			<DayCard
				key={generateDateKey(i + 1, "current")}
				day={i + 1}
				monthIndex={month}
				{year}
				inputName={dayControlName}
				isPadding={false}
				bind:selectedDay
			/>
		{/each}
		{#if monthLayout.trailingDays > 0}
			{#each { length: monthLayout.trailingDays }, i}
				<DayCard
					key={generateDateKey(i + 1, "next")}
					day={i + 1}
					monthIndex={month === 11 ? 0 : month + 1}
					year={month === 11 ? year + 1 : year}
					inputName={dayControlName}
					isPadding={true}
					bind:selectedDay
				/>
			{/each}
		{/if}
	</section>
</div>
