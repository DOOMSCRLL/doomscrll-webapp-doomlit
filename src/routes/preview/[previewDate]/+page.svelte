<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import TagGroup from "comps/preview/tag-group.svelte"

	const { params, data } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value).preview)
	const date = $derived(DDate.fromISOString(params.previewDate))
	const previewMap = $derived(data.previews)

	let helpModalTrigger = $state<HTMLButtonElement>()
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

	<section class="flex h-full w-full overflow-hidden rounded-3xl border-4 border-inverse">
		{#each Object.entries(previewMap) as [tag, previews], i (`${tag}_${i}`)}
			<TagGroup tag={tag as ProjectTag} projects={previews} />
		{/each}
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
