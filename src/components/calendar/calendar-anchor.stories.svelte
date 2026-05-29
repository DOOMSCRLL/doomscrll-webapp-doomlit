<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import CalendarAnchor from "./calendar-anchor.svelte"

	const { Story } = defineMeta({
		title: "Calendar/Calendar Anchor",
		component: CalendarAnchor,
	})
</script>

<Story name="May_2026" args={{ month: 5, year: 2026 }} />
<Story name="Jun_2027" args={{ month: 6, year: 2027 }} />
