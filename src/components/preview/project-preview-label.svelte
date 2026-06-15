<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		projectName: string
		projectId: string
		onHover?: (id: string) => void
	}

	const { projectName, projectId, onHover }: Props = $props()

	let isHovering = $state(false)

	function handleMouseEnter(): void {
		isHovering = true
		onHover?.(projectId)
	}
	function handleMouseLeave(): void {
		isHovering = false
	}
</script>

<li
	class={["list-none font-serif text-3xl tracking-tight text-inverse", "hover:text-(--c) hover:underline"]}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}>
	{#if isHovering}<Icon icon="Starmark" size="small" />{/if}
	{projectName}
</li>
