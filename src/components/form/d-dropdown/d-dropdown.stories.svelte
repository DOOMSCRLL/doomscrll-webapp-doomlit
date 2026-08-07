<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import type { ComponentProps } from "svelte"

	import { PLATFORMS } from "const/platforms"
	import type { PlatformKey } from "models/platform"

	import FEATURES from "const/features"
	import TAGS from "const/tags"
	import DDropdown from "./d-dropdown.svelte"

	const { Story } = defineMeta({
		title: "Forms/Custom Dropdown",
		component: DDropdown,
	})

	const partArgs: Partial<ComponentProps<typeof DDropdown>> = {
		emptyQueryLabel: "LABEL_EMPTY_QUERY",
		name: "TEST_DROPDOWN",
		placeholder: "TEST_PLACEHOLDER",
	}
</script>

<Story
	name="Dropdown_Platforms"
	args={{
		...partArgs,
		options: [
			{
				label: "",
				opts: Object.keys(PLATFORMS)
					.map((p) => ({ value: p, label: PLATFORMS[p as PlatformKey].name }))
					.sort(),
			},
		],
	}} />

<Story
	name="Dropdown_Tags_Games"
	args={{
		...partArgs,
		options: [
			{
				label: "",
				opts: Object.values(TAGS["Video Games"])
					.map((t) => ({ label: t, value: t }))
					.sort(),
			},
		],
	}} />

<Story
	name="Dropdown_Features_Games_en"
	args={{
		...partArgs,
		options: [
			{
				label: "",
				opts: Object.values(FEATURES["Video Games"])
					.map((f) => ({ label: f, value: f }))
					.sort(),
			},
		],
	}} />
