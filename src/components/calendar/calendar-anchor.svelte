<script lang="ts">
	import type { DDateParts } from "utils/d-date"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext } from "contexts/shared.svelte"

	type Props = {
		month: number
		year: number
		onClick: ({ year, month }: Omit<DDateParts, "day">) => void
	}

	const { month, year, onClick }: Props = $props()

	const dateFmt = DateFmtContext.context.value!
</script>

<div class="flex h-min w-min items-center justify-center gap-4">
	<Icon icon="Starmark" />
	<SlabButton alignment="right" fit="min" size="normal" variant="text" onClick={() => onClick({ year, month })}>
		{dateFmt.getCalendarHeader({ month, year })}
		<Icon icon="ArrowForward" size="small" />
	</SlabButton>
</div>
