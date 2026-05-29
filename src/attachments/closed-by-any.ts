import type { Attachment } from "svelte/attachments"

type ClosedByAnyArgs = {
	trigger: HTMLElement | null | undefined
}

export default function closedByAny(args: ClosedByAnyArgs): Attachment<HTMLDialogElement> {
	return (node: HTMLDialogElement) => {
		function handleDocumentClick(event: MouseEvent): void {
			if (!node.open) return
			if (node.contains(event.target as Node)) return
			if (args.trigger && args.trigger.contains(event.target as Node)) return

			node.close()
		}

		function handleKeyDown(event: KeyboardEvent): void {
			if (event.key === "Escape" && node.open) node.close()
		}

		document.addEventListener("click", handleDocumentClick, true)
		document.addEventListener("keydown", handleKeyDown, true)

		return () => {
			document.removeEventListener("click", handleDocumentClick, true)
			document.removeEventListener("keydown", handleKeyDown, true)
		}
	}
}
