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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getPlatformIcon(platform: PlatformName): string {
	// TODO: Add platform icons, and implement getPlatformIcon function
	throw Error("Not implemented yet.")
}

export function getPlatformsListFor(category: Category): PlatformName[] {
	return PLATFORM_MAP[category]
}

export function getPlatformsFor(category: Category): Platform[] {
	return getPlatformsListFor(category).map((p) => getPlatform(p))
}

export function getPlatform(name: PlatformName): Platform {
	return PLATFORMS[name]
}
