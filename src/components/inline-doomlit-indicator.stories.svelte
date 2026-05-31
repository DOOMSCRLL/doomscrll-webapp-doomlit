<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import InlineDoomlitIndicator from "./inline-doomlit-indicator.svelte"

	const { Story } = defineMeta({
		title: "Misc/Numerical DOOMLIT indicator",
		component: InlineDoomlitIndicator,
	})
</script>

<Story name="P_0/256" args={{ current: 0, max: 256 }} />
<Story name="P_36/256" args={{ current: 36, max: 256 }} />
<Story name="P_184/256" args={{ current: 184, max: 256 }} />
<Story name="P_256/256" args={{ current: 256, max: 256 }} />
