<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"
	import Popover from "./popover.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value).profileMenu.popover)
	const profile = $derived(ProfileContext.context.value)
	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})

	let profileButton = $state<HTMLButtonElement>()
</script>

{#if profile === undefined}
	<SlabAnchor href="/login" alignment="right" fit="min" size="normal" variant="text">
		<Icon icon="ArrowExternal" size="small" />
		{dict.labelAnon}
		<Icon icon="AvatarAnon" />
	</SlabAnchor>
{:else}
	<SlabButton alignment="right" fit="min" size="normal" variant="text" bind:reference={profileButton}>
		{profile.username}
		<Icon icon="AvatarSigned" />
	</SlabButton>
	<Popover
		arrowPosition="top"
		horizontalAlignment="center"
		verticalAlignment="bottom"
		doManageTrigger={true}
		bind:trigger={profileButton}>
		<!-- FIXME: Add and include the profile route for changing profile settings here. -->
		<SlabAnchor href="/profile-settings" alignment="left" fit="max" variant="outlined">
			<Icon icon="Settings" /> {dict.labelSettings}</SlabAnchor>
		<SlabButton fit="max" variant="text" renderDecors={true}>
			<Icon icon="Doomeye" /> {dict.labelProjects}</SlabButton>
		<form method="POST" action="/logout" class="contents">
			<SlabButton buttonType="submit" fit="max" variant="text" hasAccent={true} renderDecors={true}>
				<Icon icon="DoomeyeClosed" />
				{dict.labelLogout}
			</SlabButton>
		</form>
	</Popover>
{/if}
