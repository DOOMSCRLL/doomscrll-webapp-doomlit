<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		constraints?: string
		value?: string
	}

	let { name, label, placeholder, constraints, value }: Props = $props()
</script>

<label class="flex w-full flex-col gap-4">
	{label}
	{#if constraints}
		<BadgeText text={constraints} />
	{/if}
	<textarea
		{name}
		{placeholder}
		rows={3}
		cols={1}
		class={[
			"w-full border-b-3 border-inverse bg-obverse",
			"cursor-pointer font-serif text-2xl font-medium tracking-tighter text-inverse",
			"placeholder:text-accent placeholder:italic placeholder:brightness-200",
		]}
		bind:value></textarea>
</label>
