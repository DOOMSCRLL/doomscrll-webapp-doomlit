export type ActiveDraftReference = {
	referenceId: string
	reservedAt: string
}

export type ReservationCountsData = {
	meta: {
		year: number
		month: number
		maxReservationsPerDay: number
	}
	counts: Record<string, number>
}

export type ProjectDraft = {
	referenceId: string
	name: string
	status: string
	showcaseDate: string
	reservedAt: string
	createdAt: string
	authorHandle: string
	category: string
}


export type PatchContentPayload = {
	description?: string
	tags?: string[]
	features?: string[]
	coverImagePath?: string
	screenshotPaths?: string[]
	secondaryPlatforms?: { platform: string; url: string }[]
	videoUrl?: string
}

export type UploadUrlsData = {
	cover: { uploadUrl: string; path: string }
	screenshots: { uploadUrl: string; path: string }[]
}
