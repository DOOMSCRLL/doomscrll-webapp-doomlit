<script lang="ts">
	type Props = {
		progress: number
		segmentCount?: number
		isSelected?: boolean
		ariaLabel?: string
	}

	const { progress, segmentCount = 5, isSelected = false, ariaLabel }: Props = $props()
	const activeSegCount = $derived(Math.ceil(progress * segmentCount))

	const SIZE_SEGMENT = 12
	const WIDTH_STROKE = 3
</script>

<svg
	role="progressbar"
	aria-label={ariaLabel}
	viewBox="0 0 {segmentCount * SIZE_SEGMENT} {SIZE_SEGMENT}"
	class="h-3 w-auto overflow-visible">
	{#each { length: segmentCount }, i}
		{@const cx = SIZE_SEGMENT / 2 + i * SIZE_SEGMENT}
		{@const r = SIZE_SEGMENT / 2}

		{#if !isSelected && i < activeSegCount}
			<circle {cx} cy={SIZE_SEGMENT / 2} {r} class="fill-inverse" />
		{:else if isSelected && i < activeSegCount}
			<circle {cx} cy={SIZE_SEGMENT / 2} {r} class="fill-obverse" />
		{:else if !isSelected && i >= activeSegCount}
			<circle {cx} cy={SIZE_SEGMENT / 2} {r} class="fill-accent" />
		{:else if isSelected && i >= activeSegCount}
			<!--<circle {cx} cy={SIZE_SEGMENT / 2} r="4.5" class="fill-transparent stroke-obverse" stroke-width={WIDTH_STROKE} /> -->
			<circle
				{cx}
				cy={SIZE_SEGMENT / 2}
				r={r - WIDTH_STROKE / 2}
				class="fill-transparent stroke-obverse"
				stroke-width={WIDTH_STROKE} />
		{/if}
	{/each}
</svg>
