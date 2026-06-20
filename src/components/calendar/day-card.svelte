<script lang="ts">
	import type DDate from "utils/d-date"
	import DoomlitIndicator from "./doomlit-indicator.svelte"

	type Props = {
		inputName: string
		date: DDate
		isPadding?: boolean
		selectedDay?: string
		reservationLimit?: number
		progress?: number
	}

	let {
		inputName,
		date,
		isPadding = false,
		selectedDay = $bindable(),
		reservationLimit = 1,
		progress = 0,
	}: Props = $props()

	const dateStr = $derived(date.toISOString())
	const dayId = $derived(`DAY_CARD_${dateStr}`)

	const isSelectedDay = $derived(dateStr === selectedDay)

	const normalizedProgress = $derived.by(() => {
		if (isPadding) return 0
		else return Math.round((progress / reservationLimit) * 1000) / 1000
	})
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
		{#if !isPadding}<DoomlitIndicator progress={normalizedProgress} segmentCount={5} isSelected={isSelectedDay} />{/if}
	</label>
</div>
