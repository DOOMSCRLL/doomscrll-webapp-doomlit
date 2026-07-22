export type DeadzoneWindow = {
	start: string
	end: string
	timezone: "UTC"
}

export type ProjectRules = {
	maxReservationsPerDay: number
	cooldownPeriodDays: number
	draftExpirationMinutes: number
	deadzoneWindow: DeadzoneWindow
	maxTagCount: number
	maxScreenshotCount: number
	maxImageFileSizeMB: number
	maxLengthProjectName: number
	maxLengthProjectDescription: number
}
