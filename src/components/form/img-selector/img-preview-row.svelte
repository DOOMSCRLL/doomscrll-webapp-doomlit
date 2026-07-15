<script lang="ts">
	import type ImageAsset from "models/internal/image-asset"
	import ImgPreview from "./img-preview.svelte"

	type Props = {
		imgs: ImageAsset[]
		onPreviewClick?: (index: number) => void
		onRemoveClick?: (index: number) => void
	}

	const { imgs, onPreviewClick, onRemoveClick }: Props = $props()

	function handlePreviewClick(index?: number) {
		onPreviewClick?.(index ?? 0)
	}

	function handleRemoveClick(index?: number) {
		onRemoveClick?.(index ?? 0)
	}
</script>

<section class="flex w-full pretty-scrollbar gap-4 overflow-x-auto">
	{#each imgs as img (img.src)}
		<ImgPreview {img} onClickPreview={handlePreviewClick} onClickRemove={handleRemoveClick} />
	{/each}
</section>
