<script lang="ts">
	import type { SvelteSet } from "svelte/reactivity"

	import type Category from "models/category"
	import type { PlatformName, PlatformRecord } from "models/platform"
	import { getPlatformName, getPlatformsListFor } from "repos/platform-repo"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDropdown from "./d-dropdown/d-dropdown.svelte"
	import DataChipContainer from "./data-chips/data-chip-container.svelte"
	import PlatformChip from "./data-chips/platform-chip.svelte"
	import TextInput from "./text-input.svelte"

	import type { StatusMessage } from "validators/doomlit"

	type Props = {
		category: Category
		primaryPlatform: PlatformRecord
		selectedPlatforms: SvelteSet<PlatformRecord>
		urlValidator?: (value: string | undefined) => StatusMessage | undefined
	}

	const { category, primaryPlatform, selectedPlatforms, urlValidator }: Props = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).doomlits.projectForm.platforms)

	const platformOpts = $derived<PlatformName[]>(getPlatformsListFor(category))
	const socialPlatformOpts = getPlatformsListFor("Internal_Socials").map((p) => ({
		value: p,
		label: getPlatformName(p),
	}))
	const crowdfundPlatformOpts = getPlatformsListFor("Internal_Crowdfunding").map((p) => ({
		value: p,
		label: getPlatformName(p),
	}))

	let selectName = $state<string>()
	let selectUrl = $state<string>()
	let urlStatus = $state<StatusMessage>()
	const isRecordValid = $derived(!(!selectName || !selectUrl || urlStatus?.type === "error"))

	function handlePlatformRecord() {
		if (!selectName || !selectUrl) return
		selectedPlatforms.add({ name: selectName as PlatformName, url: selectUrl })
	}

	function handlePlatformSelect(platformName: string) {
		selectName = platformName
	}
	function handlePlatformRemove(platform: PlatformRecord) {
		selectedPlatforms.delete(platform)
	}
</script>

<section class="flex w-full flex-col items-start gap-4">
	<DDropdown
		name="project-platform"
		label={dict.label.text}
		placeholder={dict.dropdown.placeholder}
		layout="row"
		emptyQueryLabel={dict.dropdown.labelEmptyQuery}
		onChange={handlePlatformSelect}
		options={[
			{
				label: getCategoryLabelFor(category, locale),
				opts: platformOpts.map((p) => ({ value: p, label: getPlatformName(p) })),
			},
			{ label: dict.dropdown.labelPlatformGroup.social, opts: socialPlatformOpts },
			{ label: dict.dropdown.labelPlatformGroup.crowdfunding, opts: crowdfundPlatformOpts },
		]} />
	<section class="flex w-full items-center gap-4">
		<TextInput
			name="project-platform-url"
			inputType="url"
			label={dict.urlInput.label}
			placeholder={dict.urlInput.placeholder}
			doRenderLabel={false}
			bind:value={selectUrl}
			bind:status={urlStatus}
			validator={urlValidator} />
		<SlabButton
			variant="outlined"
			alignment="left"
			fit="min"
			isDisabled={!isRecordValid}
			onClick={handlePlatformRecord}>
			<Icon icon="Add" />
			{dict.cta}
		</SlabButton>
	</section>
	<DataChipContainer layout="column">
		<PlatformChip platform={primaryPlatform} />
		{#each selectedPlatforms as platform (platform.name)}
			<PlatformChip {platform} onRemove={handlePlatformRemove} />
		{/each}
	</DataChipContainer>
</section>
