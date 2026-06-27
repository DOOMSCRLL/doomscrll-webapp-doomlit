<script lang="ts">
	import Icon from "comps/icons/icon.svelte"
	import { TAG_NO_TAG } from "const/tags"
	import type { ProjectPreview } from "models/project"

	type Props = {
		preview: ProjectPreview
		index: number
	}

	const { preview, index }: Props = $props()

	let isHovering = $state(false)
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<li
	tabindex="0"
	data-preview-tag={preview.tags[0] ?? TAG_NO_TAG}
	data-preview-index={index}
	class={[
		"list-none font-serif text-xl tracking-tight text-inverse",
		"flex w-full shrink-0 items-center overflow-hidden text-ellipsis whitespace-nowrap",
		"hover:text-(--c) hover:underline",
	]}
	onmouseenter={() => (isHovering = true)}
	onmouseleave={() => (isHovering = false)}>
	{#if isHovering}<Icon icon="Starmark" size="small" />{/if}
	{preview.name}
</li>
