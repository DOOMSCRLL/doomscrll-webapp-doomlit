<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import { getDictionaryOf } from "repos/locale-repo"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		tag: ProjectTag
		index: number
		onRemove: (index: number) => void
	}

	const { tag, index, onRemove }: Props = $props()
	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.tagChip.labelRemove)
</script>

<li class="flex w-full items-center justify-start gap-4">
	<!--<Icon icon="Starmark" size="small" /> -->
	<p
		class="font-serif text-2xl font-bold tracking-wide even:italic"
		style="color: {hslStrToCss(generateColorFrom(tag))}">
		{tag}
	</p>
	<SlabButton variant="text" fit="square" ariaLabel={removeLabel} size="small" onClick={() => onRemove(index)}>
		<Icon icon="Remove" />
	</SlabButton>
</li>
