<script lang="ts">
	import type { PlatformName } from "models/platform"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import ExternalIcon from "comps/icons/external-icon.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	type Props = {
		platform: PlatformName
		url: string
		index: number
		onRemove: (index: number) => void
	}

	const { platform, url, index, onRemove }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.platformChip)
	const urlLabel = $derived(url.replace(/((https|http)+:\/\/(www.)*)/g, "").trim())
</script>

<li class="flex w-min items-center gap-4">
	<ExternalIcon {platform} />
	<Icon icon="Starmark" size="small" />
	<SlabAnchorExternal href={url} variant="filled" alignment="center" fit="min">
		<Icon icon="Link" />
		{urlLabel}
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
	<SlabButton variant="text" fit="square" size="small" ariaLabel={dict.labelRemove} onClick={() => onRemove(index)}
		><Icon icon="Remove" size="small" /></SlabButton>
</li>
