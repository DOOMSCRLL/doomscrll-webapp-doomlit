<script lang="ts">
	import type { CreatorProjectEntry } from "models/project"

	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext } from "contexts/shared.svelte"
	import DDate from "utils/d-date"
	import SlabAnchor from "./slab-anchor.svelte"

	type Props = {
		entry: CreatorProjectEntry
	}

	const { entry }: Props = $props()

	let fmt = DateFmtContext.context.value!
</script>

<li class="flex items-center gap-2 [&>span:first-child_svg]:fill-inverse">
	<Icon icon="Starmark" />
	<SlabAnchor href="/doomlits/{entry.referenceId}" variant="outlined" size="normal" alignment="right" fit="min">
		<span class="font-serif text-2xl font-medium tracking-tight normal-case">{entry.name}</span>
		•
		{fmt.getFullDate(DDate.fromISOString(entry.showcaseDate))}
		<Icon icon="ArrowForward" />
	</SlabAnchor>
</li>
