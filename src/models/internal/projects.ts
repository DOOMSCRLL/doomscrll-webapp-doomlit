export type ReservationCountsData = {
	meta: {
		year: number
		month: number
		maxReservationsPerDay: number
	}
	counts: Record<string, number>
}
