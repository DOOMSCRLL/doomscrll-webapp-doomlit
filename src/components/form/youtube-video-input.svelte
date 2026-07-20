<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { fetchYoutubeVideoDetails, toShortYoutubeURL, type YoutubeVideoDetails } from "utils/youtube-video-utils"
	import { DoomlitValidator } from "validators/doomlit"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import Icon from "comps/icons/icon.svelte"
	import TextInput from "./text-input.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		instructions?: string
		url?: string
		normalizedUrl?: string
	}

	let { name, label, placeholder, instructions, url = $bindable(), normalizedUrl = $bindable() }: Props = $props()

	const parentDict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits)
	const previewDict = $derived(parentDict.videoPreview)
	const fieldDict = $derived(parentDict.projectForm.video)

	let videoDetails = $state<YoutubeVideoDetails>()
	let errorMessage = $state<string>()
	const heightThumbnail = 128

	async function validateAndFetchVideo() {
		if (!url) {
			videoDetails = undefined
			errorMessage = undefined
			return
		}

		const validationResult = DoomlitValidator.validateVideoUrl(url)
		if (validationResult?.type === "error") {
			errorMessage = fieldDict.status.invalidUrl
			videoDetails = undefined
			return
		}

		try {
			const res = await fetchYoutubeVideoDetails(url)
			normalizedUrl = toShortYoutubeURL(res.videoId)
			videoDetails = res
			errorMessage = undefined
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			videoDetails = undefined
			if (error.message === "URL is not a valid YouTube URL.") {
				errorMessage = fieldDict.status.invalidUrl
			} else if (error.message.includes("status: 404") || error.message.includes("status: 401")) {
				errorMessage = fieldDict.status.unavailable
			} else {
				errorMessage = fieldDict.status.internalError
			}
		}
	}

	$effect(() => {
		validateAndFetchVideo()
	})
</script>

<section class="flex w-full flex-col gap-4">
	<TextInput
		{name}
		{label}
		{placeholder}
		{instructions}
		{errorMessage}
		tooltip={previewDict.tooltip}
		inputType="url"
		layout="column"
		bind:value={url} />

	{#if videoDetails}
		<section class="flex h-min w-full items-start gap-6 rounded-3xl border-3 border-inverse p-4">
			<img
				src={videoDetails.thumbnailUrl}
				alt={previewDict.altThumbnail}
				height={heightThumbnail}
				class="overflow-hidden rounded-2xl object-cover"
				style="height: {heightThumbnail}px; width: auto;" />
			<section class="flex h-full w-full flex-col justify-center gap-4">
				<p class="font-serif text-2xl font-bold tracking-wide text-inverse">{videoDetails.title}</p>
				<p class="font-serif text-xl font-medium tracking-wide text-inverse italic">@{videoDetails.authorName}</p>
			</section>
			<SlabAnchorExternal href={normalizedUrl!} variant="text">
				<span class="sr-only">{previewDict.labelYoutubeAnchor}</span>
				<Icon icon="Link" />
			</SlabAnchorExternal>
		</section>
	{/if}
</section>
