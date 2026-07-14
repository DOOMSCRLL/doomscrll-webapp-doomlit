import type { Attachment } from "svelte/attachments"

export type TooltipAlignment = "left" | "right"

type PositionTooltipToArgs = {
	edgeOffset?: number
	anchor?: HTMLElement
	alignment?: TooltipAlignment
	onPositionChange?: (alignment: TooltipAlignment) => void
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

export function positionTooltipTo(args: PositionTooltipToArgs): Attachment<HTMLDivElement> {
	return (node: HTMLDivElement) => {
		node.style.position = "fixed"
		node.style.margin = "0"

		let lastAlignment = args.alignment ?? "right"

		function calculateRelativePosition() {
			if (!args.anchor) return

			const rectAnchor = args.anchor.getBoundingClientRect()
			const rectNode = node.getBoundingClientRect()
			const offset = args.edgeOffset ?? DEFAULT_EDGE_OFFSET

			const vw = document.documentElement.clientWidth
			const vh = document.documentElement.clientHeight

			let alignment = args.alignment ?? "right"
			let top = rectAnchor.top + rectAnchor.height / 2 - rectNode.height / 2
			let left: number

			if (alignment === "right" && rectAnchor.right + offset + rectNode.width > vw - offset) {
				const spaceRight = vw - rectAnchor.right
				const spaceLeft = rectAnchor.left
				if (spaceLeft > spaceRight) alignment = "left"
			} else if (alignment === "left" && rectAnchor.left - offset - rectNode.width < offset) {
				const spaceRight = vw - rectAnchor.right
				const spaceLeft = rectAnchor.left
				if (spaceRight > spaceLeft) alignment = "right"
			}

			if (alignment === "right") left = rectAnchor.right + offset
			else left = rectAnchor.left - rectNode.width - offset

			left = Math.max(offset, Math.min(left, vw - rectNode.width - offset))
			top = Math.max(offset, Math.min(top, vh - rectNode.height - offset))

			node.style.left = `${left}px`
			node.style.top = `${top}px`

			if (alignment !== lastAlignment) {
				lastAlignment = alignment
				args.onPositionChange?.(alignment)
			}
		}

		let scrollParents: (HTMLElement | Window)[] = []

		function setupListeners() {
			if (args.anchor) {
				scrollParents = findScrollParents(args.anchor)
				scrollParents.forEach((p) => p.addEventListener("scroll", calculateRelativePosition, { passive: true }))
			}
			window.addEventListener("resize", calculateRelativePosition, { passive: true })
		}

		function cleanupListeners() {
			scrollParents.forEach((p) => p.removeEventListener("scroll", calculateRelativePosition))
			window.removeEventListener("resize", calculateRelativePosition)
		}

		setupListeners()
		requestAnimationFrame(() => calculateRelativePosition())

		return cleanupListeners
	}
}
