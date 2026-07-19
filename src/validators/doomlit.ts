import type Project from "models/project"

export type StatusErrorCode = "ERROR_VIDEO_URL_INVALID" | "ERROR_DESC_TOO_LONG" | "ERROR_PLATFORM_URL_INVALID"
/*export type StatusInfoCode = ""*/
export type StatusMessage = { type?: "error"; code?: StatusErrorCode } /*| { type?: "info"; code: StatusInfoCode }*/

export class DoomlitValidator {
	private constructor() {
		throw Error("This class shouldn't be instanced.")
	}

	static validateVideoUrl(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined

		const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(value)

		if (!isValid) return { type: "error", code: "ERROR_VIDEO_URL_INVALID" }
		return undefined
	}

	static validateDescription(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined
		if (value.length > 256) return { type: "error", code: "ERROR_DESC_TOO_LONG" }
		return undefined
	}

	static validatePlatformUrl(value: string | undefined): StatusMessage | undefined {
		if (!value) return undefined

		const isValid = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
		if (!isValid) return { type: "error", code: "ERROR_PLATFORM_URL_INVALID" }
		return undefined
	}

	static checkIsDirty(original: Project, next: Partial<Project>): boolean {
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
				(a, b) => a.platform === b.platform && a.url === b.url,
			)
		)
			return true

		return false
	}

	private static compareArrays<T>(
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
