<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext, ProfileContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import TextInput from "comps/form/text-input.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	const profile = $derived(ProfileContext.context.value!)
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).profileMenu.settings)
</script>

<main class="flex h-full w-full flex-col items-center justify-between px-12 py-4">
	<DoomscrllWordmark />

	<!-- FIXME: `input` elements have weird widths, take a look at why. -->
	<form method="POST" class="flex w-full flex-col items-center gap-8" use:enhance>
		<TextInput
			name="username"
			label={dict.username.label}
			placeholder={dict.username.placeholder}
			layout="column"
			isRequired={profile.username === undefined} />
		<TextInput
			name="description"
			label={dict.description.label}
			placeholder={dict.description.placeholder}
			layout="column" />
		<TextInput name="url" label={dict.url.label} placeholder={dict.url.placeholder} layout="column" />

		<SlabButton alignment="left" fit="max" variant="filled" buttonType="submit">
			<Icon icon="Settings" />
			{dict.labelCta}
		</SlabButton>
	</form>

	<ol role="list" class="super-markers font-serif text-xl font-medium tracking-tight break-normal">
		<li>{dict.subtext.infoUsername}</li>
		<li>{dict.subtext.infoValidUpdates}</li>
	</ol>
</main>
