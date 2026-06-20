export type DDateParts = { day: number; month: number; year: number }

type MonthLayout = {
	daysInMonth: number
	leadingDays: number
	leadingEnd: number
	trailingDays: number
}

export default class DDate {
	readonly day: number
	readonly month: number
	readonly year: number

	// #region Factories
	private constructor(year: number, month: number, day: number) {
		this.day = day
		this.month = month
		this.year = year
	}

	static fromParts(parts: DDateParts): DDate {
		return DDate.#fromUTCDate(DDate.#createUTCDate(parts))
	}

	static fromISOString(str: string): DDate {
		if (typeof str !== "string") throw new Error(`Expected string, got ${typeof str}`)

		const [year, month, day] = str.split("-").map(Number)

		if (!year || !month || !day) throw new Error(`String isn't an ISO date string: ${str}`)
		else return DDate.fromParts({ year, month, day })
	}

	static today(): DDate {
		const now = new Date()
		return DDate.fromParts({
			year: now.getUTCFullYear(),
			month: now.getUTCMonth() + 1,
			day: now.getUTCDate(),
		})
	}

	toParts(): DDateParts {
		return {
			year: this.year,
			month: this.month,
			day: this.day,
		}
	}

	toISOString(): string {
		return `${this.year}-${this.month.toString().padStart(2, "0")}-${this.day.toString().padStart(2, "0")}`
	}

	toUTCDate(): Date {
		return new Date(Date.UTC(this.year, this.month - 1, this.day))
	}
	// #endregion

	isEqual(other: DDate | undefined | null): boolean {
		if (!other) return false
		else return this.year === other.year && this.month === other.month && this.day === other.day
	}

	static #createUTCDate(parts: DDateParts): Date {
		return new Date(Date.UTC(parts.year, parts.month - 1, parts.day))
	}
	static #fromUTCDate(date: Date): DDate {
		return new DDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate())
	}

	static getMonthLayout(date: DDate): MonthLayout {
		const { year, month } = date

		// NOTE#1: In JS Date library, months are 0-indexed
		// NOTE#2: And 0th day of a month, gives the *last day* of *previous month*
		const leadingEnd = DDate.#createUTCDate({ year, month, day: 0 }).getUTCDate()
		const daysInMonth = DDate.#createUTCDate({ year, month: month + 1, day: 0 }).getUTCDate()

		const firstWeekday = DDate.#createUTCDate({ year, month, day: 1 }).getUTCDay()
		// NOTE#3: In JS Date library, week starts with Sunday
		// NOTE#4: And leading is first weekday (0-6) + (7 days - day offset) % 7 days
		const leadingDays = (firstWeekday + 6) % 7
		const trailingDays = (7 - ((leadingDays + daysInMonth) % 7)) % 7

		return {
			daysInMonth,
			leadingEnd,
			leadingDays,
			trailingDays,
		}
	}

	static getWeekCount(date: DDate): number {
		const { year, month } = date

		const firstDayIndex = DDate.#createUTCDate({ year, month, day: 1 }).getUTCDay()
		const startOffset = (firstDayIndex + 6) % 7

		const daysInMonth = DDate.#createUTCDate({ year, month: month + 1, day: 0 }).getUTCDate()
		return Math.ceil((startOffset + daysInMonth) / 7)
	}

	static offsetByDays(date: DDate, offset: number): DDate {
		const offsetDate = DDate.#createUTCDate({
			year: date.year,
			month: date.month,
			day: date.day + offset,
		})
		return DDate.#fromUTCDate(offsetDate)
	}

	getPreviousMonth(): DDate {
		const prevDate = DDate.#createUTCDate({
			year: this.year,
			month: this.month - 1,
			day: 1,
		})
		return DDate.#fromUTCDate(prevDate)
	}

	getNextMonth(): DDate {
		const nextDate = DDate.#createUTCDate({
			year: this.year,
			month: this.month + 1,
			day: 1,
		})
		return DDate.#fromUTCDate(nextDate)
	}
}
