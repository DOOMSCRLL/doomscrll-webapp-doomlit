export default class StylisticTimeFormat {
	#shortDayFormatter: Intl.DateTimeFormat
	#longDayFormatter: Intl.DateTimeFormat
	#monthFormatter: Intl.DateTimeFormat
	#fullDateFormatter: Intl.DateTimeFormat

	constructor(locale: "en" /* FIXME: Add i18n repo! */) {
		this.#shortDayFormatter = new Intl.DateTimeFormat(locale, { weekday: "short" })
		this.#longDayFormatter = new Intl.DateTimeFormat(locale, { weekday: "long" })
		this.#monthFormatter = new Intl.DateTimeFormat(locale, { month: "short" })
		this.#fullDateFormatter = new Intl.DateTimeFormat(locale, { month: "long", day: "2-digit", year: "numeric" })
	}

	public getShortDayName(date: Date): string {
		return this.#shortDayFormatter.format(date)
	}

	public getAllShortDayNames(): Array<string> {
		return Array.from({ length: 7 }, (_, i) => {
			// NOTE#1: The date "2023-01-01" is a Monday, so I'm using it as the epoch.
			// NOTE#2: In JS, 0th day returns previous date, and 1st day is Sunday
			const date = new Date(2023, 0, i + 2)
			return this.#shortDayFormatter.format(date)
		})
	}

	public getLongDayName(date: Date): string {
		return this.#longDayFormatter.format(date)
	}

	public getMonthName(date: Date): string {
		return this.#monthFormatter.format(date)
	}

	public getFullDate(date: Date): string {
		return this.#fullDateFormatter.format(date)
	}
}
