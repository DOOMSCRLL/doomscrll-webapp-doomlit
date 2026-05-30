import type { Attachment } from "svelte/attachments"

export type VerticalAlignment = "top" | "center" | "bottom"
export type HorizontalAlignment = "left" | "center" | "right"

type PositionRelativeToArgs = {
	verticalAlignment: VerticalAlignment
	horizontalAlignment: HorizontalAlignment
	edgeOffset?: number
	anchor?: HTMLElement
}

const DEFAULT_EDGE_OFFSET = 8

/**
 * When using this attachment, don't forget to:
 * - set `dialog`s `right` and `bottom` attributes to `auto`
 * - set `dialog`s `margin` to `0`
 * - place the `dialog` in the `body`
 */
export default function positionRelativeTo(args: PositionRelativeToArgs): Attachment<HTMLDialogElement> {
	return (node: HTMLDialogElement) => {
		function calculateRelativePosition() {
			if (!node.open || !args.anchor) return

			const rectAnchor = args.anchor.getBoundingClientRect()
			const rectNode = node.getBoundingClientRect()

			let top: number
			let left: number

			if (args.verticalAlignment === "top") top = rectAnchor.top - rectNode.height
			else if (args.verticalAlignment === "bottom") top = rectAnchor.bottom
			else top = rectAnchor.top + rectAnchor.height / 2 - rectNode.height / 2

			if (args.horizontalAlignment === "left") {
				if (args.verticalAlignment === "center") left = rectAnchor.left - rectNode.width
				else left = rectAnchor.left
			} else if (args.horizontalAlignment === "right") {
				if (args.verticalAlignment === "center") left = rectAnchor.right
				else left = rectAnchor.right - rectNode.width
			} else {
				left = rectAnchor.left + rectAnchor.width / 2 - rectNode.width / 2
			}

			const offset = args.edgeOffset ?? DEFAULT_EDGE_OFFSET
			const vw = document.documentElement.clientWidth
			const vh = document.documentElement.clientHeight

			left = Math.max(offset, Math.min(left, vw - rectNode.width - offset))
			top = Math.max(offset, Math.min(top, vh - rectNode.height - offset))

			node.style.left = `${left + window.scrollX}px`
			node.style.top = `${top + window.scrollY}px`
		}

		const observer = new MutationObserver((muts) =>
			muts.forEach((mut) => {
				if (mut.attributeName === "open" && node.open) requestAnimationFrame(() => calculateRelativePosition())
			}),
		)

		observer.observe(node, { attributes: true })
		window.addEventListener("resize", calculateRelativePosition)

		return () => {
			observer.disconnect()
			window.removeEventListener("resize", calculateRelativePosition)
		}
	}
}
