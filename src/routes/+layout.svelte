<script lang="ts">
	import "styles/doomscrll-design-system.css"

  import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
  import { onMount } from "svelte"

  onMount(() => polyfillCountryFlagEmojis())

	let { children } = $props();
</script>

{@render children?.()}
