import { fail, redirect } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

import { getCsrfToken } from "repos/auth-repo"
import { updateMe } from "repos/profile-repo"

export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent()
	if (!profile) throw redirect(303, "/")
}

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData()

		const username = data.get("username")?.toString()
		const description = data.get("description")?.toString()
		const url = data.get("url")?.toString()

		try {
			const { csrfToken } = await getCsrfToken(fetch)
			if (!csrfToken) return fail(403, { message: "Security token missing. Please try again." })

			await updateMe({ username, description, url }, csrfToken, fetch)
			return { success: true, message: "Profile updated successfully!" }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Error updating profile:", err)
			return fail(err.status || 500, {
				message: err.body?.message || "Failed to update profile. Please try again.",
			})
		}
	},
}
