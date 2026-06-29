<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import Icon from "./icons/icon.svelte"
	import Modal from "./modal.svelte"

	type Props = {
		trigger?: HTMLElement
	}

	let { trigger = $bindable() }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value).helpMenu)
	const dictCommon = $derived(getDictionaryOf(LocaleContext.context.value).common)
</script>

<Modal header={dict.title} closeLabel={dictCommon.labelCloseMenu} width="max" bind:trigger>
	<p class="font-serif text-2xl text-inverse">{dict.body}</p>
	<hr class="w-full border-inverse" />
	<section class="flex h-full w-full pretty-scrollbar flex-col gap-6 overflow-auto">
		{#each dict.topics as topic (topic.label)}
			<details
				name="help-topic"
				class={["group flex-col gap-4 open:flex", "rounded-lg border-accent open:border open:p-2 hover:bg-inverse/40"]}>
				<summary class="border-inverse font-serif text-xl text-inverse group-open:border-b group-open:italic">
					{topic.label}
				</summary>
				<p class="font-serif text-xl tracking-tight text-inverse">{topic.body}</p>
			</details>
		{/each}
	</section>
	<hr class="w-full border-inverse" />
	<footer class="flex w-full items-center gap-4 px-4 text-inverse">
		<p class="font-serif tracking-wide text-inverse italic">
			➝ {dict.footer.contentContactPrefix}
			<a href="mailto:hello@doomscrll.com" class="not-italic underline underline-offset-4">hello@doomscrll.com</a>
		</p>
		<Icon icon="Starmark" />
		<p class="font-serif tracking-wide text-inverse italic">
			➝ {dict.footer.contentLegalPrefix}
			<a href="https://doomscrll.com/legal.txt" class="not-italic underline underline-offset-4"
				>doomscrll.com/legal.txt</a>
		</p>
	</footer>
</Modal>
