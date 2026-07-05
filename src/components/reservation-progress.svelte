<script lang="ts">
	import ProgressIndicator from "./progress-indicator.svelte"

	type Props = {
		current: number
		max?: number
	}

	const { current, max = 256 }: Props = $props()
	const progress = $derived(Math.round((current / max) * 100))
	const label = $derived(`${current.toString().padStart(max.toString().length, "0")} / ${max}`)
</script>

<ProgressIndicator {progress} {label} />
