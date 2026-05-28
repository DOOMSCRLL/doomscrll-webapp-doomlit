<script lang="ts">
	import type DDate from "utils/d-date"

	type Props = {
		inputName: string
		date: DDate
		isPadding?: boolean
		selectedDay?: string
	}

	let { inputName, date, isPadding = false, selectedDay = $bindable() }: Props = $props()

	const dateStr = $derived(date.toISOString())
	const dayId = $derived(`DAY_CARD_${dateStr}`)
</script>

<div aria-label={dateStr}>
	<input
		type="radio"
		id={dayId}
		name={inputName}
		value={dateStr}
		disabled={isPadding}
		class="peer sr-only"
		bind:group={selectedDay}
	/>
	<label
		for={dayId}
		class={[
			"flex h-full w-full flex-col items-center justify-center rounded-2xl bg-obverse",
			"cursor-pointer font-mono text-[1rem] font-bold tracking-widest text-inverse",
			"peer-disabled:cursor-not-allowed peer-disabled:text-accent",
			"box-border border-inverse peer-enabled:peer-hover:border-3 peer-enabled:peer-active:bg-accent",
			"peer-checked:bg-inverse peer-checked:text-obverse",
		]}
	>
		{date.day}
	</label>
</div>
