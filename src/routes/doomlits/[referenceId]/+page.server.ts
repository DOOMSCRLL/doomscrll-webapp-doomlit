import { error, fail } from "@sveltejs/kit"

import type { Actions, PageServerLoad } from "./$types"

import type { PatchContentPayload } from "models/internal/projects"
import { getCreatorProject, publishCreatorProject, updateCreatorProject } from "repos/project-repo"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId
	const project = await getCreatorProject(referenceId, fetch)

	return { project }
}

function parseFormDataToPayload(formData: FormData): PatchContentPayload {
	return {
		name: formData.get("project-name")?.toString(),
		category: formData.get("project-category")?.toString(),
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
	publish: async ({ request, fetch, params }) => {
		const referenceId = params.referenceId
		if (!referenceId) throw error(400, "Missing reference ID")

		const formData = await request.formData()

		try {
			const payload = parseFormDataToPayload(formData)
			await updateCreatorProject(referenceId, payload, fetch)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Update action failed:", err)
			return fail(err.status || 500, {
				success: false,
				error: {
					code: err.body?.code || err.code || "INTERNAL_ERROR",
					message: err.body?.message || err.message || "Failed to update DOOMLIT.",
					details: err.body?.details,
				},
			})
		}

		try {
			await publishCreatorProject(referenceId, fetch)
			return { success: true, isReady: true }
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			console.error("Publish validation failed:", err)
			return {
				success: true,
				isReady: false,
				validationErrors: err.body?.details || {},
			}
		}
	},
}
