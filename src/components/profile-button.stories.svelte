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
			id: "9e662589-6490-4abb-8dbf-b7952fb0c515",
			email: "author@doomscrll.com",
			username: "DOOMSCRLL",
			description: "Lorem ipsum dorem...",
			url: "example.com",
		},
	}} />
