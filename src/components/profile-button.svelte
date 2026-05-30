<script lang="ts">
	import LocaleContext from "contexts/locale-context"
	import type Profile from "models/profile"
	import { getDictionaryOf } from "repos/locales"
	import { applySwatchToTokens, generateAvatarSwatchFrom } from "utils/uuid-to-avatar"
	import Icon from "./icons/icon.svelte"

	type Props = {
		profile?: Profile
	}

	const { profile }: Props = $props()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const dict = getDictionaryOf(LocaleContext.getContext())

	$effect(() => {
		if (profile) applySwatchToTokens(generateAvatarSwatchFrom(profile.id))
	})
</script>

<button>
	{#if profile !== undefined}
		{profile.username}
		<Icon icon="AvatarSigned" />
	{:else}
		MISSING_UNSIGNED_LABEL
		<Icon icon="ArrowExternal" />
		<Icon icon="AvatarAnon" />
	{/if}
</button>
