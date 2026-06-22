<script lang="ts">
	import type Profile from "models/profile"
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		profile?: Profile
	}

	const { profile }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value))
	// FIXME: Manage profile detection inside the button itself. Should decide where to put the profile menu.
	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})
</script>

{#if profile === undefined}
	<SlabButton alignment="right" fit="min" size="normal" variant="text">
		<Icon icon="ArrowExternal" size="small" />
		{dict.reservation.profile.labelAnon}
		<Icon icon="AvatarAnon" />
	</SlabButton>
{:else}
	<SlabButton alignment="right" fit="min" size="normal" variant="text">
		{profile.username}
		<Icon icon="AvatarSigned" />
	</SlabButton>
{/if}
