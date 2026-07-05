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
