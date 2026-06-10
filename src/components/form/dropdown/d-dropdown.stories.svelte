<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import type { ComponentProps } from "svelte"

	import { PLATFORMS } from "const/platforms"
	import type { PlatformName } from "models/platform"

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
		options: Object.keys(PLATFORMS).map((p) => ({ value: p, label: PLATFORMS[p as PlatformName].name })),
	}} />

<Story
	name="Dropdown_Tags_Games"
	args={{
		...partArgs,
		options: Object.values(TAGS["Video Games"]).map((t) => ({ label: t, value: t })),
	}} />

<Story
	name="Dropdown_Features_Games_en"
	args={{
		...partArgs,
		options: Object.values(FEATURES["Video Games"]).map((f) => ({ label: f, value: f })),
	}} />
