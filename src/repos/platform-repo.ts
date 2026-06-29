import { PUBLIC_CDN_STATIC_BASE_URL } from "$env/static/public"

import { PLATFORM_MAP, PLATFORMS } from "const/platforms"
import type Category from "models/category"
import type Platform from "models/platform"
import type { PlatformName } from "models/platform"

export function getPlatformName(platform: PlatformName): string {
	return PLATFORMS[platform].name
}

export function getPlatformSlug(platform: PlatformName): string {
	return PLATFORMS[platform].slug
}

const LOOKUP_MAP_PLATFORM_SLUG_TO_KEY = Object.freeze(
	Object.fromEntries(Object.entries(PLATFORMS).map(([key, p]) => [p.slug, key])),
)
export function slugToPlatformName(slug?: string): PlatformName | undefined {
	if (!slug) return undefined
	return LOOKUP_MAP_PLATFORM_SLUG_TO_KEY[slug] as PlatformName
}

// #region Platform icons helper
const BUNDLED_LOGO_PLATFORMS = new Set<PlatformName>([
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

export function getPlatformIconPathFor(platform: PlatformName): AssetPath {
	const slug = getPlatformSlug(platform)
	const isBadge = (PLATFORMS[platform] as Platform).isBadge ?? false

	let path: string
	let isLocal: boolean

	if (BUNDLED_LOGO_PLATFORMS.has(platform)) {
		path = `${PATH_PREFIX_LOCAL}logo-${slug}.${platform === "spotify" ? "webp" : "svg"}`
		isLocal = true
	} else {
		path = `${PUBLIC_CDN_STATIC_BASE_URL}logo-${slug}`
		isLocal = false
	}

	return { path, isLocal, isBadge }
}
// #endregion

export function getPlatformsListFor(category: Category): PlatformName[] {
	return PLATFORM_MAP[category]
}

export function getPlatformsFor(category: Category): Platform[] {
	return getPlatformsListFor(category).map((p) => getPlatform(p))
}

export function getPlatform(name: PlatformName): Platform {
	return PLATFORMS[name]
}
