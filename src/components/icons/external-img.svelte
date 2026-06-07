<script lang="ts">
	import type { PlatformName } from "models/platform"
	import { getPlatformName } from "repos/platform-repo"
	import { getPlatformIconPathFor } from "repos/static-asset-repo"

	type Props = {
		platform: PlatformName
		labelSuffix: string
	}

	const { platform, labelSuffix }: Props = $props()

	let asset = $derived(getPlatformIconPathFor(platform))
	let primaryUrl = $derived(asset.isLocal ? asset.path : `${asset.path}.svg`)
	let fallbackUrl = $derived(asset.isLocal ? asset.path : `${asset.path}.webp`)

	function handleError(event: Event) {
		const img = event.currentTarget as HTMLImageElement
		if (!asset.isLocal && !img.src.endsWith(".webp")) img.src = fallbackUrl
	}
</script>

<img
	alt="{getPlatformName(platform)} {labelSuffix}"
	src={primaryUrl}
	onerror={handleError}
	class={["h-12 w-auto object-contain"]} />
