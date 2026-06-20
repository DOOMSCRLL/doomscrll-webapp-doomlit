<script lang="ts">
	import type { ComponentProps } from "svelte"

	import type { DoomscrllIcon } from "comps/icons/doomscrll-icons"
	import Icon from "comps/icons/icon.svelte"
	import SlabButton from "./slab-button.svelte"

	type Props = {
		icon: DoomscrllIcon
	} & ComponentProps<typeof SlabButton>

	let { variant, icon, onClick, reference = $bindable() }: Props = $props()
</script>

<SlabButton {variant} {onClick} alignment="center" fit="square" size="normal" bind:reference
	><Icon {icon} size="normal" /></SlabButton>
