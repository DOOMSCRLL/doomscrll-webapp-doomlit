<script lang="ts">
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import { LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import Icon from "./icons/icon.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value))
	const profile = $derived(ProfileContext.context.value)
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
