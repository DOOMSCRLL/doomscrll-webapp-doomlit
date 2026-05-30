<script lang="ts">
	import type { Snippet } from "svelte"

	import closedByAny from "attcs/closed-by-any"
	import positionRelativeTo, { type HorizontalAlignment, type VerticalAlignment } from "attcs/position-relative-to"
	import ttm from "utils/type-literal-to-class"

	type ArrowPosition = "top" | "left" | "right" | "bottom"

	type Props = {
		children: Snippet
		horizontalAlignment: HorizontalAlignment
		verticalAlignment: VerticalAlignment
		arrowPosition?: ArrowPosition
		trigger?: HTMLElement
	}

	const { children, horizontalAlignment, verticalAlignment, arrowPosition, trigger = $bindable() }: Props = $props()
</script>

<dialog
	{@attach closedByAny({ trigger })}
	{@attach positionRelativeTo({ horizontalAlignment, verticalAlignment, anchor: trigger })}
	class={[
		"m-0 h-min max-h-full w-min max-w-64 p-12",
		"rounded-3xl border-3 border-inverse bg-obverse",
		"flex-col items-center justify-center open:box-border open:flex",
		arrowPosition !== undefined &&
			ttm(arrowPosition, {
				bottom: "arrow-decor-bottom",
				left: "arrow-decor-left",
				right: "arrow-decor-right",
				top: "arrow-decor-top",
			}),
	]}
>
	{@render children?.()}
</dialog>
