<script lang="ts">
	type Props = {
		progress: number
		segmentCount?: number
		isSelected?: boolean
		ariaLabel?: string
	}

	const { progress, segmentCount = 5, isSelected = false, ariaLabel }: Props = $props()
	const activeSegCount = $derived(Math.ceil(progress * segmentCount))
</script>

<div role="progressbar" aria-label={ariaLabel} class="flex h-min w-min">
	{#each { length: segmentCount }, i}
		<span
			aria-hidden={true}
			class={[
				"h-3 w-3 rounded-[50%]",
				{
					"bg-inverse": !isSelected && i < activeSegCount,
					"bg-obverse": isSelected && i < activeSegCount,
					"bg-accent": !isSelected && i >= activeSegCount,
					"inset-ring-3 inset-ring-obverse": isSelected && i >= activeSegCount,
				},
			]}
		></span>
	{/each}
</div>
