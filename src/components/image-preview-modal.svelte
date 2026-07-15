<script lang="ts">
	import closedByAny from "attcs/closed-by-any"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import type ImageAsset from "models/internal/image-asset"
	import { getDictionaryOf } from "repos/locale-repo"
	import ttm from "utils/type-literal-to-class"

	type Props = {
		img: ImageAsset
		onClose: () => void
	}

	const { img, onClose }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.imgPreview.modal)

	let ref = $state<HTMLDialogElement>()
	const id = `modal_${Math.random().toString(36).slice(2, 9)}`

	$effect(() => ref?.showModal())
</script>

<dialog
	{@attach closedByAny({ trigger: undefined })}
	{id}
	aria-modal="true"
	aria-labelledby="title_{id}"
	onclose={onClose}
	class={[
		"m-auto h-min max-h-[95vh] max-w-[95vw] overflow-hidden p-4 open:z-50 open:box-border",
		"rounded-3xl border-3 border-inverse bg-obverse backdrop:bg-[black]/90",
		"flex-col items-center justify-center gap-4 open:flex",
	]}
	bind:this={ref}>
	<span id="title_{id}" class="sr-only">{dict.title}</span>
	<SlabButton alignment="center" fit="min" size="small" variant="text" renderDecors={true} onClick={onClose}>
		{dict.labelClose}
	</SlabButton>
	<img
		src={img.src}
		alt={dict.imgAlt}
		class={[
			"h-[85vh] max-w-[85vw] rounded-2xl object-contain",
			ttm(img.aspectRatio, {
				"1:1": "aspect-square",
				"9:16": "aspect-9/16",
			}),
		]} />
</dialog>
