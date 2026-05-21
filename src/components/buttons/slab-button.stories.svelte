<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import Icon from "comps/icons/icon.svelte"
	import SlabButton from "./slab-button.svelte"

	const { Story } = defineMeta({
		title: "Interaction/Slab Button",
		component: SlabButton,
	})
</script>

<Story name="Text_Only">This is a test.</Story>
<Story name="Text_Icon">This is a test.<Icon icon="Doomeye" /></Story>
<Story name="Icon_Text"><Icon icon="Doomeye" />This is a test.</Story>
<Story name="Icon_Text_Icon"><Icon icon="Doomeye" />This is a test.<Icon icon="ArrowForward" /></Story>
