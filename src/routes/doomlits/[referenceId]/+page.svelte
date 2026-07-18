<script lang="ts">
	//#region Imports
	import { enhance } from "$app/forms"
	import type { SubmitFunction } from "@sveltejs/kit"
	import { untrack } from "svelte"
	import { SvelteSet } from "svelte/reactivity"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import type { UploadUrlsData } from "models/internal/projects"
	import type { PlatformRecord } from "models/platform"
	import type Project from "models/project"
	import type ProjectTag from "models/project-tag"
	import { getCategories, getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"
	import { DoomlitValidator } from "validators/doomlit"

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
	import SpinnerModal from "comps/spinner-modal.svelte"
	import UrgentModal from "comps/urgent-modal.svelte"
	// #endregion

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).doomlits)
	const formDict = $derived(dict.projectForm)
	const fmt = $derived(DateFmtContext.context.value!)

	const validator = $derived(new DoomlitValidator(dict))

	let helpModalTrigger = $state<HTMLButtonElement>()

	const project = $derived(data.project)
	const showcaseDate = $derived(DDate.fromISOString(project.showcaseDate))

	let projectName = $state(untrack(() => project.name))
	let projectDescription = $state(untrack(() => project.description ?? undefined))
	let projectVideoUrl = $state(untrack(() => project.videoUrl ?? undefined))

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

	// #region Image Management
	let coverBlobs = $state<Blob[]>([])
	let coverPreviewUrls = $state<string[]>(untrack(() => (project.coverImagePath ? [project.coverImagePath] : [])))
	let screenshotBlobs = $state<Blob[]>([])
	let screenshotPreviewUrls = $state<string[]>(untrack(() => project.screenshotPaths) ?? [])
	// #endregion

	// #region From Update action to server action
	const publishData = $derived<Partial<Project>>({
		name: projectName,
		category,
		description: projectDescription,
		videoUrl: projectVideoUrl,
		tags: Array.from(selectedTags),
		secondaryPlatforms: Array.from(selectedPlatforms).map((p) => ({ name: p.name, url: p.url })),
		features: Array.from(selectedFeatures),
		coverImagePath: coverPreviewUrls.length > 0 ? coverPreviewUrls[0] : undefined,
		screenshotPaths: screenshotPreviewUrls,
	})
	const isDirty = $derived(validator.checkIsDirty(project, publishData))
	let isPublishing = $state(false)

	async function processImagesToCDN() {
		const urlFetchRes = await fetch(
			`/api/doomlits/${project.referenceId}/upload-urls?screenshotCount=${screenshotBlobs.length}`,
		)
		if (!urlFetchRes.ok) {
			const errorBody = await urlFetchRes.json().catch(() => ({}))
			throw new Error(errorBody.message || "Couldn't get URLs for image uploads from server.")
		}
		const uploadData = (await urlFetchRes.json()) as UploadUrlsData

		let finalCoverUrl = project.coverImagePath
		if (coverBlobs.length > 0) {
			const res = await fetch(uploadData.cover.uploadUrl, {
				method: "PUT",
				body: coverBlobs[0],
				headers: { "Content-Type": "image/webp" },
			})
			if (!res.ok) {
				const errorBody = await res.json().catch(() => ({}))
				throw new Error(errorBody.message || "Couldn't upload cover image to CDN.")
			}
			finalCoverUrl = uploadData.cover.path
		}

		const finalScreenshotUrls: string[] = []
		let newScreenshotIndex = 0
		for (const purl of screenshotPreviewUrls) {
			if (purl.startsWith("blob:")) {
				const blob = screenshotBlobs[newScreenshotIndex]
				const targetUrlData = uploadData.screenshots[newScreenshotIndex]

				const res = await fetch(targetUrlData.uploadUrl, {
					method: "PUT",
					body: blob,
					headers: { "Content-Type": "image/webp" },
				})
				if (!res.ok) {
					const errorBody = await res.json().catch(() => ({}))
					throw new Error(errorBody.message || "Couldn't upload screenshots to CDN.")
				}
				finalScreenshotUrls.push(targetUrlData.path)

				newScreenshotIndex++
			} else {
				finalScreenshotUrls.push(purl)
			}
		}

		return { finalCoverUrl, finalScreenshotUrls }
	}

	const handlePublish: SubmitFunction = async ({ formData, cancel }) => {
		isPublishing = true

		try {
			const { finalCoverUrl, finalScreenshotUrls } = await processImagesToCDN()

			formData.set("tags", JSON.stringify(Array.from(selectedTags)))
			formData.set("features", JSON.stringify(Array.from(selectedFeatures)))

			const mappedPlatforms = Array.from(selectedPlatforms).map((p) => ({ platform: p.name, url: p.url }))
			formData.set("secondaryPlatforms", JSON.stringify(mappedPlatforms))

			formData.delete("coverImagePath")
			if (finalCoverUrl) formData.set("coverImagePath", finalCoverUrl)

			formData.delete("screenshotPaths")
			formData.set("screenshotPaths", JSON.stringify(finalScreenshotUrls))
		} catch (err) {
			isPublishing = false
			cancel()
			console.error("Upload failed", err)
			return
		}

		return handlePublishResult
	}
	// #endregion

	// #region Managing API response
	let serverResponse = $state<string>()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function handlePublishResult({ result, update }: any) {
		isPublishing = false
		serverResponse = result.data?.message || result.error?.message || "An unknown error has occurred."
		update({ reset: false })
	}
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
			method="POST"
			use:enhance={handlePublish}
			class="grid h-full w-full [scrollbar-color:var(--color-accent)_transparent] auto-rows-min grid-cols-2 justify-items-center gap-12 overflow-y-auto">
			<section class="flex w-full items-center gap-4">
				<Icon icon="Starmark" size="small" />
				<p class="font-serif text-2xl font-medium text-inverse">{formDict.refId.label}:</p>
				<CopyableText content={project.referenceId} />
			</section>
			<section class="flex w-full items-center justify-evenly gap-4">
				<ProjectStatusChip status={project.status} />
				<ManageMenu />
				<SlabButton variant="filled" fit="min" alignment="left" isDisabled={isPublishing || !isDirty}>
					<Icon icon="Upload" />
					{formDict.labelCtaUpdate}
				</SlabButton>
			</section>
			<TextInput
				name="project-name"
				inputType="text"
				label={formDict.name.label}
				placeholder={formDict.name.placeholder}
				bind:value={projectName} />
			<Dropdown
				name="project-category"
				label={formDict.category.label}
				placeholder={formDict.category.placeholder}
				options={getCategories().map((c) => ({ label: getCategoryLabelFor(c, locale), value: c }))}
				bind:value={category} />
			<TagDdropdown {category} {selectedTags} maxTagCount={data.rules.maxTagCount} />
			<PlatformDdropdown
				{category}
				{primaryPlatform}
				{selectedPlatforms}
				urlValidator={validator.validatePlatformUrl} />
			<ImgInput
				name="coverImagePath"
				label={formDict.coverImg.label}
				placeholder={formDict.coverImg.placeholder}
				instructions={formDict.coverImg.instructions}
				tooltip={formDict.coverImg.tooltip}
				imageType="cover"
				maxFileSizeMB={data.rules.maxImageFileSizeMB}
				bind:processedBlobs={coverBlobs}
				bind:previewUrls={coverPreviewUrls}
				initialUrls={project.coverImagePath ? [project.coverImagePath] : []} />
			<TextArea
				name="description"
				label={formDict.description.label}
				placeholder={formDict.description.placeholder}
				instructions={formDict.description.instructions}
				bind:value={projectDescription}
				validator={validator.validateDescription} />
			<YoutubeVideoInput
				name="videoUrl"
				label={formDict.video.label}
				placeholder={formDict.video.placeholder}
				instructions={formDict.video.instructions}
				bind:url={projectVideoUrl}
				validator={validator.validateVideoUrl} />
			<ImgInput
				name="screenshotPaths"
				label={formDict.screenshots.label}
				placeholder={formDict.screenshots.placeholder}
				instructions={formDict.screenshots.instructions}
				tooltip={formDict.screenshots.tooltip}
				imageType="screenshot"
				canSelectMultiple={true}
				maxImages={data.rules.maxScreenshotCount}
				maxFileSizeMB={data.rules.maxImageFileSizeMB}
				bind:processedBlobs={screenshotBlobs}
				bind:previewUrls={screenshotPreviewUrls}
				initialUrls={project.screenshotPaths ?? []} />
			<section class="col-[span_2] w-full">
				<FeatureDdropdown {category} {selectedFeatures} />
			</section>
		</form>
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />

{#if isPublishing}
	<SpinnerModal />
{:else if serverResponse}
	<UrgentModal body={serverResponse} header={dict.statusModals.complete.headerSuccess}>
		{#snippet actions()}
			<SlabButton>MISSING_LABEL_CLOSE</SlabButton>
		{/snippet}
	</UrgentModal>
{/if}
