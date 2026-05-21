<script lang="ts">
	import type PartProps from "utils/part-props"

	import type { DoomscrllIcon } from "comps/icons/doomscrll-icons"
	import Icon from "comps/icons/icon.svelte"
	import SlabButton from "./slab-button.svelte"

	type Props = {
		icon: DoomscrllIcon
	} & PartProps<typeof SlabButton>

	const { variant, icon, onClick }: Props = $props()
</script>

<SlabButton {variant} {onClick} alignment="center" fit="square" size="normal"><Icon {icon} size="normal" /></SlabButton>
