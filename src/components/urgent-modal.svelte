<script lang="ts">
	import type { Snippet } from "svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		header: string
		body: string
		actions: Snippet
	}

	const { header, body, actions }: Props = $props()

	let ref = $state<HTMLDialogElement>()
	const id = `modal_${Math.random().toString(36).slice(2, 9)}`

	$effect(() => ref?.showModal())

	function handleCancel(event: Event): void {
		event.preventDefault()
	}
</script>

<dialog
	{id}
	aria-modal="true"
	aria-labelledby="title_{id}"
	class={[
		"m-auto h-min min-w-md p-8 open:z-50 open:box-border",
		"rounded-3xl border-3 border-inverse bg-obverse backdrop:bg-[black]/90",
		"flex-col items-start gap-8 open:flex",
	]}
	oncancel={handleCancel}
	bind:this={ref}>
	<h2 id="title_{id}" class="inline-flex gap-2 font-serif text-4xl text-accent italic">
		<Icon icon="Starmark" />
		{header}
	</h2>
	<p class="font-serif text-2xl tracking-tight whitespace-pre-line text-inverse">{body}</p>
	<section class="flex w-full flex-col gap-4">{@render actions()}</section>
</dialog>
