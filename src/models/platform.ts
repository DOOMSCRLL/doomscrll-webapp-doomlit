import type { PLATFORMS } from "const/platforms"

export type PlatformKey = keyof typeof PLATFORMS

type Platform = {
	name: string
	icon?: string
	isBadge?: boolean
}

export type PlatformRecord = {
	platform: PlatformKey
	url: string
}

export type { Platform as default }
