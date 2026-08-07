<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getPlatform, getPlatformsListFor } from "repos/platform-repo"
	import Dropdown from "./dropdown.svelte"

	const { Story } = defineMeta({
		title: "Forms/Dropdown",
		component: Dropdown,
	})
</script>

<Story
	name="Dropdown_Categories"
	args={{
		label: "Category",
		name: "category",
		placeholder: "Select a category",
		options: getCategories().map((c) => ({ label: getCategoryLabelFor(c), value: c })),
	}} />
<Story
	name="Dropdown_Platforms_Game"
	args={{
		label: "Platforms",
		name: "platform",
		placeholder: "Select a platform",
		options: getPlatformsListFor("Video Games").map((key) => ({ label: getPlatform(key).name, value: key })),
	}} />
<Story
	name="Dropdown_Platforms_Digital Assets"
	args={{
		label: "Platforms",
		name: "platform",
		placeholder: "Select a platform",
		options: getPlatformsListFor("Digital Assets").map((key) => ({ label: getPlatform(key).name, value: key })),
	}} />
