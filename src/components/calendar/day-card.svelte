<script lang="ts">
	import type DDate from "utils/d-date"
	import DoomlitIndicator from "./doomlit-indicator.svelte"

	type Props = {
		inputName: string
		date: DDate
		isPadding?: boolean
		selectedDay?: string
	}

	let { inputName, date, isPadding = false, selectedDay = $bindable() }: Props = $props()

	const dateStr = $derived(date.toISOString())
	const dayId = $derived(`DAY_CARD_${dateStr}`)

	const isSelectedDay = $derived(dateStr === selectedDay)
	// TODO: Add progress fetching for reservation slot indicator
</script>

<div aria-label={dateStr}>
	<input
		type="radio"
		id={dayId}
		name={inputName}
		value={dateStr}
		disabled={isPadding}
		class="peer sr-only"
		bind:group={selectedDay} />
	<label
		for={dayId}
		class={[
			"flex h-full w-full flex-col items-center justify-evenly rounded-2xl bg-obverse",
			"cursor-pointer font-mono font-bold tracking-widest text-inverse",
			"peer-disabled:cursor-not-allowed peer-disabled:text-accent",
			"outline-inverse peer-enabled:peer-hover:outline-3 peer-enabled:peer-active:bg-accent",
			"peer-checked:bg-inverse peer-checked:text-obverse",
		]}>
		{date.day}
		{#if !isPadding}<DoomlitIndicator progress={0} segmentCount={5} isSelected={isSelectedDay} />{/if}
	</label>
</div>
