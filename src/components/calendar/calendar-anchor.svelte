<script lang="ts">
	import { resolve } from "$app/paths"

	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext } from "contexts/shared.svelte"

	type Props = {
		month: number
		year: number
		direction?: "forward" | "backward"
		href: `/?year=${number}&month=${number}`
	}

	const { month, year, direction = "forward", href }: Props = $props()

	const dateFmt = DateFmtContext.context.value!
</script>

<div class="flex h-min w-min items-center justify-center gap-4">
	<Icon icon="Starmark" />
	<a
		href={resolve(href)}
		class={[
			"group flex items-center justify-center gap-4 overflow-hidden",
			"pseudo-border h-12 w-min max-w-full min-w-0 rounded-2xl bg-obverse px-6",
			"font-mono font-bold tracking-wider text-ellipsis whitespace-nowrap text-inverse uppercase",
			"hover:bg-inverse hover:text-obverse active:bg-accent active:text-obverse",
		]}>
		{#if direction === "backward"}<Icon icon="ArrowBack" size="small" />{/if}
		{dateFmt.getCalendarHeader({ month, year })}
		{#if direction === "forward"}<Icon icon="ArrowForward" size="small" />{/if}
	</a>
</div>
