import TAGS from "const/tags"
import type Category from "models/category"
import type ProjectTag from "models/project-tag"

export function getTagsFor(category: Category): ProjectTag[] {
	return TAGS[category]
}
