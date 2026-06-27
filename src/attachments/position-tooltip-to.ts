import type { Attachment } from "svelte/attachments"

type PositionTooltipToArgs = {
	edgeOffset?: number
	anchor?: HTMLElement
}

const DEFAULT_EDGE_OFFSET = 8

/**
 * When using this attachment, ensure that the element has
 * `position: absolute` set.
 */
export function positionTooltipTo(args: PositionTooltipToArgs): Attachment<HTMLDivElement> {
	return (node: HTMLDivElement) => {
		function calculateRelativePosition() {
			if (!args.anchor) return

			const rectAnchor = args.anchor.getBoundingClientRect()
			const rectNode = node.getBoundingClientRect()

			let top = rectAnchor.top + rectAnchor.height / 2 - rectNode.height / 2
			let left = rectAnchor.right

			const offset = args.edgeOffset ?? DEFAULT_EDGE_OFFSET
			const vw = document.documentElement.clientWidth
			const vh = document.documentElement.clientHeight

			left = Math.max(offset, Math.min(left, vw - rectNode.width - offset))
			top = Math.max(offset, Math.min(top, vh - rectNode.height - offset))

			node.style.left = `${left + window.scrollX}px`
			node.style.top = `${top + window.scrollY}px`
		}

		requestAnimationFrame(() => calculateRelativePosition())
		window.addEventListener("resize", calculateRelativePosition)
		return () => window.removeEventListener("resize", calculateRelativePosition)
	}
}
