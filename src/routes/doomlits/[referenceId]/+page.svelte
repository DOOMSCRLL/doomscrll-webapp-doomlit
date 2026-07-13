<script lang="ts">
	import { untrack } from "svelte"
	import { SvelteSet } from "svelte/reactivity"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type ProjectTag from "models/project-tag.js"
	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import CopyableText from "comps/copyable-text.svelte"
	import Dropdown from "comps/form/dropdown.svelte"
	import FeatureDdropdown from "comps/form/feature-ddropdown.svelte"
	import ImgInput from "comps/form/img-selector/img-input.svelte"
	import PlatformDdropdown from "comps/form/platform-ddropdown.svelte"
	import TagDdropdown from "comps/form/tag-ddropdown.svelte"
	import TextArea from "comps/form/text-area.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import YoutubeVideoInput from "comps/form/youtube-video-input.svelte"
	import HelpModal from "comps/help-modal.svelte"
	import Icon from "comps/icons/icon.svelte"
	import type { PlatformURL } from "models/platform.js"

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
	let selectedTags = new SvelteSet<ProjectTag>() // Reactive collection
	let selectedPlatforms = $state<PlatformURL[]>([])
	let selectedFeatures = new SvelteSet<string>()
	// #endregion
</script>

<svelte:head>
	<title>{data.project.name} • {fmt.getFullDate(showcaseDate)}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen flex-col overflow-hidden px-2 pb-2 supports-[height:100dvh]:h-dvh">
	<BrandNav comps={{ date: showcaseDate, returnHref: "/" }} bind:helpModalTrigger />
	<section class="h-full w-full overflow-hidden rounded-3xl border-4 border-inverse p-4">
		<div
			class={[
				"flex h-full w-full flex-col items-start justify-start gap-12 overflow-y-auto",
				"[scrollbar-color:var(--color-accent)_transparent]",
			]}>
			<section class="flex items-center gap-4">
				<p class="font-serif text-2xl font-medium text-inverse">
					<Icon icon="Starmark" size="small" />
					{formDict.refId.label}:
				</p>
				<CopyableText content={project.referenceId} />
			</section>
			<form action="" class="grid h-full w-full auto-rows-min grid-cols-2 justify-items-center gap-12">
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
					bind:value={category}
					isRequired={true} />
				<TagDdropdown {category} {selectedTags} maxTagCount={5} />
				<PlatformDdropdown {category} bind:selectedPlatforms />
				<FeatureDdropdown {category} {selectedFeatures} />
				<ImgInput
					name="project-cover"
					label={formDict.coverImg.label}
					placeholder={formDict.coverImg.placeholder}
					instructions={formDict.coverImg.instructions}
					tooltip={formDict.coverImg.tooltip}
					imageType="cover"
					isRequired={true}
					maxFileSizeMB={10} />
				<TextArea
					name="project-description"
					label={formDict.description.label}
					placeholder={formDict.description.placeholder}
					instructions={formDict.description.instructions} />
				<YoutubeVideoInput
					name="project-trailer-url"
					label={formDict.video.label}
					placeholder={formDict.video.placeholder}
					instructions={formDict.video.instructions} />
				<ImgInput
					name="project-screenshots"
					label={formDict.screenshots.label}
					placeholder={formDict.screenshots.placeholder}
					instructions={formDict.screenshots.instructions}
					tooltip={formDict.screenshots.tooltip}
					imageType="screenshot"
					canSelectMultiple={true}
					maxImages={8}
					maxFileSizeMB={10} />
			</form>
		</div>
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
