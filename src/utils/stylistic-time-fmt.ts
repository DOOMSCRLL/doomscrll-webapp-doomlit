import type { Locale } from "repos/locales"
import type { DDateParts } from "./d-date"
import DDate from "./d-date"

export default class StylisticTimeFormat {
	#shortDayFormatter: Intl.DateTimeFormat
	#longDayFormatter: Intl.DateTimeFormat
	#monthFormatter: Intl.DateTimeFormat
	#fullDateFormatter: Intl.DateTimeFormat

	constructor(locale: Locale) {
		const timezoneOpt: Intl.DateTimeFormatOptions = { timeZone: "UTC" }

		this.#shortDayFormatter = new Intl.DateTimeFormat(locale, { ...timezoneOpt, weekday: "short" })
		this.#longDayFormatter = new Intl.DateTimeFormat(locale, { ...timezoneOpt, weekday: "long" })
		this.#monthFormatter = new Intl.DateTimeFormat(locale, { ...timezoneOpt, month: "short" })
		this.#fullDateFormatter = new Intl.DateTimeFormat(locale, {
			...timezoneOpt,
			month: "long",
			day: "2-digit",
			year: "numeric",
		})
	}

	public getShortDayName(date: DDate): string {
		return this.#shortDayFormatter.format(date.toUTCDate())
	}

	public getAllShortDayNames(): Array<string> {
		return Array.from({ length: 7 }, (_, i) => {
			// NOTE#1: The epoch date of "2023-01-02" was a Monday
			const utcEpoch = new Date(Date.UTC(2023, 0, i + 2))
			return this.#shortDayFormatter.format(utcEpoch)
		})
	}

	public getLongDayName(date: DDate): string {
		return this.#longDayFormatter.format(date.toUTCDate())
	}

	public getMonthName(date: DDate): string {
		return this.#monthFormatter.format(date.toUTCDate())
	}

	public getCalendarHeader({ year, month }: Omit<DDateParts, "day">): string {
		const date = DDate.fromParts({ year, month, day: 1 })
		return `${this.getMonthName(date)} '${date.year.toString().slice(-2)}`
	}

	public getFullDate(date: DDate): string {
		return this.#fullDateFormatter.format(date.toUTCDate())
	}
}
