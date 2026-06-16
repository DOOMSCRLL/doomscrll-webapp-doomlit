<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import DDate from "utils/d-date"
	import CalendarTable from "./calendar-table.svelte"

	const { Story } = defineMeta({
		title: "Calendar/Calendar Table",
		component: CalendarTable,
	})

	const today = DDate.today()
</script>

<Story name="Today" args={{ month: today.month, year: today.year }} />
<Story name="May 22_2026" args={{ month: 5, year: 2026 }} />
<Story name="April 14_2026" args={{ month: 4, year: 2026 }} />
<Story name="December 31_2027" args={{ month: 12, year: 2027 }} />
