import { redirect } from "@sveltejs/kit"
import { getCsrfToken, logout } from "repos/auth-repo"
import type { Actions } from "./$types"

export const actions: Actions = {
	default: async ({ fetch }) => {
		try {
			const { csrfToken } = await getCsrfToken(fetch)
			if (csrfToken) await logout(csrfToken, fetch)
		} catch (err) {
			console.error("Error during logout:", err)
		}

		throw redirect(303, "/")
	},
}
