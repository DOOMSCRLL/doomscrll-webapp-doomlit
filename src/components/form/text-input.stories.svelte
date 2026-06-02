<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import TextInput from "./text-input.svelte"

	const { Story } = defineMeta({
		title: "Forms/Text Input",
		component: TextInput,
	})
</script>

<Story name="Row" args={{ label: "TEST_LABEL", name: "TEST_INPUT", placeholder: "Test placeholder" }} />
<Story
	name="Column"
	args={{ label: "TEST_LABEL", name: "TEST_INPUT", placeholder: "Test placeholder", layout: "column" }} />
