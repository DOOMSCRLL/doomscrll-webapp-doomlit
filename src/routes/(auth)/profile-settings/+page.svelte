<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext, ProfileContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	let { form } = $props()

	const profile = $derived(ProfileContext.context.value!)
	const allDicts = $derived(getDictionaryOf(LocaleContext.context.value!))
	const dict = $derived(allDicts.profileMenu.settings)
</script>

<main class="flex h-full w-full flex-col items-center justify-between px-12 py-4">
	<DoomscrllWordmark />

	<form method="POST" class="flex w-full flex-col items-center gap-12 px-16" use:enhance>
		<section role="group" class="flex w-full flex-col gap-4">
			<TextInput
				name="username"
				label={dict.username.label}
				placeholder={dict.username.placeholder}
				isRequired={profile.username === undefined}
				value={profile.username} />
			<TextInput
				name="description"
				label={dict.description.label}
				placeholder={dict.description.placeholder}
				value={profile.description} />
			<TextInput name="url" label={dict.url.label} placeholder={dict.url.placeholder} value={profile.url} />
		</section>

		<section role="group" class="flex w-full justify-center gap-4">
			<SlabAnchor href="/" alignment="left" variant="outlined">
				<Icon icon="ArrowBack" />
				{allDicts.common.labelReturnHome}
			</SlabAnchor>
			<SlabButton alignment="left" fit="min" variant="filled" buttonType="submit">
				<Icon icon="Settings" />
				{dict.labelCta}
			</SlabButton>
		</section>

		{#if form?.message}
			<p class="font-serif text-xl font-medium tracking-wide text-inverse">{form.message}</p>
		{/if}
	</form>

	<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
		<li>{dict.subtext.infoUsername}</li>
		<li>{dict.subtext.infoValidUpdates}</li>
	</ol>
</main>
