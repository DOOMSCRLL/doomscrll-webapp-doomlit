<script lang="ts">
	import { enhance } from "$app/forms"

	import { LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"
	import Popover from "./popover.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value))
	const profile = $derived(ProfileContext.context.value)
	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})

	let profileButton = $state<HTMLButtonElement>()
</script>

{#if profile === undefined}
	<SlabAnchor href="/login" alignment="right" fit="min" size="normal" variant="text">
		<Icon icon="ArrowExternal" size="small" />
		{dict.reservation.profile.labelAnon}
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
		<SlabAnchor href="/" alignment="left" fit="max" variant="outlined">
			<Icon icon="ArrowExternal" /> MISSING_LABEL_PROFILE</SlabAnchor>
		<SlabButton fit="max" variant="text" renderDecors={true}>
			<Icon icon="Doomeye" /> MISSING_LABEL_DOOMLITS</SlabButton>
		<form method="POST" action="/logout" class="contents" use:enhance>
			<SlabButton buttonType="submit" fit="max" variant="text" hasAccent={true} renderDecors={true}>
				<Icon icon="DoomeyeClosed" />
				MISSING_LABEL_LOGOUT
			</SlabButton>
		</form>
	</Popover>
{/if}
