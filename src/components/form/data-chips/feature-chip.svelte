<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	type Props = {
		feature: string
		index: number
		onRemove: (index: number) => void
	}

	const { feature, index, onRemove }: Props = $props()

	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.featureChip.labelRemove)
</script>

<li class="flex items-center gap-4">
	<span class="rounded-full px-4 py-2 text-inverse" style="background-color: {hslStrToCss(generateColorFrom(feature))}">
		{feature}
	</span>
	<SlabButton variant="text" size="small" fit="square" ariaLabel={removeLabel} onClick={() => onRemove(index)}>
		<Icon icon="Remove" size="small" />
	</SlabButton>
</li>
