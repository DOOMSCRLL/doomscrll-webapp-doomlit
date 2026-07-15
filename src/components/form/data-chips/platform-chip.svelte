<script lang="ts">
	import type { PlatformRecord } from "models/platform"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import ExternalIcon from "comps/icons/external-icon.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	type Props = {
		platform: PlatformRecord
		onRemove?: (platform: PlatformRecord) => void
	}

	const { platform, onRemove }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.platformChip)
	const urlLabel = $derived(platform.url.replace(/((https|http)+:\/\/(www.)*)/g, "").trim())
</script>

<li class="flex w-min items-center gap-4">
	<ExternalIcon platform={platform.name} />
	<Icon icon="Starmark" size="small" />
	<SlabAnchorExternal href={platform.url} variant="filled" alignment="center" fit="min">
		<Icon icon="Link" />
		<span class="w-full overflow-hidden text-ellipsis">{urlLabel}</span>
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
	{#if onRemove}
		<SlabButton
			variant="text"
			fit="square"
			size="small"
			ariaLabel={dict.labelRemove}
			onClick={() => onRemove(platform)}>
			<Icon icon="Remove" size="small" />
		</SlabButton>
	{/if}
</li>
