import { PUBLIC_CDN_STATIC_BASE_URL } from "$env/static/public"

import { PLATFORM_MAP, PLATFORMS } from "const/platforms"
import type Category from "models/category"
import type Platform from "models/platform"
import type { PlatformKey } from "models/platform"

export function getPlatformName(platform: PlatformKey): string {
	return PLATFORMS[platform].name
}

// #region Platform icons helper
const BUNDLED_LOGO_PLATFORMS = new Set<PlatformKey>([
	"appStore",
	"discord",
	"itchio",
	"playStore",
	"spotify",
	"steam",
	"youtube",
])

const PATH_PREFIX_LOCAL = "/img-assets/"

type AssetPath = {
	path: string
	isLocal: boolean
	isBadge: boolean
}

export function getPlatformIconPathFor(platform: PlatformKey): AssetPath {
	const isBadge = (PLATFORMS[platform] as Platform).isBadge ?? false

	let path: string
	let isLocal: boolean

	if (BUNDLED_LOGO_PLATFORMS.has(platform)) {
		path = `${PATH_PREFIX_LOCAL}logo-${platform}.${platform === "spotify" ? "webp" : "svg"}`
		isLocal = true
	} else {
		path = `${PUBLIC_CDN_STATIC_BASE_URL}logo-${platform}`
		isLocal = false
	}

	return { path, isLocal, isBadge }
}
// #endregion

export function getPlatformsListFor(category: Category): PlatformKey[] {
	return PLATFORM_MAP[category]
}

export function getPlatformsFor(category: Category): Platform[] {
	return getPlatformsListFor(category).map((p) => getPlatform(p))
}

export function getPlatform(name: PlatformKey): Platform {
	return PLATFORMS[name]
}
