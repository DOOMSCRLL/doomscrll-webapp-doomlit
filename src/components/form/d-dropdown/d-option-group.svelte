<script lang="ts">
	import type { Snippet } from "svelte"

	type Props = {
		label?: string
		children: Snippet
	}

	const { label, children }: Props = $props()

	const groupId = `optgroup-${Math.random().toString(36).slice(2, 9)}`
</script>

{#if !label || label.trim().length <= 0}
	{@render children()}
{:else}
	<li role="presentation">
		<ul role="group" aria-labelledby={groupId} class="flex w-full flex-col gap-2">
			<li id={groupId} role="presentation" aria-hidden="true">
				{label}
			</li>
			{@render children()}
		</ul>
	</li>
{/if}
