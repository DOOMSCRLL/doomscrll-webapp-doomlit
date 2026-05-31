<script lang="ts">
	type Props = {
		current: number
		max: number
	}

	const { current, max }: Props = $props()
	const progress = $derived(Math.round((current / max) * 100))
</script>

<div
	style="--clip: polygon(-1px -1px, {progress}% -1px, {progress}% calc(100% + 1px), -1px calc(100% + 1px));"
	class={[
		"relative isolate",
		"before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-inverse before:[clip-path:var(--clip)]",
		"after:absolute after:inset-0 after:-z-10 after:rounded-xl after:border-3 after:border-dashed after:border-inverse",
	]}>
	<p
		style="--lgra: linear-gradient(to right, var(--color-obverse) {progress}%, var(--color-inverse) {progress}%)"
		class="m-0 bg-(image:--lgra) bg-clip-text px-4 py-1 text-center font-mono font-bold text-transparent">
		{current.toString().padStart(max.toString().length, "0")} / {max}
	</p>
</div>
