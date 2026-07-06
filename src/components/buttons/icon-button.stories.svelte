<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"


	import IconButton from "./icon-button.svelte"

	const { Story } = defineMeta({
		title: "Interaction/Icon Button",
		component: IconButton,
	})
</script>

<Story name="Filled" args={{ variant: "filled" }} />
<Story name="Outlined" args={{ variant: "outlined" }} />
<Story name="Text" args={{ variant: "text" }} />
