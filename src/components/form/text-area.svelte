<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import { DoomlitValidator } from "validators/doomlit"

	type Props = {
		name: string
		label: string
		placeholder: string
		instructions?: string
		value?: string
	}

	let { name, label, placeholder, instructions, value = $bindable() }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.projectForm.description)
	let errorMessage = $state<string>()
	$effect(() => {
		const descValidation = DoomlitValidator.validateDescription(value)
		if (descValidation?.type === "error") {
			errorMessage = dict.errorMessages.descTooLong
		}
	})
</script>

<section class="flex h-min w-full flex-col items-start gap-4">
	<label class="flex h-full w-full flex-col gap-4 font-serif text-2xl tracking-tight text-inverse">
		<span class="flex gap-2">
			<Icon icon="Starmark" size="small" />
			{label}{#if instructions}<BadgeText text={instructions} />{/if}:
		</span>
		<textarea
			{name}
			{placeholder}
			cols={1}
			rows={2}
			class={[
				"w-full grow border-b-3 border-inverse bg-obverse",
				"cursor-text font-serif text-2xl font-medium tracking-tighter text-inverse",
				"placeholder:text-[darkgray] placeholder:italic",
			]}
			bind:value></textarea>
	</label>

	{#if errorMessage}
		<p class="ml-4 flex items-center gap-2 font-serif text-xl font-medium tracking-tight text-accent">
			<Icon icon="Cancel" />
			{errorMessage}
		</p>
	{/if}
</section>
