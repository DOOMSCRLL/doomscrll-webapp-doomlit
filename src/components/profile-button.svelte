<script lang="ts">
	import LocaleContext from "contexts/locale-context"
	import type Profile from "models/profile"
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "./icons/icon.svelte"

	type Props = {
		profile?: Profile
	}

	const { profile }: Props = $props()

	const dict = getDictionaryOf(LocaleContext.getContext())

	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})
</script>

{#if profile === undefined}
	<SlabButton alignment="right" fit="min" size="normal" variant="text">
		{dict.reservation.profile.labelAnon}
		<Icon icon="ArrowExternal" size="small" />
		<Icon icon="AvatarAnon" />
	</SlabButton>
{:else}
	<SlabButton alignment="right" fit="min" size="normal" variant="text">
		{profile.username}
		<Icon icon="AvatarSigned" />
	</SlabButton>
{/if}
