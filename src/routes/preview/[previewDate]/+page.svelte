<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"
	import DDate from "utils/d-date.js"

	import BrandNav from "comps/brand-nav.svelte"
	import HelpModal from "comps/help-modal.svelte"

	const { params, data } = $props()
	const dict = $derived(getDictionaryOf(LocaleContext.context.value).preview)

	const date = $derived(DDate.fromISOString(params.previewDate))

	let helpModalTrigger = $state<HTMLButtonElement>()
	// TODO: Implement preview view.
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix} ({date.toISOString()})</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen flex-col overflow-hidden px-4 pb-4 supports-[height:100dvh]:h-dvh">
	<BrandNav
		bind:helpModalTrigger
		comps={{
			date,
			reservationLimit: data.rules.maxReservationsPerDay,
			reservationProgress: data.projects.length,
			returnHref: `/?year=${date.year}&month=${date.month}`,
		}} />
	<section>
		<!-- Where is my child, where is my child. -->
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
