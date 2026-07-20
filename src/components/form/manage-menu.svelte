<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabAnchorExternal from "comps/buttons/slab-anchor-external.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import Popover from "comps/popover.svelte"

	type Props = {
		rescheduleTrigger?: HTMLButtonElement
		refundTrigger?: HTMLButtonElement
	}

	let { rescheduleTrigger = $bindable(), refundTrigger = $bindable() }: Props = $props()

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
	<SlabButton variant="text" fit="max" renderDecors={true} bind:reference={rescheduleTrigger}>
		<Icon icon="Settings" />
		{dict.actions.labelReschedule}
	</SlabButton>
	<SlabButton variant="text" hasAccent={true} fit="max" renderDecors={true} bind:reference={refundTrigger}>
		<Icon icon="Purchase" />
		{dict.actions.labelRefund}
	</SlabButton>
</Popover>
