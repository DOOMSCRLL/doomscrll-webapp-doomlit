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
		doManageTrigger?: boolean
	}

	const {
		children,
		horizontalAlignment,
		verticalAlignment,
		arrowPosition,
		trigger = $bindable(),
		doManageTrigger = true,
	}: Props = $props()

	let ref = $state<HTMLDialogElement>()
	const id = `popover_${Math.random().toString(36).slice(2, 9)}`

	$effect(() => {
		if (!trigger || !ref) return

		const currentTrigger = trigger

		currentTrigger.setAttribute("aria-haspopup", "dialog")
		currentTrigger.setAttribute("aria-controls", id)
		currentTrigger.setAttribute("aria-expanded", ref.open ? "true" : "false")

		function togglePopover() {
			if (!ref) return
			if (ref.open) ref.close()
			else ref.show()
		}

		if (doManageTrigger) currentTrigger.addEventListener("click", togglePopover)

		return () => {
			if (doManageTrigger) currentTrigger.removeEventListener("click", togglePopover)

			currentTrigger.removeAttribute("aria-haspopup")
			currentTrigger.removeAttribute("aria-controls")
			currentTrigger.removeAttribute("aria-expanded")
		}
	})

	function handleClose() {
		if (!trigger) return
		trigger.setAttribute("aria-expanded", "false")
		trigger.focus()
	}
</script>

<dialog
	{@attach closedByAny({ trigger })}
	{@attach positionRelativeTo({ horizontalAlignment, verticalAlignment, anchor: trigger })}
	{id}
	open={doManageTrigger ? undefined : true}
	onclose={handleClose}
	class={[
		"m-0 h-min max-h-full w-min min-w-xs p-4 open:z-50",
		"rounded-3xl border-3 border-inverse bg-obverse",
		"flex-col items-center justify-center gap-4 open:box-border open:flex",
		arrowPosition !== undefined &&
			ttm(arrowPosition, {
				bottom: "arrow-decor-bottom mb-4",
				left: "arrow-decor-left ml-4",
				right: "arrow-decor-right mr-4",
				top: "arrow-decor-top mt-4",
			}),
	]}
	bind:this={ref}>
	{@render children?.()}
</dialog>
