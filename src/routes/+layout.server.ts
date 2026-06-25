import { getMe } from "repos/profile-repo"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const profile = await getMe(fetch)

	return {
		locale: locals.locale,
		profile,
	}
}
