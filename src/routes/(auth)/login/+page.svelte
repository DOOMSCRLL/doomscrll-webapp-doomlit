<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"

	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	const { form } = $props()

	const allDicts = $derived(getDictionaryOf(LocaleContext.context.value!))
	const dict = $derived(allDicts.auth)
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main
	class="flex h-screen w-full flex-col items-center justify-around overflow-hidden px-6 supports-[height:100dvh]:h-dvh">
	<DoomscrllWordmark />

	{#if form?.email === undefined}
		<form method="POST" action="?/request" class="flex flex-col gap-16" use:enhance>
			<TextInput
				name="email"
				label={dict.email.label}
				placeholder={dict.email.placeholder}
				inputType="email"
				isRequired={true}
				layout="column" />
			<section role="group" class="flex justify-center gap-4">
				<SlabAnchor href="/" fit="max" alignment="left" variant="outlined">
					<Icon icon="ArrowBack" />
					{allDicts.common.labelReturnHome}
				</SlabAnchor>
				<SlabButton variant="filled" buttonType="submit">{dict.email.cta}</SlabButton>
			</section>
		</form>
	{:else}
		<form method="POST" action="?/verify" class="flex flex-col gap-16 [&_input]:tracking-widest">
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

	<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
		<li>{dict.email.subtext.accountInfo}</li>
		<li>{dict.email.subtext.newEmail}</li>
	</ol>
</main>
