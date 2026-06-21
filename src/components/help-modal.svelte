<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import Modal from "./modal.svelte"

	type Props = {
		trigger?: HTMLElement
	}

	let { trigger = $bindable() }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value).reservation.helpModal)
	const dictCommon = $derived(getDictionaryOf(LocaleContext.context.value).common)
</script>

<Modal bind:trigger header={dict.title} closeLabel={dictCommon.labelCloseMenu}>
	<p class="font-serif text-xl tracking-wide text-inverse">{dict.body}</p>
	<!-- TODO: Write help topics, and add each of them here as a collapsible section. -->
	<hr class="w-full border-inverse" />
	<footer class="pl-4 font-serif tracking-wide text-inverse italic">
		➝ {dict.footerPrefix}
		<a href="mailto:hello@doomscrll.com" class="not-italic underline underline-offset-4">hello@doomscrll.com</a>
	</footer>
</Modal>
