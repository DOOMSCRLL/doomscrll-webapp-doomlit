<script lang="ts">
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import BrandNav from "comps/brand-nav.svelte"
	import CopyableText from "comps/copyable-text.svelte"
	import ImgInput from "comps/form/img-input.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import HelpModal from "comps/help-modal.svelte"

	const { data } = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).doomlits)
	const fmt = $derived(DateFmtContext.context.value!)

	let helpModalTrigger = $state<HTMLButtonElement>()

	const project = $derived(data.project)
	const showcaseDate = $derived(DDate.fromISOString(project.showcaseDate))

	// #region Category and Tag Management
	// FIXME: Category and Tag dropdowns need to be implemented properly.
	/*let category = $state<Category>(untrack(() => project.category))
  let tags = $state<SvelteSet<ProjectTag>>(untrack(() => new SvelteSet(project.tags ?? [])))

  let selectedCategory = $state(untrack(() => project.category))
  let selectedTag = $state<ProjectTag>()

  $effect(() => {
    if (selectedCategory !== category) {
      category = selectedCategory
      tags = new SvelteSet()
    }
  })
  $effect(() => {
    if (selectedTag && !tags.has(selectedTag)) tags.add(selectedTag)
  })*/
	// #endregion
</script>

<svelte:head>
	<title>{data.project.name} • {fmt.getFullDate(showcaseDate)}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="flex h-screen flex-col overflow-hidden px-2 pb-2 supports-[height:100dvh]:h-dvh">
	<BrandNav comps={{ date: showcaseDate, returnHref: "/" }} bind:helpModalTrigger />
	<section
		class={[
			"h-full w-full overflow-y-auto p-4",
			"[scrollbar-color:var(--color-accent)_transparent] rounded-3xl border-4 border-inverse",
			"flex flex-col items-start justify-start",
		]}>
		<section class="flex gap-4">
			<p>MISSING_LABEL_COPYABLE_REF_ID</p>
			<CopyableText content={project.referenceId} />
		</section>
		<form action="" class="grid h-full w-full auto-rows-min grid-cols-2 justify-items-center gap-4">
			<TextInput
				name="project-name"
				label="MISSING_LABEL_PROJECT_NAME"
				inputType="text"
				isRequired={true}
				placeholder="MISSING_PLACEHOLDER_PROJECT_NAME"
				value={project.name} />
			<!-- FIXME: Enable after implementing category and tag management.
      <Dropdown
				name="project-category"
				label="MISSING_LABEL_CATEGORY"
				placeholder="MISSING_PLACEHOLDER_CATEGORY"
				options={getCategories().map((c) => ({ label: getCategoryLabelFor(c, locale), value: c }))}
				bind:value={category}
				isRequired={true} />
			<section class="flex w-full flex-col items-start gap-4">
				<DDropdown
					name="project-tags"
					emptyQueryLabel="MISSING_LABEL_TAGS_NO_QUERY"
					placeholder="MISSING_PLACEHOLDER_TAGS"
					options={[
						{ label: "MISSING_LABEL_TAGS", opts: getTagsFor(category).map((t) => ({ label: t, value: t })) },
					]} />
				<section class="flex flex-wrap gap-4 wrap-normal"></section>
			</section>
      -->
			<div class="h-full w-full bg-[darkorange] text-[red]">DELETE ME!</div>
			<ImgInput
				name="project-cover"
				label="MISSING_LABEL_IMG_COVER"
				placeholder="MISSING_PLACEHOLDER_IMG_COVER"
				imageType="cover" />
		</form>
	</section>
</main>

<HelpModal bind:trigger={helpModalTrigger} />
