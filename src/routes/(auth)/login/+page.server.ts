import { fail, redirect } from "@sveltejs/kit"
import { requestOtp, verifyOtp } from "repos/auth-repo"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ parent }) => {
	const { profile } = await parent()
	if (profile) {
		throw redirect(303, "/")
	}
}

export const actions: Actions = {
	request: async ({ request, fetch }) => {
		const data = await request.formData()
		const email = data.get("email")

		if (!email || typeof email !== "string") {
			return fail(400, { email: email?.toString() ?? "", error: "Email is required" })
		}

		try {
			const result = await requestOtp(email, fetch)
			return { step: "verify", email, message: result.message }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Error requesting OTP:", err)
			return fail(err.status || 500, { email, error: err.body?.message || "Internal Server Error" })
		}
	},

	verify: async ({ request, fetch }) => {
		const data = await request.formData()
		const email = data.get("email")
		const code = data.get("code")

		if (!email || typeof email !== "string" || !code || typeof code !== "string") {
			return fail(400, { email: email?.toString() ?? "", error: "Email and code are required" })
		}

		try {
			await verifyOtp(email, code, fetch)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Error verifying OTP:", err)
			return fail(err.status || 500, { step: "verify", email, error: err.body?.message || "Invalid code" })
		}

		throw redirect(303, "/")
	},
}
