<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import ProgressIndicator from "./progress-indicator.svelte"

	const { Story } = defineMeta({
		title: "Decorators/Progress Indicator",
		component: ProgressIndicator,
	})
</script>

<Story name="P_0/256" args={{ progress: 0, label: "0/256" }} />
<Story name="P_36/256" args={{ progress: (36 / 256) * 100, label: "36/256" }} />
<Story name="P_184/256" args={{ progress: (184 / 256) * 100, label: "184/256" }} />
<Story name="P_256/256" args={{ progress: 100, label: "256/256" }} />
