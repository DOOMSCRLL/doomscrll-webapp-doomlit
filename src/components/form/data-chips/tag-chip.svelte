<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type ProjectTag from "models/project-tag"
	import { getDictionaryOf } from "repos/locale-repo"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		tag: ProjectTag
		onRemove: (tag: ProjectTag) => void
	}

	const { tag, onRemove }: Props = $props()
	const removeLabel = $derived(getDictionaryOf(LocaleContext.context.value!).common.dataChips.tagChip.labelRemove)
</script>

<li class="group flex w-min items-center justify-start">
	<div class="rounded-full px-4 py-2" style="background-color: {hslStrToCss(generateColorFrom(tag))}">
		<p class="font-serif text-xl font-bold whitespace-nowrap text-obverse group-even:italic">
			{tag}
		</p>
	</div>
	<SlabButton
		variant="text"
		hasAccent={true}
		fit="square"
		ariaLabel={removeLabel}
		size="normal"
		onClick={() => onRemove(tag)}>
		<Icon icon="Cancel" size="normal" />
	</SlabButton>
</li>
