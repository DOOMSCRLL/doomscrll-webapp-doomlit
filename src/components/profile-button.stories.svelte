<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import ProfileButton from "./profile-button.svelte"

	const { Story } = defineMeta({
		title: "Menus/Profile Button",
		component: ProfileButton,
	})
</script>

<Story name="Anonymous" />
<Story
	name="Signed"
	args={{
		profile: {
			id: "UUID_TEST_STRING",
			email: "author@doomscrll.com",
			username: "DOOMSCRLL",
		},
	}}
/>
