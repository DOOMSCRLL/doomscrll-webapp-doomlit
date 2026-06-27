<script lang="ts">
	import { LocaleContext, ProfileContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import Icon from "./icons/icon.svelte"

	const dict = $derived(getDictionaryOf(LocaleContext.context.value))
	const profile = $derived(ProfileContext.context.value)
	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})
</script>

{#if profile === undefined}
	<SlabAnchor href="/login" alignment="right" fit="min" size="normal" variant="text">
		<Icon icon="ArrowExternal" size="small" />
		{dict.reservation.profile.labelAnon}
		<Icon icon="AvatarAnon" />
	</SlabAnchor>
{:else}
	<SlabButton alignment="right" fit="min" size="normal" variant="text">
		{profile.username}
		<Icon icon="AvatarSigned" />
	</SlabButton>
{/if}
