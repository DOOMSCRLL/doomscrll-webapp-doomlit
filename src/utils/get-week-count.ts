function getMonthAndYear(date: Date): { year: number; month: number } {
	return {
		year: date.getFullYear(),
		month: date.getMonth(),
	}
}

export default function getWeekCount(date: Date): number {
	const { month, year } = getMonthAndYear(date)

	const firstDayIndex = new Date(year, month, 1).getDay()
	const startOffset = (firstDayIndex + 6) % 7

	const daysInMonth = new Date(year, month + 1, 0).getDate()
	return Math.ceil((startOffset + daysInMonth) / 7)
}
