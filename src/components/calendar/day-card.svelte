<script lang="ts">
	import StylisticTimeFormat from "utils/date-utils/stylistic-time-fmt"

	type Props = {
		key: string
		inputName: string
		day: number
		monthIndex: number
		year: number
		isPadding?: boolean
		selectedDay?: string
	}

	let { key, inputName, day, monthIndex, year, selectedDay = $bindable(), isPadding = false }: Props = $props()
</script>

<div aria-label={key}>
	<input
		type="radio"
		id={key}
		name={inputName}
		value={StylisticTimeFormat.toIsoDate([year, monthIndex, day])}
		disabled={isPadding}
		bind:group={selectedDay}
		class="peer sr-only"
	/>
	<label
		for={key}
		class={[
			"flex h-full w-full flex-col items-center justify-center bg-obverse",
			"cursor-pointer font-mono text-xl font-bold tracking-widest text-inverse",
			"peer-disabled:cursor-not-allowed peer-disabled:text-accent",
			"peer-checked:bg-inverse peer-checked:text-obverse",
		]}
	>
		{day}
	</label>
</div>
