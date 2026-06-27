<script lang="ts">
	import type { ProjectPreview } from "models/project"
	import type ProjectTag from "models/project-tag"

	import Icon from "comps/icons/icon.svelte"
	import { TAG_NO_TAG } from "const/tags"

	type Props = {
		preview: ProjectPreview
		index: number
		onHover?: (tag: ProjectTag, index: number, trigger: HTMLElement) => void
		onHoverEnd?: () => void
	}

	const { preview, index, onHover, onHoverEnd }: Props = $props()

	let isHovering = $state(false)

	function handleMouseEnter(event: MouseEvent): void {
		isHovering = true
		onHover?.(preview.tags[0] ?? TAG_NO_TAG, index, event.currentTarget as HTMLElement)
	}
	function handleMouseLeave(): void {
		isHovering = false
		onHoverEnd?.()
	}
</script>

<li
	class={[
		"list-none font-serif text-xl tracking-tight text-inverse",
		"flex w-full shrink-0 items-center overflow-hidden text-ellipsis whitespace-nowrap",
		"hover:text-(--c) hover:underline",
	]}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}>
	{#if isHovering}<Icon icon="Starmark" size="small" />{/if}
	{preview.name}
</li>
