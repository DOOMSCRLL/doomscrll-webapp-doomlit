<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import type { ProjectStatus } from "models/project"
	import { getDictionaryOf } from "repos/locale-repo"

	type Props = {
		status: ProjectStatus
	}

	const { status }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlits.projectStatusLabels)
	const label = $derived(status === "ready" ? dict.ready : dict.incomplete)
</script>

<p class="flex items-center gap-2 font-mono font-bold tracking-wide uppercase">
	<svg width="24" height="24" viewBox="0 0 10 10" fill={status === "ready" ? "#00ff00" : "#ff0000"}>
		<circle cx="5" cy="5" r="4" />
	</svg>
	{label}
</p>
