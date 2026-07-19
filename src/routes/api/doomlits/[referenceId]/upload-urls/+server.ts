import { json } from "@sveltejs/kit"

import { getCsrfToken } from "repos/auth-repo"
import { getUploadUrls } from "repos/project-repo"

import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ params, url, locals, fetch }) => {
	const { csrfToken } = await getCsrfToken(fetch)
	if (!csrfToken) return json({ message: "Security token missing. Please try again." }, { status: 403 })

	const screenshotCount = Number(url.searchParams.get("screenshotCount") ?? "0")
	const data = await getUploadUrls(params.referenceId, screenshotCount, locals.locale, csrfToken, fetch)
	return json(data)
}
