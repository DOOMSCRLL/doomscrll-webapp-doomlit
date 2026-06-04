import type { PLATFORMS, PLATFORMS_GAME, PLATFORMS_SOCIAL } from "const/platforms"

export type GamePlatform = (typeof PLATFORMS_GAME)[number]
export type SocialPlatform = (typeof PLATFORMS_SOCIAL)[number]

export type Platform = GamePlatform | SocialPlatform
export type PlatformKey = (typeof PLATFORMS)[Platform]
