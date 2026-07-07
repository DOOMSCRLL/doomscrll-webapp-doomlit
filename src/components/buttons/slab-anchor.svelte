<script lang="ts">
	import type { Snippet } from "svelte"

	import { resolve } from "$app/paths"

	import ttm from "utils/type-literal-to-class"

	type ButtonVariant = "filled" | "outlined" | "text"
	type ButtonSize = "normal" | "small"
	type HorizontalAlignment = "left" | "center" | "right"
	type HorizontalFit = "max" | "min" | "square"

	type Props = {
		href:
			| "/"
			| `/?year=${number}&month=${number}`
			| `/preview/${string}`
			| "/login"
			| "/profile-settings"
			| `/reserve/${string}`
			| `/doomlits/${string}`
		/*href: ReturnType<AppTypes["Pathname"]> */
		variant?: ButtonVariant
		size?: ButtonSize
		alignment?: HorizontalAlignment
		fit?: HorizontalFit
		hasUnderline?: boolean
		ariaLabel?: string
		children?: Snippet
	}

	const {
		href,
		alignment = "center",
		fit = "min",
		size = "normal",
		variant = "text",
		hasUnderline = false,
		ariaLabel,
		children,
	}: Props = $props()
</script>

<a
	href={resolve(href)}
	aria-label={ariaLabel}
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
			small: "h-4 text-sm",
		}),
		ttm(fit, {
			max: "w-full",
			min: "w-min",
			square: "aspect-square p-0",
		}),
		ttm(variant, {
			filled: "bg-inverse not-disabled:hover:bg-inverse/40 not-disabled:active:bg-accent",
			outlined: "pseudo-border bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent",
			text: "bg-obverse not-disabled:hover:bg-inverse not-disabled:active:bg-accent",
		}),
		ttm(variant, {
			filled: "text-obverse",
			outlined: "text-inverse hover:text-obverse active:text-obverse",
			text: "text-inverse hover:text-obverse active:text-obverse",
		}),
		hasUnderline && variant === "text" && "underline underline-offset-4",
	]}>{@render children?.()}</a>
