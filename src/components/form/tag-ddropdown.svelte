<script lang="ts">
	import { SvelteSet } from "svelte/reactivity"

	import { LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type ProjectTag from "models/project-tag"
	import { getDictionaryOf } from "repos/locale-repo"
	import { getTagsFor } from "repos/tag-repo"

	import DDropdown from "./d-dropdown/d-dropdown.svelte"
	import DataChipContainer from "./data-chips/data-chip-container.svelte"
	import TagChip from "./data-chips/tag-chip.svelte"

	type Props = {
		category: Category
		selectedTags: SvelteSet<ProjectTag>
		maxTagCount: number
	}

	let { category, selectedTags, /*= $bindable(new SvelteSet())*/ maxTagCount }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.projectForm.tags)
	let isDisabled = $derived(selectedTags.size >= maxTagCount)

	const tagList = $derived(getTagsFor(category))
	const tags = $derived.by<ProjectTag[]>(() => {
		if (selectedTags.size <= 0) return tagList
		else return tagList.filter((t) => !selectedTags.has(t))
	})

	function handleTagSelection(value: string) {
		selectedTags.add(value as ProjectTag)
	}
	function handleTagRemove(tag: ProjectTag) {
		selectedTags.delete(tag)
	}
</script>

<section class="flex w-full flex-col items-start gap-4">
	<DDropdown
		name="project-tag"
		emptyQueryLabel={dict.dropdown.labelEmptyQuery}
		label={dict.label.text}
		placeholder={dict.label.placeholder}
		instructions={dict.label.instructions}
		tooltip={dict.tooltip}
		onChange={handleTagSelection}
		{isDisabled}
		options={[
			{
				label: dict.dropdown.labelTagGroup,
				opts: tags.map((t) => ({ value: t, label: t })),
			},
		]} />
	<DataChipContainer layout="row-wrap">
		{#each selectedTags as tag (tag)}
			<TagChip {tag} onRemove={handleTagRemove} />
		{/each}
	</DataChipContainer>
</section>
