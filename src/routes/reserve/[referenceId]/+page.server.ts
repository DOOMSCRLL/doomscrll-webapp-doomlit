import { error, fail, isRedirect, redirect } from "@sveltejs/kit"

import { env } from "$env/dynamic/private"
import type { Actions, PageServerLoad } from "./$types"

import type { ProjectDraft } from "models/internal/projects"
import { getRules } from "repos/project-repo"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId

	try {
		const response = await fetch(`${env.API_BASE_URL}/projects/drafts/${referenceId}`)
		const result = await response.json()

		if (!response.ok || !result.success) {
			throw error(response.status || 404, result.error?.message || "Reservation not found")
		}

		// FIXME: Rules should be fetched by the root layout server file.
		const rules = await getRules(fetch)

		return { project: result.data as ProjectDraft, rules }
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

			if (!response.ok) {
				return fail(response.status, { success: false, message: "Failed to cancel draft" })
			}

			throw redirect(303, "/")
		} catch (err) {
			if (isRedirect(err)) throw err
			console.error("Error cancelling draft:", err)
			return fail(500, { success: false, message: "An internal error occurred" })
		}
	},
	startPayment: async ({ params, fetch }) => {
		try {
			if (!env.LEMONSQUEEZY_API_KEY || !env.LEMONSQUEEZY_STORE_ID || !env.LEMONSQUEEZY_VARIANT_ID) {
				console.error("Missing Lemon Squeezy environment variables.")
				return fail(500, { success: false, message: "Payment gateway is not configured." })
			}

			const reqBody = {
				data: {
					type: "checkouts",
					attributes: {
						checkout_data: {
							custom: {
								project_reference_id: params.referenceId,
							},
						},
					},
					relationships: {
						store: {
							data: { type: "stores", id: env.LEMONSQUEEZY_STORE_ID },
						},
						variant: {
							data: { type: "variants", id: env.LEMONSQUEEZY_VARIANT_ID },
						},
					},
				},
			}

			const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
				method: "POST",
				headers: {
					Accept: "application/vnd.api+json",
					"Content-Type": "application/vnd.api+json",
					Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
				},
				body: JSON.stringify(reqBody),
			})

			const result = await response.json()

			if (!response.ok) {
				console.error("Lemon Squeezy error:", result)
				return fail(500, { success: false, message: "Failed to initialize payment gateway." })
			}

			const checkoutUrl = result.data.attributes.url

			return {
				success: true,
				checkoutUrl,
			}
		} catch (err) {
			console.error("Error starting payment:", err)
			return fail(500, { success: false, message: "An internal error occurred." })
		}
	},
}
