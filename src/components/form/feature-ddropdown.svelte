<script lang="ts">
	import type { SvelteSet } from "svelte/reactivity"

	import { LocaleContext } from "contexts/shared.svelte"
	import type Category from "models/category"
	import getFeaturesFor from "repos/feature-repo"
	import { getDictionaryOf } from "repos/locale-repo"

	import DDropdown from "./d-dropdown/d-dropdown.svelte"
	import DataChipContainer from "./data-chips/data-chip-container.svelte"
	import FeatureChip from "./data-chips/feature-chip.svelte"

	type Props = {
		category: Category
		selectedFeatures: SvelteSet<string>
		maxFeatCount?: number
	}

	const { category, selectedFeatures /*= $bindable(new SvelteSet())*/, maxFeatCount }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.projectForm.features)
	let isDisabled = $derived(selectedFeatures.size >= (maxFeatCount ?? 1e4))

	const feats = $derived<string[]>(getFeaturesFor(category))
	function handleFeatSelect(value: string) {
		selectedFeatures.add(value)
	}
	function handleFeatRemove(value: string) {
		selectedFeatures.delete(value)
	}
</script>

<section class="flex w-full flex-col items-start gap-4">
	<DDropdown
		name="project-feature"
		label={dict.label.text}
		placeholder={dict.label.placeholder}
		tooltip={dict.tooltip}
		emptyQueryLabel={dict.dropdown.labelEmptyQuery}
		{isDisabled}
		onChange={handleFeatSelect}
		options={[
			{
				label: dict.dropdown.labelFeatGroup,
				opts: feats.map((t) => ({ value: t, label: t })),
			},
		]} />
	<DataChipContainer layout="column">
		{#each selectedFeatures as feature (feature)}
			<FeatureChip {feature} onRemove={handleFeatRemove} />
		{/each}
	</DataChipContainer>
</section>
