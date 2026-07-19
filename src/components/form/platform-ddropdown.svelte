<script lang="ts">
	import { untrack } from "svelte"
	import { SvelteSet } from "svelte/reactivity"

	import type Category from "models/category"
	import type { PlatformName, PlatformRecord } from "models/platform"
	import { getPlatformName, getPlatformsListFor } from "repos/platform-repo"
	import { DoomlitValidator } from "validators/doomlit"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategoryLabelFor } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDropdown from "./d-dropdown/d-dropdown.svelte"
	import DataChipContainer from "./data-chips/data-chip-container.svelte"
	import PlatformChip from "./data-chips/platform-chip.svelte"
	import TextInput from "./text-input.svelte"

	type Props = {
		category: Category
		primaryPlatform: PlatformRecord
		selectedPlatforms: SvelteSet<PlatformRecord>
	}

	const { category, primaryPlatform, selectedPlatforms }: Props = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).doomlits.projectForm.platforms)

	const selectedPlatformNames = new SvelteSet<PlatformName>(
		untrack(() => Array.from(selectedPlatforms, (p) => p.platform)),
	)

	const platformList = $derived(getPlatformsListFor(category))
	const platformOpts = $derived.by<PlatformName[]>(() => {
		if (selectedPlatforms.size <= 0) return platformList
		else return platformList.filter((p) => !selectedPlatformNames.has(p) && p !== primaryPlatform.platform)
	})
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
	let errorMessage = $state<string>()
	const isRecordValid = $derived(!(!selectName || !selectUrl || errorMessage))

	function handlePlatformRecord() {
		if (!selectName || !selectUrl) return
		const urlValidation = DoomlitValidator.validatePlatformUrl(selectUrl)
		if (urlValidation?.type === "error") {
			errorMessage = "MISSING_MSG_PLATFORM_URL_INVALID"
		} else {
			selectedPlatforms.add({ platform: selectName as PlatformName, url: selectUrl })
			selectedPlatformNames.add(selectName as PlatformName)
		}
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
			{errorMessage}
			doRenderLabel={false}
			bind:value={selectUrl} />
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
		{#each selectedPlatforms as platform (platform.platform)}
			<PlatformChip {platform} onRemove={handlePlatformRemove} />
		{/each}
	</DataChipContainer>
</section>
