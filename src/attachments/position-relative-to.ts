import type { Attachment } from "svelte/attachments"

export type VerticalAlignment = "top" | "center" | "bottom"
export type HorizontalAlignment = "left" | "center" | "right"

type PositionRelativeToArgs = {
	verticalAlignment: VerticalAlignment
	horizontalAlignment: HorizontalAlignment
	edgeOffset?: number
	anchor?: HTMLElement
	onPositionChange?: (vAlign: VerticalAlignment, hAlign: HorizontalAlignment) => void
}

const DEFAULT_EDGE_OFFSET = 8

function findScrollParents(element: HTMLElement | null): (HTMLElement | Window)[] {
	const parents: (HTMLElement | Window)[] = [window]
	if (typeof window === "undefined") return parents

	let parent = element?.parentElement
	while (parent) {
		const overflow = window.getComputedStyle(parent)
		if (/(auto|scroll|overlay)/.test(overflow.overflowY) || /(auto|scroll|overlay)/.test(overflow.overflowX)) {
			parents.push(parent)
		}
		parent = parent.parentElement
	}
	return parents
}

export default function positionRelativeTo(args: PositionRelativeToArgs): Attachment<HTMLDialogElement> {
	return (node: HTMLDialogElement) => {
		node.style.position = "fixed"
		node.style.margin = "0"

		let lastVAlign = args.verticalAlignment
		let lastHAlign = args.horizontalAlignment

		function calculateRelativePosition() {
			if (!node.open || !args.anchor) return

			const rectAnchor = args.anchor.getBoundingClientRect()
			const rectNode = node.getBoundingClientRect()
			const offset = args.edgeOffset ?? DEFAULT_EDGE_OFFSET

			const vw = document.documentElement.clientWidth
			const vh = document.documentElement.clientHeight

			let vAlign = args.verticalAlignment
			let hAlign = args.horizontalAlignment
			let top: number
			let left: number

			if (vAlign === "bottom" && rectAnchor.bottom + offset + rectNode.height > vh - offset) {
				const spaceBottom = vh - rectAnchor.bottom
				const spaceTop = rectAnchor.top
				if (spaceTop > spaceBottom) vAlign = "top"
			} else if (vAlign === "top" && rectAnchor.top - offset - rectNode.height < offset) {
				const spaceBottom = vh - rectAnchor.bottom
				const spaceTop = rectAnchor.top
				if (spaceBottom > spaceTop) vAlign = "bottom"
			}

			if (vAlign === "center") {
				if (hAlign === "left" && rectAnchor.left - offset - rectNode.width < offset) {
					const spaceLeft = rectAnchor.left
					const spaceRight = vw - rectAnchor.right
					if (spaceRight > spaceLeft) hAlign = "right"
				} else if (hAlign === "right" && rectAnchor.right + offset + rectNode.width > vw - offset) {
					const spaceLeft = rectAnchor.left
					const spaceRight = vw - rectAnchor.right
					if (spaceLeft > spaceRight) hAlign = "left"
				}
			}

			if (vAlign === "top") top = rectAnchor.top - rectNode.height - offset
			else if (vAlign === "bottom") top = rectAnchor.bottom + offset
			else top = rectAnchor.top + rectAnchor.height / 2 - rectNode.height / 2

			if (hAlign === "left") {
				if (vAlign === "center") left = rectAnchor.left - rectNode.width - offset
				else left = rectAnchor.left
			} else if (hAlign === "right") {
				if (vAlign === "center") left = rectAnchor.right + offset
				else left = rectAnchor.right - rectNode.width
			} else {
				left = rectAnchor.left + rectAnchor.width / 2 - rectNode.width / 2
			}

			left = Math.max(offset, Math.min(left, vw - rectNode.width - offset))
			top = Math.max(offset, Math.min(top, vh - rectNode.height - offset))

			node.style.left = `${left}px`
			node.style.top = `${top}px`

			if (vAlign !== lastVAlign || hAlign !== lastHAlign) {
				lastVAlign = vAlign
				lastHAlign = hAlign
				args.onPositionChange?.(vAlign, hAlign)
			}
		}

		const observer = new MutationObserver((muts) =>
			muts.forEach((mut) => {
				if (mut.attributeName === "open" && node.open) calculateRelativePosition()
			}),
		)

		let scrollParents: (HTMLElement | Window)[] = []

		function setupListeners() {
			if (args.anchor) {
				scrollParents = findScrollParents(args.anchor)
				scrollParents.forEach((p) => p.addEventListener("scroll", calculateRelativePosition, { passive: true }))
			}
			window.addEventListener("resize", calculateRelativePosition, { passive: true })
			observer.observe(node, { attributes: true })
		}

		function cleanupListeners() {
			scrollParents.forEach((p) => p.removeEventListener("scroll", calculateRelativePosition))
			window.removeEventListener("resize", calculateRelativePosition)
			observer.disconnect()
		}

		setupListeners()
		if (node.open) calculateRelativePosition()

		return cleanupListeners
	}
}
