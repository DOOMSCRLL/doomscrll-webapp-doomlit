<script lang="ts">
	import type { Snippet } from "svelte"
	import ttm from "utils/type-literal-to-class"

	type ButtonVariant = "filled" | "outlined" | "text"
	type ButtonSize = "normal" | "small"
	type HorizontalAlignment = "left" | "center" | "right"
	type HorizontalFit = "max" | "min" | "square"

	type Props = {
		variant?: ButtonVariant
		hasAccent?: boolean
		size?: ButtonSize
		alignment?: HorizontalAlignment
		fit?: HorizontalFit
		renderDecors?: boolean
		onClick?: () => void
		reference?: HTMLButtonElement
		buttonType?: "submit" | "button"
		isDisabled?: boolean
		children?: Snippet
	}

	let {
		alignment = "center",
		fit = "max",
		size = "normal",
		variant = "filled",
		hasAccent = false,
		renderDecors = false,
		onClick,
		reference = $bindable(),
		buttonType = "button",
		isDisabled = false,
		children,
	}: Props = $props()
</script>

<button
	bind:this={reference}
	onclick={onClick}
	disabled={isDisabled}
	type={buttonType}
	class={[
		"group flex max-w-full min-w-0 items-center justify-center gap-4 rounded-2xl",
		"overflow-hidden font-mono font-bold tracking-wider text-ellipsis whitespace-nowrap uppercase disabled:not-allowed",
		!(size === "small") &&
			ttm(alignment, {
				center: "px-6",
				left: "pr-6 pl-2",
				right: "pr-2 pl-6",
			}),
		ttm(size, {
			normal: "h-12",
			small: "h-min min-h-4 text-sm",
		}),
		ttm(fit, {
			max: "w-full",
			min: "w-min shrink-0",
			square: "aspect-square p-0",
		}),
		/* button appearance: */
		ttm(variant, {
			filled: "bg-inverse not-disabled:hover:bg-inverse/40 not-disabled:active:bg-accent",
			outlined: "pseudo-border bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent",
			text: !hasAccent
				? "bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent"
				: "bg-obverse not-disabled:hover:bg-accent not-disabled:active:bg-inverse",
		}),
		renderDecors && variant === "text" && "before:content-['('] after:content-[')']",
		/* content appearance: */
		ttm(variant, {
			filled: "text-obverse",
			outlined: "text-inverse hover:text-obverse active:text-obverse",
			text: !hasAccent
				? "text-inverse hover:text-obverse active:text-obverse"
				: "text-accent hover:text-obverse active:text-obverse",
		}),
	]}>
	{@render children?.()}
</button>
