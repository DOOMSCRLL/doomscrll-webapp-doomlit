<script lang="ts">
	import type ImageAsset from "models/internal/image-asset"
	import type { ImageType } from "services/image-service"
	import { ImageService } from "services/image-service"

	import BadgeText from "comps/badge-text.svelte"
	import TooltipButton from "comps/buttons/tooltip-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ImgPreviewRow from "./img-preview-row.svelte"
	import ImgPreview from "./img-preview.svelte"

	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	type StatusMessage = {
		message?: string
		type?: "error" | "info"
	}

	type Props = {
		name: string
		label: string
		placeholder?: string
		instructions?: string
		tooltip?: string
		canSelectMultiple?: boolean
		isRequired?: boolean
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
		tooltip,
		canSelectMultiple = false,
		isRequired = false,
		maxImages,
		maxFileSizeMB = 10,
		imageType,
		// eslint-disable-next-line no-useless-assignment
		processedBlobs = $bindable([]),
		onPreviewClick,
	}: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.projectForm)

	let isProcessing = $state(false)
	let isFocused = $state(false)
	let status = $state<StatusMessage>()
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
		if (!target.files || target.files.length === 0) {
			status = undefined
			return
		}

		isProcessing = true
		status = undefined

		const allFiles = Array.from(target.files)
		const validSizeFiles = allFiles.filter((file) => file.size <= maxFileSizeMB * 1024 * 1024)

		if (validSizeFiles.length < allFiles.length) {
			// @ts-expect-error - Dictionary keys to be added by user
			status = { message: dict.status.fileTooLarge, type: "error" }
			if (validSizeFiles.length === 0) {
				isProcessing = false
				target.value = ""
				return
			}
		}

		let filesToProcess = validSizeFiles
		if (maxImages && filesToProcess.length > maxImages) {
			// @ts-expect-error - Dictionary keys to be added by user
			status = { message: dict.status.tooManyFiles, type: "info" }
			filesToProcess.length = maxImages
		}

		try {
			const blobs = await Promise.all(filesToProcess.map((file) => ImageService.process(file, imageType)))
			processedBlobs = blobs

			previewUrls.forEach((url) => URL.revokeObjectURL(url))
			previewUrls = blobs.map((blob) => URL.createObjectURL(blob))
		} catch (error) {
			console.error("Failed to process images:", error)
			// @ts-expect-error - Dictionary keys to be added by user
			status = { message: dict.status.internalError, type: "error" }
		} finally {
			isProcessing = false
			target.value = ""
		}
	}
</script>

<div class="flex w-full flex-col items-start gap-4">
	<div class="flex w-full justify-start gap-2">
		<label
			for={name}
			class="flex cursor-text gap-2 font-serif text-2xl font-medium tracking-tighter whitespace-nowrap text-inverse">
			<Icon icon="Starmark" size="small" />
			{label}{#if instructions}<BadgeText text={instructions} />{/if}:
		</label>
		{#if tooltip}<TooltipButton id="{name}-tooltip" content={tooltip} />{/if}
	</div>
	<input
		id={name}
		type="file"
		{name}
		{placeholder}
		accept="image/jpeg, image/png, image/webp"
		multiple={canSelectMultiple}
		required={isRequired}
		onchange={handleFileChange}
		onfocus={() => (isFocused = true)}
		onblur={() => (isFocused = false)}
		disabled={isProcessing}
		class={[
			"overflow-hidden font-mono text-[1rem] font-bold tracking-wider text-ellipsis text-inverse file:uppercase",
			"file:mr-4 file:h-10 file:rounded-xl file:border-3 file:border-inverse file:bg-obverse file:px-4",
			"cursor-pointer hover:file:bg-inverse hover:file:text-obverse active:file:bg-accent",
		]} />

	{#if status?.message && (status.type === "error" || isFocused)}
		<p
			class={[
				"font-serif text-xl font-medium tracking-tight",
				status.type === "error" ? "text-accent" : "text-inverse",
				"ml-4 flex items-center gap-2",
			]}>
			<Icon icon={status.type === "error" ? "Cancel" : "Help"} />
			{status.message}
		</p>
	{/if}

	{#if previewUrls && previewUrls.length > 0}
		{#if !canSelectMultiple}
			<ImgPreview img={getImgs()[0]} onClickPreview={handlePreviewClick} />
		{:else}
			<ImgPreviewRow imgs={getImgs()} onPreviewClick={handlePreviewClick} />
		{/if}
	{/if}
</div>
