import type { LayoutServerLoad } from "./$types"
import { getMe } from "repos/profile-repo"

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
	const profile = await getMe(fetch)

	return { 
		locale: locals.locale,
		profile
	}
}
