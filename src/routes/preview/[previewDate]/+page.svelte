<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import HelpModal from "comps/help-modal.svelte"

	const { params, data } = $props()
	const dict = $derived(getDictionaryOf(LocaleContext.context.value).preview)
	const date = $derived(DDate.fromISOString(params.previewDate))

	let helpModalTrigger = $state<HTMLButtonElement>()
	// TODO: The preview window needs a category filter dropdown.
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix} ({date.toISOString()})</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen flex-col overflow-hidden px-2 pb-2 supports-[height:100dvh]:h-dvh">
	<BrandNav
		bind:helpModalTrigger
		comps={{
			date,
			reservationLimit: data.rules.maxReservationsPerDay,
			reservationProgress: data.reservations,
			returnHref: `/?year=${date.year}&month=${date.month}`,
		}} />
	<section class="flex h-full w-full rounded-3xl border-4 border-inverse">
		<p class="text-[red]">DELETE - FOR TESTING! (Category is {data.category})</p>
		<!-- Where is my child, where is my child. -->
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
