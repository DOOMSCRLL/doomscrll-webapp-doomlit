<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import { PLATFORM_SLUGS, PLATFORMS_ALL } from "const/platforms"
	import Dropdown from "./dropdown.svelte"

	const { Story } = defineMeta({
		title: "Forms/Dropdown",
		component: Dropdown,
	})
</script>

<Story
	name="Platform Dropdown"
	args={{
		label: "Platforms",
		name: "platform",
		placeholder: "Select a platform",
		options: PLATFORMS_ALL.map((p) => ({ label: p, value: PLATFORM_SLUGS[p] })),
	}} />
