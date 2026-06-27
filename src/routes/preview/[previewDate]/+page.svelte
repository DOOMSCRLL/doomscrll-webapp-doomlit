<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import type { ProjectPreview } from "models/project.js"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import TagGroup from "comps/preview/tag-group.svelte"
	import Tooltip from "comps/tooltip.svelte"
	import { getCategoryLabelFor } from "repos/category-repo.js"
	import { generateHslFrom, hslStrToCss } from "utils/generate-hsl-from.js"

	const { params, data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).preview)
	const date = $derived(DDate.fromISOString(params.previewDate))
	const previewMap = $derived(data.previews)

	let hoverTimeout: ReturnType<typeof setTimeout>

	let activePreview = $state<ProjectPreview>()
	let activeTrigger = $state<HTMLElement>()

	function handlePreviewHover(event: Event) {
		const target = (event.target as HTMLElement).closest("[data-preview-tag]") as HTMLElement
		if (!target) return

		const tag = target.getAttribute("data-preview-tag") as ProjectTag
		const indexStr = target.getAttribute("data-preview-index")
		if (!indexStr) return
		const index = parseInt(indexStr)

		clearTimeout(hoverTimeout)

		activePreview = previewMap[tag][index]
		activeTrigger = target
	}
	function handlePreviewHoverEnd(event: Event) {
		const target = (event.target as HTMLElement).closest("[data-preview-tag]")
		if (!target) return

		hoverTimeout = setTimeout(() => {
			activePreview = undefined
			activeTrigger = undefined
		}, 100)
	}

	let helpModalTrigger = $state<HTMLButtonElement>()
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix} ({date.toISOString()}) | DOOMSCRLL</title>
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

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<section
		class={[
			"flex h-full w-full gap-4 overflow-x-auto overflow-y-hidden p-4 pb-0 contain-paint",
			"[scrollbar-color:var(--color-accent)_transparent] rounded-3xl border-4 border-inverse",
		]}
		onmouseover={handlePreviewHover}
		onfocus={handlePreviewHover}
		onmouseout={handlePreviewHoverEnd}
		onblur={handlePreviewHoverEnd}>
		{#each Object.entries(previewMap) as [tag, previews], i (`${tag}_${i}`)}
			<TagGroup tag={tag as ProjectTag} projects={previews} />
		{/each}
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />

<Tooltip trigger={activeTrigger} open={activePreview !== undefined}>
	{#if activePreview}
		<p class="font-serif font-medium text-inverse italic">
			<Icon icon="Starmark" size="small" />
			{getCategoryLabelFor(activePreview.category, locale)}
		</p>
		<p class="font-serif tracking-tight text-inverse italic">{activePreview.authorName}</p>
		<p class="font-serif text-2xl font-medium tracking-tighter text-inverse">{activePreview.name}</p>
		<section class="flex flex-col">
			{#each activePreview.tags as tag (`${activePreview.name}_${tag}`)}
				<p class="font-serif font-bold italic" style="color:{hslStrToCss(generateHslFrom(tag))}">
					{tag}
				</p>
			{/each}
		</section>
	{:else}
		<p class="font-serif">MISSING_INVALID_TOOLTIP_MESSAGE</p>
	{/if}
</Tooltip>
