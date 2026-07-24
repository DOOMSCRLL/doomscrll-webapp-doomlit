<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import Popover from "comps/popover.svelte"

	const { projectRefId } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.manage)

	let menuTrigger = $state<HTMLButtonElement>()
</script>

<SlabButton alignment="right" fit="min" size="normal" variant="text" bind:reference={menuTrigger}>
	{dict.label}
	<Icon icon="ArrowDropdown" size="small" />
</SlabButton>
<Popover
	arrowPosition="top"
	horizontalAlignment="center"
	verticalAlignment="bottom"
	doManageTrigger={true}
	bind:trigger={menuTrigger}>
	<SlabAnchorExternal variant="outlined" fit="max" href="mailto:hello@doomscrll.com">
		<Icon icon="Help" />
		{dict.actions.labelSupport}
		<Icon icon="ArrowExternal" />
	</SlabAnchorExternal>
	<hr class="w-full border-b-2 border-inverse" />
	<SlabAnchor href="/doomlits/{projectRefId}/reschedule" variant="text" fit="max">
		<Icon icon="Settings" />
		{dict.actions.labelReschedule}
	</SlabAnchor>
	<SlabAnchor href="/doomlits/{projectRefId}/refund" variant="text" hasAccent={true} fit="max">
		<Icon icon="Purchase" />
		{dict.actions.labelRefund}
	</SlabAnchor>
</Popover>
