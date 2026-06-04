import { PLATFORMS } from "const/platforms"
import type { Platform, PlatformKey } from "models/platform"

export function normalizePlatform(platform: Platform): string {
	return PLATFORMS[platform]
}

export function parsePlatform(value: PlatformKey): Platform | undefined {
	return (Object.entries(PLATFORMS).find((p) => p[1] === value)?.[0] as Platform) ?? undefined
}
