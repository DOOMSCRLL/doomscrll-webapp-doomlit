<script lang="ts">
	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext } from "contexts/shared.svelte"

	type Props = {
		month: number
		year: number
		direction?: "forward" | "backward"
		href: string
	}

	const { month, year, direction = "forward", href }: Props = $props()

	const dateFmt = DateFmtContext.context.value!
</script>

<div class="flex h-min w-min items-center justify-center gap-4">
	<Icon icon="Starmark" />
	<a
		{href}
		class="group flex h-10 w-min max-w-full min-w-0 items-center justify-center gap-4 overflow-hidden rounded-xl px-6 font-mono font-bold uppercase tracking-wider text-ellipsis whitespace-nowrap pseudo-border bg-obverse text-inverse hover:bg-inverse hover:text-obverse active:bg-accent active:text-obverse">
		{#if direction === "backward"}<Icon icon="ArrowBack" size="small" />{/if}
		{dateFmt.getCalendarHeader({ month, year })}
		{#if direction === "forward"}<Icon icon="ArrowForward" size="small" />{/if}
	</a>
</div>
