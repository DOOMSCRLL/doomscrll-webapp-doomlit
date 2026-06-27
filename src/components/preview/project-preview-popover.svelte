<script lang="ts">
	import Popover from "comps/popover.svelte"
	import type { ProjectPreview } from "models/project"

	type Props = {
		preview?: ProjectPreview
		trigger?: HTMLElement
		onMouseEnter?: () => void
		onMouseLeave?: () => void
	}

	let { preview, trigger, onMouseEnter, onMouseLeave }: Props = $props()
</script>

{#if preview && trigger}
	<Popover
		arrowPosition="left"
		horizontalAlignment="right"
		verticalAlignment="center"
		doManageTrigger={false}
		{trigger}>
		<!-- We wrap the contents in a div that catches hover events to keep the popover open -->
		<div class="flex flex-col gap-2" role="tooltip" onmouseenter={onMouseEnter} onmouseleave={onMouseLeave}>
			<p>{preview.authorName}</p>
			<p>{preview.name}</p>
			<p>{preview.category}</p>
			{#each preview.tags as tag (`${preview.name}_${tag}`)}
				<p>{tag}</p>
			{/each}
		</div>
	</Popover>
{/if}
