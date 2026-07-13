<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		feature: string
		onRemove: (feature: string) => void
	}

	const { feature, onRemove }: Props = $props()

	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.featureChip.labelRemove)
</script>

<li class="flex w-min items-center justify-start">
	<div class="rounded-full px-4 py-2" style="background-color: {hslStrToCss(generateColorFrom(feature))}">
		<p class="font-serif text-xl font-bold whitespace-nowrap text-obverse">
			{feature}
		</p>
	</div>
	<SlabButton
		variant="text"
		hasAccent={true}
		fit="square"
		ariaLabel={removeLabel}
		size="normal"
		onClick={() => onRemove(feature)}>
		<Icon icon="Cancel" size="normal" />
	</SlabButton>
</li>
