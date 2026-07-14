<script lang="ts">
	import type { Snippet } from "svelte"
	import { fade } from "svelte/transition"

	import { positionTooltipTo, type TooltipAlignment } from "attcs/position-tooltip-to"
	import ttm from "utils/type-literal-to-class"

	type Props = {
		id?: string
		isOpen?: boolean
		trigger?: HTMLElement
		children?: Snippet
		alignment?: TooltipAlignment
	}
	const { children, trigger, isOpen = false, id, alignment = "right" }: Props = $props()

	const tooltipId = $derived(id ?? `tooltip_${Math.random().toString(36).slice(2, 9)}`)
	let innerAlignment = $state<TooltipAlignment>()
	let renderedAlignment = $derived(innerAlignment ?? alignment)

	function handlePositionChange(a: TooltipAlignment) {
		innerAlignment = a
	}
</script>

{#if isOpen && trigger}
	<div
		role="tooltip"
		id={tooltipId}
		class={[
			"fixed z-50 flex h-min w-fit max-w-40/100 flex-col items-start justify-center gap-2",
			"rounded-3xl border-3 border-inverse bg-obverse p-4",
			"pointer-events-none",
			ttm(renderedAlignment, {
				left: "arrow-decor-right",
				right: "arrow-decor-left",
			}),
		]}
		{@attach positionTooltipTo({ anchor: trigger, alignment, onPositionChange: handlePositionChange })}
		transition:fade={{ duration: 150 }}>
		{@render children?.()}
	</div>
{/if}
