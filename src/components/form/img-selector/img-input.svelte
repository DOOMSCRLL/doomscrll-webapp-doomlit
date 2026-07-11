<script lang="ts">
	import type ImageAsset from "models/internal/image-asset"
	import type { ImageType } from "services/image-service"
	import { ImageService } from "services/image-service"

	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ImgPreviewRow from "./img-preview-row.svelte"
	import ImgPreview from "./img-preview.svelte"

	type Props = {
		name: string
		label: string
		placeholder?: string
		instructions?: string
		canSelectMultiple?: boolean
		maxImages?: number
		maxFileSizeMB?: number
		imageType: ImageType
		processedBlobs?: Blob[]
		onPreviewClick?: (url: string) => void
	}

	let {
		name,
		label,
		placeholder,
		instructions,
		canSelectMultiple = false,
		maxImages,
		maxFileSizeMB = 10,
		imageType,
		// eslint-disable-next-line no-useless-assignment
		processedBlobs = $bindable([]),
		onPreviewClick,
	}: Props = $props()

	let isProcessing = $state(false)
	let previewUrls = $state<string[]>([])

	function getImgs(): ImageAsset[] {
		return previewUrls.map<ImageAsset>((purl, index) => ({
			aspectRatio: imageType === "cover" ? "1:1" : "9:16",
			src: purl,
			index,
		}))
	}

	function handlePreviewClick(index: number) {
		if (!previewUrls || previewUrls.length <= 0) return
		else onPreviewClick?.(previewUrls[index])
	}

	$effect(() => {
		return () => previewUrls.forEach((url) => URL.revokeObjectURL(url))
	})

	async function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement
		if (!target.files || target.files.length === 0) return

		isProcessing = true

		const filesToProcess = Array.from(target.files).filter((file) => file.size <= maxFileSizeMB * 1024 * 1024)
		if (maxImages && filesToProcess.length > maxImages) {
			filesToProcess.length = maxImages
		}

		try {
			const blobs = await Promise.all(filesToProcess.map((file) => ImageService.process(file, imageType)))
			processedBlobs = blobs

			previewUrls.forEach((url) => URL.revokeObjectURL(url))
			previewUrls = blobs.map((blob) => URL.createObjectURL(blob))
		} catch (error) {
			console.error("Failed to process images:", error)
		} finally {
			isProcessing = false
			target.value = ""
		}
	}
</script>

<div class="flex w-full flex-col gap-4">
	<label class="flex cursor-text flex-col gap-4 font-serif text-2xl font-medium tracking-tight">
		<span class="flex gap-2">
			<Icon icon="Starmark" size="small" />
			{label}{#if instructions}<BadgeText text={instructions} />{/if}:
		</span>
		<input
			id={name}
			type="file"
			{name}
			{placeholder}
			accept="image/jpeg, image/png, image/webp"
			multiple={canSelectMultiple}
			onchange={handleFileChange}
			disabled={isProcessing}
			class={[
				"overflow-hidden font-mono text-[1rem] font-bold tracking-wider text-ellipsis text-inverse file:uppercase",
				"file:mr-4 file:h-10 file:rounded-xl file:border-3 file:border-inverse file:bg-obverse file:px-4",
				"cursor-pointer hover:file:bg-inverse hover:file:text-obverse active:file:bg-accent",
			]} />
	</label>

	{#if previewUrls && previewUrls.length > 0}
		{#if !canSelectMultiple}
			<ImgPreview img={getImgs()[0]} onClickPreview={handlePreviewClick} />
		{:else}
			<ImgPreviewRow imgs={getImgs()} onPreviewClick={handlePreviewClick} />
		{/if}
	{/if}
</div>
