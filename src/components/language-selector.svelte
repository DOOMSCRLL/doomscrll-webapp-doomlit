<script lang="ts">
	import { invalidateAll } from "$app/navigation"
	import KEYS_COOKIE from "const/cookies"

	import { LOCALES } from "const/locales"
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getLocaleFlag, getLocaleName } from "utils/locale-utils"
	import StylisticTimeFormat from "utils/stylistic-time-fmt"

	type Props = {
		label: string
	}

	let { label }: Props = $props()

	let localeState = LocaleContext.context
	let dateFmtState = DateFmtContext.context

	let isInitial = true
	$effect(() => {
		const newLocale = localeState.value

		if (isInitial) {
			isInitial = false
			return
		}

		if (newLocale) {
			dateFmtState.value = new StylisticTimeFormat(newLocale)
			document.cookie = `${KEYS_COOKIE.Locale}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
			invalidateAll()
		}
	})
</script>

<label for="lang-selector" class="sr-only">{label}</label>
<select
	name="lang-selector"
	id="lang-selector"
	class={[
		"cursor-pointer font-mono font-bold tracking-wider uppercase",
		"rounded-2xl border-2 border-transparent bg-obverse px-4",
		"hover:bg-inverse/20 active:border-inverse",
	]}
	bind:value={localeState.value}>
	{#each LOCALES as loc (loc)}
		<option value={loc}>{getLocaleFlag(loc)} {getLocaleName(loc)}</option>
	{/each}
</select>
