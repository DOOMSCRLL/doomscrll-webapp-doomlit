<script lang="ts">
	import { positionTooltipTo } from "attcs/position-tooltip-to"
	import type { Snippet } from "svelte"
	import { fade } from "svelte/transition"

	type Props = {
		id?: string
		isOpen?: boolean
		trigger?: HTMLButtonElement
		children?: Snippet
	}
	const { children, trigger, isOpen = false, id }: Props = $props()

	const tooltipId = $derived(id ?? `tooltip_${Math.random().toString(36).slice(2, 9)}`)
</script>

{#if isOpen && trigger}
	<div
		role="tooltip"
		id={tooltipId}
		class={[
			"absolute z-50 flex h-min w-fit max-w-40/100 flex-col items-start justify-center gap-2",
			"arrow-decor-left ml-4 rounded-3xl border-3 border-inverse bg-obverse p-4",
			"pointer-events-none",
		]}
		{@attach positionTooltipTo({ anchor: trigger })}
		transition:fade={{ duration: 150 }}>
		{@render children?.()}
	</div>
{/if}
