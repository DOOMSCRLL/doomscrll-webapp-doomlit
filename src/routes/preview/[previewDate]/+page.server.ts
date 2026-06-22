import type { PageServerLoad } from "./$types"

import { getPreviewsFor, getRules } from "repos/project-repo"
import DDate from "utils/d-date"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const date = DDate.fromISOString(params.previewDate)

	const [rules, projects] = await Promise.all([getRules(fetch), getPreviewsFor(date, fetch)])

	return { rules, projects }
}
