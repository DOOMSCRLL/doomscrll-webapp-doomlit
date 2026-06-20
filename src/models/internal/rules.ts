export type DeadzoneWindow = {
	start: string
	end: string
	timezone: "UTC"
}

export type ProjectRules = {
	maxReservationsPerDay: number
	reservationWindowDays: number
	cooldownPeriodDays: number
	draftExpirationMinutes: number
	deadzoneWindow: DeadzoneWindow
}
