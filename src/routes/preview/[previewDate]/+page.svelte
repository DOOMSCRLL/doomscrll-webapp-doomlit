<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import type { ProjectPreview } from "models/project.js"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import ProjectPreviewPopover from "comps/preview/project-preview-popover.svelte"
	import TagGroup from "comps/preview/tag-group.svelte"

	const { params, data } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value).preview)
	const date = $derived(DDate.fromISOString(params.previewDate))
	const previewMap = $derived(data.previews)

	let activePreview = $state<ProjectPreview>()
	let activeTrigger = $state<HTMLElement>()
	let hoverTimeout: ReturnType<typeof setTimeout>

	function handlePreviewHover(tag: ProjectTag, index: number, node: HTMLElement) {
		clearTimeout(hoverTimeout)
		activePreview = previewMap[tag][index]
		activeTrigger = node
	}
	function handlePreviewHoverEnd() {
		hoverTimeout = setTimeout(() => {
			activePreview = undefined
			activeTrigger = undefined
		}, 100)
	}
	function handlePopoverEnter() {
		clearTimeout(hoverTimeout)
	}
	function handlePopoverLeave() {
		handlePreviewHoverEnd()
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

	<section
		class={[
			"flex h-full w-full gap-4 overflow-x-auto overflow-y-hidden",
			"[scrollbar-color:var(--color-accent)_transparent] rounded-3xl border-4 border-inverse p-4 pb-0 contain-paint",
		]}>
		{#each Object.entries(previewMap) as [tag, previews], i (`${tag}_${i}`)}
			<TagGroup
				tag={tag as ProjectTag}
				projects={previews}
				onPreviewHover={handlePreviewHover}
				onPreviewHoverEnd={handlePreviewHoverEnd} />
		{/each}
	</section>
</main>

<ProjectPreviewPopover
	preview={activePreview}
	trigger={activeTrigger}
	onMouseEnter={handlePopoverEnter}
	onMouseLeave={handlePopoverLeave} />

<HelpModal bind:trigger={helpModalTrigger} />
