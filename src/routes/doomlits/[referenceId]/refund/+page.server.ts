import { fail } from "@sveltejs/kit"
import type { Actions, PageServerLoad } from "./$types"

import { getCsrfToken } from "repos/auth-repo"
import { getCreatorProject, refundCreatorProject } from "repos/project-repo"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId
	const project = await getCreatorProject(referenceId, fetch)

	return { project }
}

export const actions: Actions = {
	refund: async ({ fetch, params }) => {
		const referenceId = params.referenceId
		if (!referenceId)
			return fail(400, {
				status: 'The "Reference ID" of the project is missing! Please contact us from: hello@doomscrll.com',
			})

		const { csrfToken } = await getCsrfToken(fetch)
		if (!csrfToken) return fail(403, { status: "ERROR_CSRF", message: "Security token missing. Please try again." })

		try {
			const response = await refundCreatorProject(referenceId, csrfToken, fetch)
			return {
				status: "REFUND_SUCCESS" as const,
				message: response.success ? response.message : undefined,
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Refund action failed:", err)
			const code = err.body?.code || err.code || "INTERNAL_ERROR"
			return fail(err.status || 500, {
				status: `REFUND_${code}`,
				message: err.body?.message || err.message,
			})
		}
	},
}
