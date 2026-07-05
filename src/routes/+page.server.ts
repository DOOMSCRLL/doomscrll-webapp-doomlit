import { env } from "$env/dynamic/private"

import { fail, redirect, isRedirect, type Actions } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

import { getActiveDraftReference, getReservationsFor } from "repos/project-repo"

export const load: PageServerLoad = async ({ fetch, url }) => {
	const now = new Date()

	const qYear = url.searchParams.get("year")
	const qMonth = url.searchParams.get("month")

	const targetYear = qYear ? parseInt(qYear, 10) : now.getFullYear()
	const targetMonth = qMonth ? parseInt(qMonth, 10) : now.getMonth() + 1

	const activeDraft = (await getActiveDraftReference(fetch)) ?? undefined

	const reservations = await getReservationsFor(targetYear, targetMonth, fetch)

	return {
		reservations,
		activeDraftId: activeDraft?.referenceId,
		activeDraftReservedAt: activeDraft?.reservedAt,
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
			const csrfRes = await fetch(`${env.API_BASE_URL}/auth/csrf`)
			const csrfData = await csrfRes.json()

			if (!csrfRes.ok || !csrfData.success) {
				return fail(500, { success: false, message: "Failed to acquire CSRF token." })
			}

			const response = await fetch(`${env.API_BASE_URL}/projects/reserve`, {
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

			throw redirect(303, `/reserve/${result.data?.referenceId}`)
		} catch (error) {
			if (isRedirect(error)) throw error
			console.error("Reservation error:", error)
			return fail(500, { success: false, message: "An unexpected error occurred." })
		}
	},
	cancelDraft: async ({ request, fetch }) => {
		try {
			const csrfRes = await fetch(`${env.API_BASE_URL}/auth/csrf`)
			const csrfData = await csrfRes.json()

			if (!csrfRes.ok || !csrfData.success) {
				return fail(500, { success: false, message: "Failed to acquire CSRF token." })
			}

			const form = await request.formData()
			const response = await fetch(`${env.API_BASE_URL}/projects/${form.get("activeDraftId")}`, {
				method: "DELETE",
				headers: {
					"csrf-token": csrfData.csrfToken,
				},
			})

			const result = await response.json().catch(() => null)

			if (!response.ok || !result?.success) {
				if (response.status === 404) return { success: true }

				return fail(response.status || 500, {
					success: false,
					message: result?.error?.message || result?.error || "Failed to cancel draft",
				})
			}

			return { success: true }
		} catch (err) {
			console.error("Error cancelling draft:", err)
			return fail(500, { success: false, message: "An internal error occurred" })
		}
	},
}
