<script lang="ts">
	type Props = {
		text: string
	}

	const { text }: Props = $props()

	const label = $derived.by(() => {
		let newLabel = text.trim()
		if (!newLabel.startsWith("(")) newLabel = "(" + newLabel
		if (!newLabel.endsWith(")")) newLabel = newLabel + ")"
		return newLabel
	})
</script>

<span class="align-super font-mono text-sm font-bold tracking-widest">{label}</span>
