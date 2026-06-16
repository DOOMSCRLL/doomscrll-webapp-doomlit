<script lang="ts">
	import ttm from "utils/type-literal-to-class"

	import { getDoomscrllIcon, type DoomscrllIcon } from "./doomscrll-icons"

	export type IconSize = "normal" | "small"

	type Props = {
		icon: DoomscrllIcon
		size?: IconSize
	}

	const { icon, size = "normal" }: Props = $props()
	const IconToRender = $derived(getDoomscrllIcon(icon))
</script>

<span role="complementary" class="complementary">
	<svg
		viewBox="0 0 24 24"
		fill="currentColor"
		class={[
			ttm(size, {
				normal: "h-8 w-8",
				small: "h-4 w-4",
			}),
		]}>
		<IconToRender />
	</svg>
</span>
