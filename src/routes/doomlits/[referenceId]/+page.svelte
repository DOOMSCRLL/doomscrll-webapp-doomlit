<script lang="ts">
	//#region Imports
	import { untrack } from "svelte"
	import { SvelteSet } from "svelte/reactivity"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type { PlatformRecord } from "models/platform"
	import type ProjectTag from "models/project-tag"
	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import CopyableText from "comps/copyable-text.svelte"
	import ProjectStatusChip from "comps/form/data-chips/project-status-chip.svelte"
	import Dropdown from "comps/form/dropdown.svelte"
	import FeatureDdropdown from "comps/form/feature-ddropdown.svelte"
	import ImgInput from "comps/form/img-selector/img-input.svelte"
	import ManageMenu from "comps/form/manage-menu.svelte"
	import PlatformDdropdown from "comps/form/platform-ddropdown.svelte"
	import TagDdropdown from "comps/form/tag-ddropdown.svelte"
	import TextArea from "comps/form/text-area.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import YoutubeVideoInput from "comps/form/youtube-video-input.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	// #endregion

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).doomlits)
	const formDict = $derived(dict.projectForm)
	const fmt = $derived(DateFmtContext.context.value!)

	let helpModalTrigger = $state<HTMLButtonElement>()

	const project = $derived(data.project)
	const showcaseDate = $derived(DDate.fromISOString(project.showcaseDate))

	// #region Category and Dependants' Management
	let category = $state<Category>(untrack(() => project.category))
	let selectedTags = new SvelteSet<ProjectTag>(untrack(() => project.tags ?? []))
	const primaryPlatform = $derived<PlatformRecord>({ name: project.primaryPlatform, url: project.primaryUrl })
	let selectedPlatforms = new SvelteSet<PlatformRecord>(untrack(() => project.secondaryPlatforms ?? []))
	let selectedFeatures = new SvelteSet<string>(untrack(() => project.features ?? []))

	$effect(() => {
		if (category !== project.category) {
			untrack(() => {
				selectedTags.clear()
				selectedPlatforms.clear()
				selectedFeatures.clear()
			})
		}
	})
	// #endregion
</script>

<svelte:head>
	<title>{data.project.name} • {fmt.getFullDate(showcaseDate)} | DOOMSCRLL</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen flex-col overflow-hidden px-2 pb-2 supports-[height:100dvh]:h-dvh">
	<BrandNav comps={{ date: showcaseDate, returnHref: "/" }} bind:helpModalTrigger />
	<section class="h-full w-full overflow-hidden rounded-3xl border-4 border-inverse p-4 pr-1">
		<form
			action="?/publish"
			class="grid h-full w-full [scrollbar-color:var(--color-accent)_transparent] auto-rows-min grid-cols-2 justify-items-center gap-12 overflow-y-auto">
			<section class="flex w-full items-center gap-4">
				<Icon icon="Starmark" size="small" />
				<p class="font-serif text-2xl font-medium text-inverse">{formDict.refId.label}:</p>
				<CopyableText content={project.referenceId} />
			</section>
			<section class="flex w-full items-center justify-evenly gap-4">
				<ProjectStatusChip status={project.status} />
				<ManageMenu />
				<SlabButton variant="filled" fit="min" alignment="left" isDisabled={true}>
					<Icon icon="Upload" />
					{formDict.publish.label}
				</SlabButton>
			</section>
			<TextInput
				name="project-name"
				inputType="text"
				label={formDict.name.label}
				placeholder={formDict.name.placeholder}
				isRequired={true}
				value={project.name} />
			<Dropdown
				name="project-category"
				label={formDict.category.label}
				placeholder={formDict.category.placeholder}
				options={getCategories().map((c) => ({ label: getCategoryLabelFor(c, locale), value: c }))}
				isRequired={true}
				bind:value={category} />
			<TagDdropdown {category} {selectedTags} maxTagCount={data.rules.maxTagCount} />
			<PlatformDdropdown {category} {primaryPlatform} {selectedPlatforms} />
			<ImgInput
				name="project-cover"
				label={formDict.coverImg.label}
				placeholder={formDict.coverImg.placeholder}
				instructions={formDict.coverImg.instructions}
				tooltip={formDict.coverImg.tooltip}
				imageType="cover"
				isRequired={true}
				maxFileSizeMB={data.rules.maxImageFileSizeMB}
				initialUrls={project.coverImagePath ? [project.coverImagePath] : []} />
			<TextArea
				name="project-description"
				label={formDict.description.label}
				placeholder={formDict.description.placeholder}
				instructions={formDict.description.instructions}
				value={project.description ?? undefined} />
			<YoutubeVideoInput
				name="project-trailer-url"
				label={formDict.video.label}
				placeholder={formDict.video.placeholder}
				instructions={formDict.video.instructions}
				url={project.videoUrl ?? undefined} />
			<ImgInput
				name="project-screenshots"
				label={formDict.screenshots.label}
				placeholder={formDict.screenshots.placeholder}
				instructions={formDict.screenshots.instructions}
				tooltip={formDict.screenshots.tooltip}
				imageType="screenshot"
				canSelectMultiple={true}
				maxImages={data.rules.maxScreenshotCount}
				maxFileSizeMB={data.rules.maxImageFileSizeMB}
				initialUrls={project.screenshotPaths ?? []} />
			<section class="col-[span_2] w-full">
				<FeatureDdropdown {category} {selectedFeatures} />
			</section>
		</form>
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
