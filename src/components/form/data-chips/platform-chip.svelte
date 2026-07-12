<script lang="ts">
	import type { PlatformName } from "models/platform"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import ExternalIcon from "comps/icons/external-icon.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		platform: PlatformName
		url: string
		index: number
		onRemove: (index: number) => void
	}

	const { platform, url, index, onRemove }: Props = $props()
	const urlLabel = $derived(url.replace(/((https|http)+:\/\/(www.)*)/g, "").trim())
	// TODO: Change styling of external anchor to reflect the design for platform chips
	// TODO: Tweak external icon to make platform logos less ugly
	// TODO: Add aria label strings for external icon inside the component
</script>

<li class="flex w-min items-center gap-4">
	<ExternalIcon labelSuffix="MISSING_LABEL_PLATFORM_ICON" {platform} />
	<Icon icon="Starmark" size="small" />
	<SlabAnchorExternal href={url} variant="filled" alignment="center" fit="min">
		<Icon icon="Link" />
		{urlLabel}
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
	<SlabButton
		variant="text"
		fit="square"
		size="small"
		ariaLabel="MISSING_ARIA_LABEL_REMOVE"
		onClick={() => onRemove(index)}><Icon icon="Remove" size="small" /></SlabButton>
</li>
