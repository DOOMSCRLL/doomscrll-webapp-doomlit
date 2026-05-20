<script lang="ts">
	import type { Snippet } from "svelte"
	import ttm from "utils/type-literal-to-class"

	export type ButtonVariant = "filled" | "outlined" | "text"
	export type ButtonSize = "normal" | "small"
	export type HorizontalAlignment = "left" | "center" | "right"
	export type HorizontalFit = "max" | "min" | "square"

	type Props = {
		variant?: ButtonVariant
		size?: ButtonSize
		alignment?: HorizontalAlignment
		fit?: HorizontalFit
		onClick?: () => void
		children?: Snippet
	}

	const { alignment = "center", fit = "max", size = "normal", variant = "filled", onClick, children }: Props = $props()
</script>

<button
	onclick={onClick}
	class={[
		"group flex items-center justify-center gap-4 rounded-2xl",
		"font-mono font-bold tracking-wider uppercase",
		ttm(alignment, {
			center: "px-6",
			left: "pr-6 pl-2",
			right: "pr-2 pl-6",
		}),
		ttm(size, {
			normal: "h-12 text-2xl",
			small: "h-6 text-lg",
		}),
		ttm(fit, {
			max: "w-full",
			min: "w-min",
			square: "aspect-square p-0",
		}),
		/* button appearance: */
		ttm(variant, {
			filled: "bg-inverse not-disabled:hover:bg-inverse/40 not-disabled:active:bg-accent",
			outlined: "pseudo-border bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent",
			text: "bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent",
		}),
		/* content appearance: */
		ttm(variant, {
			filled: "",
			outlined: "",
			text: "",
		}),
	]}
>
	{@render children?.()}
</button>
