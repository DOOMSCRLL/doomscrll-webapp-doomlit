<script lang="ts">
	import type { PlatformName } from "models/platform"
	import { getPlatformIconPathFor, getPlatformName } from "repos/platform-repo"

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

<div
	aria-labelledby="EXTERNAL_ICON_{platform}"
	class={[
		"h-14 shrink-0 overflow-hidden bg-[black]",
		asset.isBadge ? "w-auto rounded-lg" : "w-14 rounded-full",
		"flex items-center justify-center",
	]}>
	<img
		alt="{getPlatformName(platform)} {labelSuffix}"
		id="EXTERNAL_ICON_{platform}"
		src={primaryUrl}
		onerror={handleError}
		class={["h-12 object-contain object-center", asset.isBadge ? "w-auto" : "w-12"]} />
</div>
