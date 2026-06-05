import type { CATEGORY_NAMES } from "const/category-names"
import type Platform from "./platform"

type Tag = `#${string}`

export type CategoryName = (typeof CATEGORY_NAMES)[number]

type Category = {
	name: CategoryName
	slug: string
	platforms: Platform[]
	tags: Tag[]
}

export type { Category as default }
