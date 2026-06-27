<script lang="ts">
	import { fade } from "svelte/transition"

	import { positionTooltipTo } from "attcs/position-tooltip-to"

	const { children, trigger, open = false } = $props()

	const id = `tooltip_${Math.random().toString(36).slice(2, 9)}`
</script>

{#if open && trigger}
	<div
		role="tooltip"
		{id}
		class={[
			"absolute z-50 flex h-min w-min min-w-xs flex-col items-start justify-center",
			"arrow-decor-left ml-4 rounded-3xl border-3 border-inverse bg-obverse p-4",
			"pointer-events-none",
		]}
		{@attach positionTooltipTo({ anchor: trigger })}
		transition:fade={{ duration: 200 }}>
		{@render children?.()}
	</div>
{/if}
