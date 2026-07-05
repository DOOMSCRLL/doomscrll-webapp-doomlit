import { getMe } from "repos/profile-repo"
import { getRules } from "repos/project-repo"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const [profile, rules] = await Promise.all([getMe(fetch), getRules(fetch)])

	return {
		locale: locals.locale,
		profile,
		rules,
	}
}
