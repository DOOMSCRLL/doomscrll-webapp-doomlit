<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import CalendarTable from "./calendar-table.svelte"

	const { Story } = defineMeta({
		title: "Calendar/Calendar Table",
		component: CalendarTable,
	})
</script>

<Story name="May 22_2026" args={{ month: 4, year: 2026 }} />
