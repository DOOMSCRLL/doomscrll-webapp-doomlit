import { error, fail } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"
import { env } from "$env/dynamic/private"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const projectId = params.projectId

	try {
		const response = await fetch(`${env.API_BASE_URL}/projects/${projectId}`)
		const result = await response.json()

		if (!response.ok || !result.success) {
			throw error(response.status || 404, result.error || "Reservation not found")
		}

		return {
			project: result.data
		}
	} catch (err) {
		console.error("Failed to load project:", err)
		throw error(404, "Reservation not found")
	}
}

export const actions: Actions = {
	cancelDraft: async ({ params, fetch, cookies }) => {
		try {
			const response = await fetch(`${env.API_BASE_URL}/projects/${params.projectId}`, {
				method: "DELETE"
			})

			if (!response.ok) {
				return fail(response.status, { success: false, message: "Failed to cancel draft" })
			}

			cookies.delete("activeDraftId", { path: "/" })

			return { success: true }
		} catch (err) {
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
								referenceId: params.projectId
							}
						}
					},
					relationships: {
						store: {
							data: { type: "stores", id: env.LEMONSQUEEZY_STORE_ID }
						},
						variant: {
							data: { type: "variants", id: env.LEMONSQUEEZY_VARIANT_ID }
						}
					}
				}
			}

			const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
				method: "POST",
				headers: {
					"Accept": "application/vnd.api+json",
					"Content-Type": "application/vnd.api+json",
					"Authorization": `Bearer ${env.LEMONSQUEEZY_API_KEY}`
				},
				body: JSON.stringify(reqBody)
			})

			const result = await response.json()

			if (!response.ok) {
				console.error("Lemon Squeezy error:", result)
				return fail(500, { success: false, message: "Failed to initialize payment gateway." })
			}

			const checkoutUrl = result.data.attributes.url

			return {
				success: true,
				checkoutUrl
			}
		} catch (err) {
			console.error("Error starting payment:", err)
			return fail(500, { success: false, message: "An internal error occurred." })
		}
	}
}
