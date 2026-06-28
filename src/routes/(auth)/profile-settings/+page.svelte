<script lang="ts">
	import { ProfileContext } from "contexts/shared.svelte.js"

	const profile = $derived(ProfileContext.context.value!)
</script>

<main></main>
