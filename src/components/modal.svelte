<script lang="ts">
	import closedByAny from "attcs/closed-by-any"
	import type { Snippet } from "svelte"
	import SlabButton from "./buttons/slab-button.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		header: string
		closeLabel: string
		children: Snippet
		trigger?: HTMLElement
	}

	const { header, closeLabel, trigger = $bindable(), children }: Props = $props()

	let ref = $state<HTMLDialogElement>()
	const id = `modal_${Math.random().toString(36).slice(2, 9)}`

	$effect(() => {
		if (!trigger || !ref) return

		trigger.setAttribute("aria-haspopup", "dialog")
		trigger.setAttribute("aria-controls", id)
		trigger.setAttribute("aria-expanded", ref.open ? "true" : "false")

		function openModal() {
			ref?.showModal()
		}

		trigger.addEventListener("click", openModal)
		return () => {
			trigger.removeEventListener("click", openModal)
			trigger.removeAttribute("aria-haspopup")
			trigger.removeAttribute("aria-controls")
			trigger.removeAttribute("aria-expanded")
		}
	})

	function closeModal() {
		ref?.close()
	}
</script>

<dialog
	{@attach closedByAny({ trigger })}
	{id}
	aria-modal="true"
	aria-labelledby="title_{id}"
	class={[
		"m-auto h-min max-h-full min-w-md p-4 open:z-50",
		"rounded-3xl border-3 border-inverse bg-obverse backdrop:bg-[black]/90",
		"flex-col items-start gap-4 open:box-border open:flex",
	]}
	bind:this={ref}>
	<SlabButton alignment="center" fit="min" size="small" variant="text" renderDecors={true} onClick={closeModal}
		>{closeLabel}</SlabButton>
	<h2 id="title_{id}" class="inline-flex gap-2 font-serif text-4xl text-accent italic">
		<Icon icon="Starmark" />
		{header}
	</h2>
	{@render children?.()}
</dialog>
