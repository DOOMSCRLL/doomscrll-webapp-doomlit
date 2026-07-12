<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import Icon from "comps/icons/icon.svelte"
	import Tooltip from "comps/tooltip.svelte"
	import SlabButton from "./slab-button.svelte"

	const { content, id } = $props()

	const tooltipLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.labelTooltip)

	let buttonRef = $state<HTMLButtonElement>()
	let isTooltipActive = $state(false)

	$effect(() => {
		if (!buttonRef) return

		function showTooltip() {
			isTooltipActive = true
		}
		function hideTooltip() {
			isTooltipActive = false
		}

		buttonRef.addEventListener("mouseenter", showTooltip)
		buttonRef.addEventListener("mouseleave", hideTooltip)
		return () => {
			buttonRef?.removeEventListener("mouseenter", showTooltip)
			buttonRef?.removeEventListener("mouseleave", hideTooltip)
		}
	})
</script>

<SlabButton variant="text" fit="square" size="small" bind:reference={buttonRef}>
	<span class="sr-only">{tooltipLabel}</span>
	<Icon icon="Help" size="small" />
</SlabButton>

<Tooltip {id} isOpen={isTooltipActive} trigger={buttonRef}>
	<p class="whitespace-pre-line">{content}</p>
</Tooltip>
