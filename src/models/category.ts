import type { CATEGORIES } from "const/categories"
import type Platform from "./platform"
import type ProjectTag from "./project-tag"

export type CategoryName = (typeof CATEGORIES)[number]

type Category = {
	name: CategoryName
	slug: string
	platforms: Platform[]
	tags: ProjectTag[]
}

export type { Category as default }
