import { getCreatorProject } from "repos/project-repo"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params, fetch }) => {
	const referenceId = params.referenceId
	const project = await getCreatorProject(referenceId, fetch)

	return { project }
}
