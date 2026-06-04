import { PLATFORM_SLUGS } from "const/platforms"
import type { Platform, PlatformSlug } from "models/platform"

export function normalizePlatform(platform: Platform): string {
	return PLATFORM_SLUGS[platform]
}

export function parsePlatform(value: PlatformSlug): Platform | undefined {
	return (Object.entries(PLATFORM_SLUGS).find((p) => p[1] === value)?.[0] as Platform) ?? undefined
}
