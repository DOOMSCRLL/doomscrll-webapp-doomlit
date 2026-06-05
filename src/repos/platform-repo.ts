import { PLATFORMS } from "const/platforms"
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
