import { fail, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

import { API_BASE_URL } from "$env/static/private"
import { getActiveDraftReference, getReservationsFor, getRules } from "repos/project-repo"

export const load: PageServerLoad = async ({ fetch, url }) => {
	const now = new Date()

	const qYear = url.searchParams.get("year")
	const qMonth = url.searchParams.get("month")

	const targetYear = qYear ? parseInt(qYear, 10) : now.getFullYear()
	const targetMonth = qMonth ? parseInt(qMonth, 10) : now.getMonth() + 1

	const activeDraftId = (await getActiveDraftReference(fetch)) ?? undefined

	const [rules, reservations] = await Promise.all([getRules(fetch), getReservationsFor(targetYear, targetMonth, fetch)])

	return {
		rules,
		reservations,
		activeDraftId,
		currentCalendar: {
			year: targetYear,
			month: targetMonth,
		},
	}
}

export const actions: Actions = {
	reserve: async ({ request, fetch }) => {
		const data = await request.formData()

		const name = data.get("project-name")?.toString()
		const category = data.get("project-category")?.toString()
		const primaryPlatform = data.get("project-platform")?.toString()
		const primaryUrl = data.get("project-url")?.toString()
		const showcaseDate = data.get("showcase-date")?.toString()

		if (!name || !category || !primaryPlatform || !primaryUrl || !showcaseDate) {
			return fail(400, { success: false, message: "All fields are required." })
		}

		try {
			const csrfRes = await fetch(`${API_BASE_URL}/auth/csrf`)
			const csrfData = await csrfRes.json()

			if (!csrfRes.ok || !csrfData.success) {
				return fail(500, { success: false, message: "Failed to acquire CSRF token." })
			}

			const response = await fetch(`${API_BASE_URL}/projects/reserve`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"csrf-token": csrfData.csrfToken,
				},
				body: JSON.stringify({
					name,
					category,
					primaryPlatform,
					primaryUrl,
					showcaseDate,
				}),
			})

			const result = await response.json()

			if (!response.ok || !result.success) {
				return fail(response.status || 500, {
					success: false,
					message: result.error?.message || result.error || "Failed to create reservation draft.",
				})
			}

			return {
				success: true,
				referenceId: result.data?.referenceId,
				message: "DOOMLIT draft saved. Please proceed to payment within 15 minutes.",
			}
		} catch (error) {
			console.error("Reservation error:", error)
			return fail(500, { success: false, message: "An unexpected error occurred." })
		}
	},
}
