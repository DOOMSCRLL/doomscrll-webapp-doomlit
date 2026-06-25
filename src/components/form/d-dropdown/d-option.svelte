<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		label: string
		value: string
		isHighlighted?: boolean
		isSelected?: boolean
		onHover?: (event: PointerEvent) => void
		onSelect?: (value: string) => void
	}

	const { label, value, isSelected = false, isHighlighted = false, onHover, onSelect }: Props = $props()
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<li
	role="option"
	id="opt-{value}"
	aria-selected={isSelected}
	tabindex={isHighlighted ? 0 : -1}
	onclick={() => onSelect?.(value)}
	onpointermove={onHover}
	data-highlighted={isHighlighted}
	data-selected={isSelected}
	class={[
		"flex h-min w-full cursor-pointer items-center justify-start gap-1 select-none",
		"px-2 py-1 font-serif text-2xl font-medium tracking-wide text-nowrap whitespace-nowrap text-inverse",
		"rounded-2xl bg-obverse transition-all duration-150",
		"data-[highlighted=true]:bg-inverse data-[highlighted=true]:text-obverse",
		"data-[selected=true]:italic data-[selected=true]:outline-1",
	]}>
	{#if isSelected}
		<Icon icon="Starmark" size="small" />
	{/if}
	{label}
</li>
