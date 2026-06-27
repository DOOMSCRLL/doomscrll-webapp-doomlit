<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import TextInput from "comps/form/text-input.svelte"

	const { form } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).auth)
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main
	class="flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 supports-[height:100dvh]:h-dvh">
	{#if form?.email === undefined}
		<form method="POST" action="?/request" use:enhance>
			<TextInput
				name="email"
				label={dict.email.label}
				placeholder={dict.email.placeholder}
				inputType="email"
				isRequired={true}
				layout="column" />
			<SlabButton fit="max" variant="filled" buttonType="submit">
				{dict.email.cta}
			</SlabButton>
		</form>
	{:else}
		<form method="POST" action="?/verify" use:enhance>
			<input type="hidden" name="email" value={form.email} />
			<TextInput
				name="code"
				label={dict.otp.label}
				placeholder={dict.otp.placeholder}
				inputType="text"
				isRequired={true}
				layout="column" />
			<SlabButton fit="max" variant="filled" buttonType="submit">
				{dict.otp.cta}
			</SlabButton>
		</form>
	{/if}
</main>
