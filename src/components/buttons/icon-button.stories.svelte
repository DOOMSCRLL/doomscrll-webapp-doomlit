<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import { getAllDoomscrllIcons } from "comps/icons/doomscrll-icons"
	import IconButton from "./icon-button.svelte"

	const { Story } = defineMeta({
		title: "Interaction/Icon Button",
		component: IconButton,
		argTypes: { icon: { options: getAllDoomscrllIcons() } },
	})
</script>

<Story name="Filled" args={{ variant: "filled" }} />
<Story name="Outlined" args={{ variant: "outlined" }} />
<Story name="Text" args={{ variant: "text" }} />
