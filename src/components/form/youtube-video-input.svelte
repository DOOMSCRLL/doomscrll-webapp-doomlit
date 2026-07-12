<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { fetchYoutubeVideoDetails, toShortYoutubeURL, type YoutubeVideoDetails } from "utils/youtube-video-utils"

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

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.videoPreview)

	let videoDetails = $state<YoutubeVideoDetails>()
	const heightThumbnail = 128

	async function validateAndFetchVideo() {
		if (!url) return
		const validation = await fetchYoutubeVideoDetails(url)
		if (!validation) return // TODO: Add error subtext to the input fields

		normalizedUrl = toShortYoutubeURL(validation.videoId)
		videoDetails = validation
	}

	$effect(() => {
		if (!url) return
		validateAndFetchVideo()
	})
</script>

<section class="flex w-full flex-col gap-2">
	<TextInput
		{name}
		{label}
		{placeholder}
		{instructions}
		tooltip={dict.tooltip}
		inputType="url"
		layout="column"
		isRequired={true}
		bind:value={url} />

	{#if videoDetails}
		<section class="flex h-min w-full items-start gap-6 rounded-3xl border-3 border-inverse p-4">
			<img
				src={videoDetails.thumbnailUrl}
				alt={dict.altThumbnail}
				height={heightThumbnail}
				class="overflow-hidden rounded-2xl object-cover"
				style="height: {heightThumbnail}px; width: auto;" />
			<section class="flex h-full w-full flex-col justify-center gap-4">
				<p class="font-serif text-2xl font-bold tracking-wide text-inverse">{videoDetails.title}</p>
				<p class="font-serif text-xl font-medium tracking-wide text-inverse italic">@{videoDetails.authorName}</p>
			</section>
			<SlabAnchorExternal href={normalizedUrl!} variant="text">
				<span class="sr-only">{dict.labelYoutubeAnchor}</span>
				<Icon icon="Link" />
			</SlabAnchorExternal>
		</section>
	{/if}
</section>
