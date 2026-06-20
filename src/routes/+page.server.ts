import type { PageServerLoad } from "./$types"

import { getReservationsFor, getRules } from "repos/project-repo"

export const load: PageServerLoad = async ({ fetch, url }) => {
	const now = new Date()

	const qYear = url.searchParams.get("year")
	const qMonth = url.searchParams.get("month")

	const targetYear = qYear ? parseInt(qYear, 10) : now.getFullYear()
	const targetMonth = qMonth ? parseInt(qMonth, 10) : now.getMonth() + 1

	const [rules, reservations] = await Promise.all([getRules(fetch), getReservationsFor(targetYear, targetMonth, fetch)])

	return {
		rules,
		reservations,
		currentCalendar: {
			year: targetYear,
			month: targetMonth,
		},
	}
}
