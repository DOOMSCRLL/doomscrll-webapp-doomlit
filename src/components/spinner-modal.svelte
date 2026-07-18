<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	const label = $derived(getDictionaryOf(LocaleContext.context.value!).common.headerSpinnerModal)

	let modalRef = $state<HTMLDialogElement>()
	$effect(() => {
		if (modalRef) {
			modalRef.addEventListener("cancel", (e) => e.preventDefault())
			modalRef.addEventListener("keydown", (e) => {
				if (e.key === "Escape") e.preventDefault()
			})
			modalRef.showModal()
		}
	})
</script>

<dialog
	id="spinner"
	aria-labelledby="label-spinner"
	aria-busy="true"
	class="m-auto flex max-w-60/100 flex-col items-center justify-center gap-4 border-none [background:none] backdrop:bg-[black]/95"
	bind:this={modalRef}>
	<svg viewBox="0 0 24 24" class="isolate m-4 h-32 w-32 overflow-visible fill-accent" aria-hidden="true">
		<path id="frame" class="origin-center animate-rotate" d="M2 2v20h20V2H3Zm1 1h18v18H3V4.9Z" />
		<path
			id="oo"
			class="mix-blend-difference"
			d="M3.36 4.89 3 4.9q-.55.05-1 .24-.54.23-.95.65-.84.92-1.01 2.52T.44 12Q.98 14.07 2 15.67l.01.02q.47.71.99 1.3.65.7 1.38 1.22 1.33.9 2.8.9l-.07-.2q-.6-.01-1.33-.86-.72-.86-1.43-2.4A24 24 0 0 1 3.1 12l-.1-.35a20 20 0 0 1-.6-3.3 7 7 0 0 1 .14-2.4q.16-.52.46-.72a1 1 0 0 1 .42-.13zm7.44 0q-1.47 0-2.56.9a6 6 0 0 0-1.68 2.52q-.6 1.6-.6 3.69t.6 3.7 1.68 2.5q1.1.91 2.56.91v-.2q-.6-.01-1.11-.86a8 8 0 0 1-.79-2.4A21 21 0 0 1 8.62 12q0-2.13.28-3.65.3-1.54.79-2.4t1.1-.85zm2.41 0v.2q.6.01 1.08.86.5.85.79 2.4.3 1.52.3 3.65 0 2.1-.3 3.65a7 7 0 0 1-.79 2.4q-.48.85-1.08.85v.21q1.44 0 2.53-.9 1.1-.91 1.7-2.52t.6-3.69-.6-3.7a6 6 0 0 0-1.7-2.5q-1.09-.91-2.53-.91m3.63 0 .05.2q.6.01 1.31.86.74.85 1.43 2.4.7 1.52 1.28 3.65l.09.37q.48 1.88.59 3.28a6 6 0 0 1-.14 2.4q-.16.52-.45.72a1 1 0 0 1-.4.13l.05.21.35-.01q.55-.04 1-.24.53-.23.93-.65.85-.91 1.03-2.52.17-1.6-.39-3.69-.54-2.07-1.57-3.66l-.02-.03A10 10 0 0 0 21 7.02q-.65-.72-1.4-1.23-1.32-.9-2.76-.9"
			style="font-variation-settings:&quot;opsz&quot;96,&quot;wdth&quot;87,&quot;wght&quot;888" />
		<path
			id="star"
			class="origin-center animate-rotate-reverse"
			d="m12 10.11-.29 1.2-1.04-.64.64 1.04-1.2.29 1.2.29-.64 1.04 1.04-.63.3 1.19.28-1.2 1.05.64-.64-1.04 1.2-.29-1.2-.29.64-1.04-1.05.63z"
			style="font-variation-settings:&quot;opsz&quot;96,&quot;wdth&quot;87,&quot;wght&quot;888" />
	</svg>
	<p id="label-spinner" class="text-center font-serif text-2xl font-medium whitespace-pre-line text-inverse">
		{label}
	</p>
</dialog>
