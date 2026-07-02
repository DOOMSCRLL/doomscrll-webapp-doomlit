<script lang="ts">
	import { PUBLIC_DEV_LEMONSQUEEZY_PRODUCT_LINK } from "$env/static/public"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		label: string
		referenceId: string
	}

	const { label, referenceId }: Props = $props()

	const checkoutUrl = $derived.by(() => {
		const url = new URL(PUBLIC_DEV_LEMONSQUEEZY_PRODUCT_LINK)
		url.searchParams.set("checkout[custom][project_reference_id]", referenceId)
		return url.toString()
	})
</script>

<a
	/* eslint-disable-next-line svelte/no-navigation-without-resolve */
	href={checkoutUrl}
	class={[
		"lemonsqueezy-button",
		"group flex h-12 w-min max-w-full min-w-0 items-center justify-center gap-4 rounded-2xl pr-6 pl-2",
		"overflow-hidden font-mono font-bold tracking-wider text-ellipsis whitespace-nowrap text-obverse uppercase",
		"bg-inverse hover:bg-inverse/40 active:bg-accent",
	]}><Icon icon="Purchase" />{label}</a>
