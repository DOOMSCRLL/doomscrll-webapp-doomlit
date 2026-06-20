<script lang="ts">
	import "styles/doomscrll-design-system.css"

	import { onMount, untrack } from "svelte"

	import { DateFmtContext, LocaleContext, ProfileContext } from "contexts/shared.svelte.js"
	import { polyfillCountryFlagEmojis } from "country-flag-emoji-polyfill"
	import StylisticTimeFormat from "utils/stylistic-time-fmt.js"

	onMount(() => polyfillCountryFlagEmojis())

	let { data, children } = $props()

	let initialLocale = untrack(() => data.locale)
	let initialProfile = untrack(() => data.profile ?? undefined)

	const locale = LocaleContext.initialize(initialLocale)
	const dateFmt = DateFmtContext.initialize(new StylisticTimeFormat(initialLocale))
	const profile = ProfileContext.initialize(initialProfile)

	$effect(() => {
		locale.value = data.locale
		dateFmt.value = new StylisticTimeFormat(data.locale)
		profile.value = data.profile ?? undefined
	})
</script>

<svelte:head>
	<title>DOOMSCRLL</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="og:locale" content={data.locale} />
</svelte:head>

{@render children?.()}
