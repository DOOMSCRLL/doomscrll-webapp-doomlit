<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import ProfileButton from "./profile-button.svelte"

	const { Story } = defineMeta({
		title: "Menus/Profile Button",
		component: ProfileButton,
	})
</script>

<Story name="Default" />

<Story name="Signed" />
