import { fail } from "@sveltejs/kit"

import type { Actions, PageServerLoad } from "./$types"

import { getCsrfToken } from "repos/auth-repo"
import { getCreatorProject, getReservationsFor, rescheduleCreatorProject } from "repos/project-repo"

export const load: PageServerLoad = async ({ params, fetch, url }) => {
	const referenceId = params.referenceId
	const now = new Date()

	const qYear = url.searchParams.get("year")
	const qMonth = url.searchParams.get("month")

	const targetYear = qYear ? parseInt(qYear, 10) : now.getFullYear()
	const targetMonth = qMonth ? parseInt(qMonth, 10) : now.getMonth() + 1

	const [project, reservations] = await Promise.all([
		getCreatorProject(referenceId, fetch),
		getReservationsFor(targetYear, targetMonth, fetch),
	])

	return {
		project,
		reservations,
		currentCalendar: {
			year: targetYear,
			month: targetMonth,
		},
	}
}

export const actions: Actions = {
	reschedule: async ({ request, fetch, params }) => {
		const referenceId = params.referenceId
		if (!referenceId)
			return fail(400, {
				status: 'The "Reference ID" of the project is missing! Please contact us from: hello@doomscrll.com',
			})

		const formData = await request.formData()
		const newDate = formData.get("newDate")?.toString()

		if (!newDate) {
			return fail(400, { status: "MISSING_DATE", message: "Please select a new date." })
		}

		const { csrfToken } = await getCsrfToken(fetch)
		if (!csrfToken) return fail(403, { status: "ERROR_CSRF", message: "Security token missing. Please try again." })

		try {
			const response = await rescheduleCreatorProject(referenceId, newDate, csrfToken, fetch)
			return {
				status: "RESCHEDULE_SUCCESS" as const,
				message: response.success === true ? response.message : undefined,
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Reschedule action failed:", err)
			const code = err.body?.code || err.code || "INTERNAL_ERROR"
			return fail(err.status || 500, {
				status: code,
				message: err.body?.message || err.message,
				details: err.body?.details,
			})
		}
	},
}
