import { error, fail, isRedirect, redirect } from "@sveltejs/kit"

import { API_BASE_URL } from "$env/static/private"
import type { Actions, PageServerLoad } from "./$types"

import type { ProjectDraft } from "models/internal/projects"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId

	try {
		const response = await fetch(`${API_BASE_URL}/projects/drafts/${referenceId}`)
		const result = await response.json()

		if (!response.ok || !result.success) {
			throw error(response.status || 404, result.error?.message || "Reservation not found")
		}

		return { project: result.data as ProjectDraft }
	} catch (err) {
		console.error("Failed to load project:", err)
		throw error(404, "Reservation not found")
	}
}

export const actions: Actions = {
	cancelDraft: async ({ params, fetch }) => {
		try {
			const csrfRes = await fetch(`${env.API_BASE_URL}/auth/csrf`)
			const csrfData = await csrfRes.json()

			if (!csrfRes.ok || !csrfData.success) {
				return fail(500, { success: false, message: "Failed to acquire CSRF token." })
			}

			const response = await fetch(`${env.API_BASE_URL}/projects/${params.referenceId}`, {
				method: "DELETE",
				headers: {
					"csrf-token": csrfData.csrfToken,
				},
			})

			const result = await response.json().catch(() => null)

			if (!response.ok || !result?.success) {
				if (response.status !== 404) {
					return fail(response.status || 500, {
						success: false,
						message: result?.error?.message || result?.error || "Failed to cancel draft",
					})
				}
			}

			throw redirect(303, "/")
		} catch (err) {
			if (isRedirect(err)) throw err
			console.error("Error cancelling draft:", err)
			return fail(500, { success: false, message: "An internal error occurred" })
		}
	},
}
