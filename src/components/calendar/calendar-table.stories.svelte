<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import CalendarTable from "./calendar-table.svelte"

	const { Story } = defineMeta({
		title: "Calendar/Calendar Table",
		component: CalendarTable,
	})
</script>

<Story name="Default" />
