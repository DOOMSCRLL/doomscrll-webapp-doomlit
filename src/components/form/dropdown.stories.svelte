<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import Dropdown from "./dropdown.svelte"

	const { Story } = defineMeta({
		title: "Forms/Dropdown",
		component: Dropdown,
	})
</script>

<Story name="Platform Dropdown" />
