<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type { CreatorProjectEntry } from "models/project"
	import { getDictionaryOf } from "repos/locale-repo"
	import ProjectReferenceAnchor from "./buttons/project-reference-anchor.svelte"
	import Modal from "./modal.svelte"

	type Props = {
		projectEntries?: CreatorProjectEntry[]
		trigger?: HTMLElement
	}

	let { projectEntries, trigger = $bindable() }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).reservation.doomlitMenu)
</script>

<Modal header={dict.title} closeLabel={dict.labelClose} width="min" bind:trigger>
	{#if projectEntries}
		<p class="font-serif text-xl font-medium tracking-tight text-inverse">{dict.copy}</p>
		<ul class="flex w-full list-none flex-col gap-4">
			{#each projectEntries as p (p.referenceId)}
				<ProjectReferenceAnchor entry={p} />
			{/each}
		</ul>
	{:else}
		<p class="font-serif text-xl font-medium tracking-tight text-inverse">{dict.noProjectsCopy}</p>
	{/if}
</Modal>
