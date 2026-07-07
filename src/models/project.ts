import type Category from "./category"
import type { PlatformName } from "./platform"
import type ProjectTag from "./project-tag"

export type ProjectStatus = "draft" | "incomplete" | "ready" | "canceled"

type Project = {
	referenceId: string
	showcaseDate: string
	status: ProjectStatus
	reservedAt: string | null
	name: string
	category: Category
	primaryPlatform: PlatformName
	primaryUrl: string
	description: string | null
	tags: ProjectTag[] | null
	features: string[] | null
	coverImagePath: string | null
	screenshotPaths: string[] | null
	secondaryPlatforms: { platform: PlatformName; url: string }[] | null
	videoUrl: string | null
	createdAt: string
}

export type ProjectPreview = {
	name: string
	authorUsername: string
	category: Category
	tags: ProjectTag[]
}

export type CreatorProjectEntry = {
	referenceId: string
	category: Category
	name: string
	showcaseDate: string
	status: ProjectStatus
}

export type { Project as default }
