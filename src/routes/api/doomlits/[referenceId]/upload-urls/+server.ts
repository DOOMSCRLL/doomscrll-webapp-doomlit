import { json } from "@sveltejs/kit"

import { getUploadUrls } from "repos/project-repo"

import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ params, url, locals, fetch }) => {
	const screenshotCount = Number(url.searchParams.get("screenshotCount") ?? "0")
	const data = await getUploadUrls(params.referenceId, screenshotCount, locals.locale, fetch)
	return json(data)
}
