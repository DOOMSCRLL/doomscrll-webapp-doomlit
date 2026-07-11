<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import type ImageAsset from "models/internal/image-asset"
	import { getDictionaryOf } from "repos/locale-repo"

	type Props = {
		img: ImageAsset
		onClickPreview?: (index: number) => void
		onClickRemove?: (index: number) => void
	}

	const { img, onClickPreview, onClickRemove }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.imgPreview)
	const imgAlt = $derived(img.aspectRatio === "1:1" ? dict.coverImg.alt : dict.ssImg.alt)

	const width = 128
	const height = $derived(img.aspectRatio === "1:1" ? width : (16 * width) / 9)

	function handleClickPreview() {
		onClickPreview?.(img.index ?? 0)
	}
	function handleClickRemove() {
		onClickRemove?.(img.index ?? 0)
	}
</script>

<section class="flex flex-col gap-2">
	<img
		src={img.src}
		alt={imgAlt}
		{width}
		{height}
		class="overflow-hidden rounded-xl border-3 border-inverse object-cover"
		style="width: {width}px; height: {height}px;" />

	<section class="flex h-min items-center justify-between gap-4" style="width: {width}px">
		<SlabButton variant="text" size="small" onClick={handleClickPreview}>
			<span class="sr-only">{dict.cta.expand}</span>
			<Icon icon="Doomeye" size="small" />
		</SlabButton>
		<SlabButton variant="text" size="small" onClick={handleClickRemove}>
			<span class="sr-only">{dict.cta.remove}</span>
			<Icon icon="Remove" size="small" />
		</SlabButton>
	</section>
</section>
