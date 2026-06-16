<script lang="ts">
	import "styles/doomscrll-design-system.css"

	import { onMount, untrack } from "svelte"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte.js"
	import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
	import StylisticTimeFormat from "utils/stylistic-time-fmt.js"

	onMount(() => polyfillCountryFlagEmojis())

	let { data, children } = $props()

	let initialLocale = untrack(() => data.locale)

	const locale = LocaleContext.initialize(initialLocale)
	const dateFmt = DateFmtContext.initialize(new StylisticTimeFormat(initialLocale))

	$effect(() => {
		locale.value = data.locale
		dateFmt.value = new StylisticTimeFormat(data.locale)
	})
</script>

<svelte:head>
	<title>DOOMSCRLL</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="og:locale" content={data.locale} />
</svelte:head>

{@render children?.()}
