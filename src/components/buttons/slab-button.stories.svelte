<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import SlabButton from "./slab-button.svelte"
	// FIXME: I forgot how to write usable stories! :(
	const { Story } = defineMeta({
		title: "Interaction/Slab Button",
		component: SlabButton,
	})
</script>

<Story name="Default" />
