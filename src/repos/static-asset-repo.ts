import { PUBLIC_CDN_STATIC_BASE_URL } from "$env/static/public"

import type { PlatformName } from "models/platform"
import { getPlatformSlug } from "./platform-repo"

const BUNDLED_LOGO_PLATFORMS = new Set<PlatformName>(["discord", "itchio", "spotify", "steam", "youtube"])
const BUNDLED_BADGE_PLATFORMS = new Set<PlatformName>(["appStore", "playStore"])

const PATH_PREFIX_LOCAL = "/img-assets/"

type AssetPath = {
	path: string
	isLocal: boolean
}

export function getPlatformIconPathFor(platform: PlatformName): AssetPath {
	const slug = getPlatformSlug(platform)
	let path: string
	let isLocal: boolean

	if (BUNDLED_LOGO_PLATFORMS.has(platform)) {
		path = `${PATH_PREFIX_LOCAL}logo-${slug}.${platform === "discord" ? "webp" : "svg"}`
		isLocal = true
	} else if (BUNDLED_BADGE_PLATFORMS.has(platform)) {
		path = `${PATH_PREFIX_LOCAL}badge-${slug}.svg`
		isLocal = true
	} else {
		path = `${PUBLIC_CDN_STATIC_BASE_URL}logo-${slug}`
		isLocal = false
	}

	return { path, isLocal }
}
