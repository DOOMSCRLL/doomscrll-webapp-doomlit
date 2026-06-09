import type { PLATFORMS } from "const/platforms"

export type PlatformName = keyof typeof PLATFORMS

type Platform = {
	name: string
	slug: string
	icon?: string
	isBadge?: boolean
}

export type { Platform as default }
