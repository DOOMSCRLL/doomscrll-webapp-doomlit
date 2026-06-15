<script lang="ts">
	import "styles/doomscrll-design-system.css"

	import LocaleContext from "contexts/locale-context"
	import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
	import { onMount } from "svelte"

	onMount(() => polyfillCountryFlagEmojis())

	let { data, children } = $props()

	const initialLocale = $derived(data.locale)
	LocaleContext.setContext(initialLocale)
</script>

<svelte:head>
	<title>DOOMSCRLL</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="og:locale" content={initialLocale} />
</svelte:head>

{@render children?.()}
