import { fail } from "@sveltejs/kit"

import type { Actions, PageServerLoad } from "./$types"

import type Category from "models/category"
import type Project from "models/project"
import { getCsrfToken } from "repos/auth-repo"
import { getCreatorProject, publishCreatorProject, updateCreatorProject } from "repos/project-repo"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId
	const project = await getCreatorProject(referenceId, fetch)

	return { project }
}

function parseFormDataToPayload(formData: FormData): Partial<Project> {
	return {
		name: formData.get("project-name")?.toString(),
		category: formData.get("project-category")?.toString() as Category,
		description: formData.get("description")?.toString(),
		tags: formData.get("tags") ? JSON.parse(formData.get("tags") as string) : undefined,
		features: formData.get("features") ? JSON.parse(formData.get("features") as string) : undefined,
		secondaryPlatforms: formData.get("secondaryPlatforms")
			? JSON.parse(formData.get("secondaryPlatforms") as string)
			: undefined,
		coverImagePath: formData.get("coverImagePath")?.toString(),
		screenshotPaths: formData.get("screenshotPaths")
			? JSON.parse(formData.get("screenshotPaths") as string)
			: undefined,
		videoUrl: formData.get("videoUrl")?.toString(),
	}
}

export const actions: Actions = {
	publish: async ({ request, fetch, params, locals }) => {
		const referenceId = params.referenceId
		if (!referenceId)
			return fail(400, {
				status: 'The "Reference ID" of the project is missing! Please contact us from: hey@doomscrll.com',
			})

		const formData = await request.formData()
		const locale = locals.locale

		const { csrfToken } = await getCsrfToken(fetch)
		if (!csrfToken) return fail(403, { status: "ERROR_CSRF", message: "Security token missing. Please try again." })

		let updateMsg: string

		try {
			const payload = parseFormDataToPayload(formData)
			const response = await updateCreatorProject(referenceId, payload, locale, csrfToken, fetch)
			updateMsg = response.success === true ? response.message : ""
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Update action failed:", err)
			const code = err.body?.code || err.code || "INTERNAL_ERROR"
			return fail(err.status || 500, {
				status: code,
				message: err.body?.message || err.message,
				details: err.body?.details,
			})
		}

		try {
			const response = await publishCreatorProject(referenceId, locale, csrfToken, fetch)
			return {
				status: "PUBLISH_READY" as const,
				message: response.success ? `${updateMsg}\n\n${response.message}` : undefined,
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Publish validation failed:", err)

			if (err.status === 400 || err.status === 422) {
				return {
					status: "PUBLISH_INCOMPLETE" as const,
					message: `${updateMsg}\n\n${err.body?.message || err.message}`,
				}
			}

			const code = err.body?.code || err.code || "INTERNAL_ERROR"
			return fail(err.status || 500, {
				status: `PUBLISH_${code}`,
				message: `${updateMsg}\n\n${err.body?.message || err.message}`,
			})
		}
	},
}
