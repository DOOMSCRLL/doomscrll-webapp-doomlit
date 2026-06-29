<script lang="ts">
	import { page } from "$app/state"
	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).errorPage)
</script>

<main
	class={[
		"h-screen w-full px-6 supports-[height:100dvh]:h-dvh",
		"flex flex-col items-center justify-center gap-12 overflow-hidden",
	]}>
	<h1 class="font-serif text-6xl font-bold text-inverse italic">{dict.header}</h1>
	<p class="font-mono text-2xl font-bold">{page.status}: {page.error?.message}</p>
	<SlabAnchor href="/" variant="filled"><Icon icon="ArrowBack" />{dict.labelReturn}</SlabAnchor>
</main>
