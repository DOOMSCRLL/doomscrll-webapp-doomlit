<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import Popover from "comps/popover.svelte"
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	/*
  type Props = {

  }

  const {  }: Props = $props()*/
	// TODO: IMPLEMENT PROJECT MANAGEMENT MENU
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.manage)

	let buttonRef = $state<HTMLButtonElement>()
</script>

<SlabButton alignment="right" fit="min" size="normal" variant="text" bind:reference={buttonRef}>
	{dict.label}
	<Icon icon="ArrowDropdown" size="small" />
</SlabButton>
<Popover
	arrowPosition="top"
	horizontalAlignment="center"
	verticalAlignment="bottom"
	doManageTrigger={true}
	bind:trigger={buttonRef}>
	<p>MISSING_CONTENT</p>
</Popover>
