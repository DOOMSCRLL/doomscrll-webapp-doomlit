<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		src: string
		alt: string
		actionLabel: string
		aspectRatio?: "1:1" | "9:16"
		onClick?: () => void
	}

	const { src, alt, actionLabel, aspectRatio = "9:16", onClick }: Props = $props()

	const width = 96
	const height = $derived(aspectRatio === "1:1" ? width : (16 * width) / 9)
</script>

<button
	class="relative overflow-hidden rounded-lg border-2 border-inverse"
	style="width: {width}px; height: {height}px;"
	onclick={onClick}>
	<span class="sr-only">{actionLabel}</span>
	<span
		role="presentation"
		aria-hidden="true"
		class="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-[black]/60">
		<Icon icon="Doomeye" />
	</span>
	<img {src} {alt} class="absolute inset-0 h-full w-full object-cover" />
</button>
