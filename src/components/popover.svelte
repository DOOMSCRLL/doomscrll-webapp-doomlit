<script lang="ts">
	import { untrack, type Snippet } from "svelte"

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
		onClose?: () => void
	}

	const {
		children,
		horizontalAlignment,
		verticalAlignment,
		arrowPosition,
		trigger = $bindable(),
		doManageTrigger = true,
		onClose,
	}: Props = $props()

	let ref = $state<HTMLDialogElement>()
	const id = `popover_${Math.random().toString(36).slice(2, 9)}`

	let renderedVAlign = $state<VerticalAlignment>(untrack(() => verticalAlignment))
	let renderedHAlign = $state<HorizontalAlignment>(untrack(() => horizontalAlignment))

	let activeArrow = $derived.by<ArrowPosition | undefined>(() => {
		if (arrowPosition === undefined) return undefined
		if (renderedVAlign === "top") return "bottom"
		if (renderedVAlign === "bottom") return "top"
		if (renderedHAlign === "left") return "right"
		if (renderedHAlign === "right") return "left"
		return arrowPosition
	})

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
		onClose?.()
	}

	function handlePositionChange(vAlign: VerticalAlignment, hAlign: HorizontalAlignment) {
		renderedVAlign = vAlign
		renderedHAlign = hAlign
	}
</script>

<dialog
	{@attach closedByAny({ trigger })}
	{@attach positionRelativeTo({
		horizontalAlignment,
		verticalAlignment,
		anchor: trigger,
		onPositionChange: handlePositionChange,
	})}
	{id}
	open={doManageTrigger ? undefined : true}
	onclose={handleClose}
	class={[
		"m-0 max-h-full w-min min-w-xs p-4 open:z-50",
		"rounded-3xl border-3 border-inverse bg-obverse",
		"flex-col items-center justify-center gap-4 open:box-border open:flex",
		activeArrow !== undefined &&
			ttm(activeArrow, {
				bottom: "arrow-decor-bottom mb-4",
				left: "arrow-decor-left ml-4",
				right: "arrow-decor-right mr-4",
				top: "arrow-decor-top mt-4",
			}),
	]}
	bind:this={ref}>
	{@render children?.()}
</dialog>
