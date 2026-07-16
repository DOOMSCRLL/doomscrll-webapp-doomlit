<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import Popover from "comps/popover.svelte"
	/*
  type Props = {

  }

  const {  }: Props = $props()*/
	// TODO: IMPLEMENT PROJECT MANAGEMENT MENU
	let buttonRef = $state<HTMLButtonElement>()
</script>

<SlabButton alignment="right" fit="min" size="normal" variant="text" bind:reference={buttonRef}>
	MISSING_LABEL
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
