import type { Dictionary } from "models/internal/locale"
import type Project from "models/project"

export type StatusMessage = { type?: "error" | "info"; message?: string }

export class DoomlitValidator {
	dict: Dictionary["doomlits"]

	constructor(dict: Dictionary["doomlits"]) {
		this.dict = dict
	}

	validateVideoUrl(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined

		const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(value)

		if (!isValid) return { type: "error", message: this.dict.projectForm.video.status.invalidUrl }
		return undefined
	}

	validateDescription(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined

		if (value.length > 256) {
			return { type: "error", message: "MISSING_ERROR_DESCRIPTION_TOO_LONG" }
		}
		return undefined
	}

	validatePlatformUrl(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined

		const isValid = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)

		if (!isValid) return { type: "error", message: "MISSING_ERROR_PLATFORM_URL_INVALID" }
		return undefined
	}

	mapPublishIssues(issues: Record<string, string[]>): string[] {
		const messages: string[] = []

		if (issues.coverImagePath) messages.push("MISSING_ERROR_COVER_REQUIRED")
		if (issues.description) messages.push("MISSING_ERROR_DESCRIPTION_REQUIRED")
		if (issues.tags) messages.push("MISSING_ERROR_TAGS_REQUIRED")
		if (issues.features) messages.push("MISSING_ERROR_FEATURES_REQUIRED")
		if (issues.screenshotPaths) messages.push("MISSING_ERROR_SCREENSHOTS_REQUIRED")
		if (issues.secondaryPlatforms) messages.push("MISSING_ERROR_PLATFORMS_REQUIRED")
		if (issues.videoUrl) messages.push("MISSING_ERROR_VIDEO_INVALID")

		return messages
	}

	checkIsDirty(original: Project, next: Partial<Project>): boolean {
		if (original.name !== next.name) return true
		if (original.category !== next.category) return true
		if ((original.description ?? undefined) !== (next.description ?? undefined)) return true
		if ((original.videoUrl ?? undefined) !== (next.videoUrl ?? undefined)) return true
		if ((original.coverImagePath ?? undefined) !== (next.coverImagePath ?? undefined)) return true

		if (!this.compareArrays(original.tags, next.tags, (a, b) => a === b)) return true
		if (!this.compareArrays(original.features, next.features)) return true
		if (!this.compareArrays(original.screenshotPaths, next.screenshotPaths)) return true

		if (
			!this.compareArrays(
				original.secondaryPlatforms,
				next.secondaryPlatforms,
				(a, b) => a.name === b.name && a.url === b.url,
			)
		)
			return true

		return false
	}

	private compareArrays<T>(
		arr1: T[] | undefined | null,
		arr2: T[] | undefined | null,
		comparator?: (a: T, b: T) => boolean,
	): boolean {
		const a1 = arr1 ?? []
		const a2 = arr2 ?? []
		if (a1.length !== a2.length) return false

		return a1.every((item, index) => (comparator ? comparator(item, a2[index]) : item === a2[index]))
	}
}
