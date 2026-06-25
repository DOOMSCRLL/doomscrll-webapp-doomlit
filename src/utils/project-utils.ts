import type { ProjectPreview } from "models/project"
import type ProjectTag from "models/project-tag"

type TagPreviewMap = Record<ProjectTag, ProjectPreview[]>

// *Doesn't filter by category!*
export function groupPreviewsByTag(previews: ProjectPreview[]): TagPreviewMap {
	return previews.reduce((acc, curr) => {
		const firstTag = curr.tags[0] ?? "#no-tag"
		;(acc[firstTag] ??= []).push(curr)
		return acc
	}, {} as TagPreviewMap)
}
