import type DDate from "utils/d-date"
import type Category from "./category"
import type ProjectTag from "./project-tag"

type Project = {
	id: string
	referenceId: string
	category: Category
	showcaseDate: DDate
	name: string
	authorHandle: string
	tags: ProjectTag[]
}

export type { Project as default }
