import type { PageServerLoad } from "./$types"

import type Category from "models/category"
import { isCategory } from "repos/category-repo"
import { getPreviewsFor, getRules } from "repos/project-repo"
import DDate from "utils/d-date"
import { groupPreviewsByTag } from "utils/project-utils"

export const load: PageServerLoad = async ({ params, url, fetch }) => {
	const date = DDate.fromISOString(params.previewDate)

	const qCategory = url.searchParams.get("category")
	const category: Category = isCategory(qCategory) ? qCategory : "Video Games"

	const [rules, previews] = await Promise.all([getRules(fetch), getPreviewsFor(date, category, fetch)])

	return { rules, previews: groupPreviewsByTag(previews), previewCount: previews.length, category }
}
