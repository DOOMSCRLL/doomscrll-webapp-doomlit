<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		layout?: "column" | "row-wrap"
		children?: Snippet
	}

	const { layout = "column", children }: Props = $props()
</script>

<ul class="flex h-min w-full gap-4 {layout === 'column' ? 'flex-col items-start' : 'flex-wrap justify-start'}">
	{@render children?.()}
</ul>
