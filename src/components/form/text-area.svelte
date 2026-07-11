<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		constraints?: string
		value?: string
	}

	let { name, label, placeholder, constraints, value }: Props = $props()
</script>

<label class="flex h-full w-full flex-col gap-4 font-serif text-2xl tracking-tight text-inverse">
	<span class="flex gap-2">
		<Icon icon="Starmark" size="small" />
		{label}:
	</span>
	{#if constraints}
		<BadgeText text={constraints} />
	{/if}
	<textarea
		{name}
		{placeholder}
		cols={1}
		rows={2}
		class={[
			"w-full grow border-b-3 border-inverse bg-obverse",
			"cursor-pointer font-serif text-2xl font-medium tracking-tighter text-inverse",
			"placeholder:text-accent placeholder:italic placeholder:brightness-200",
		]}
		bind:value></textarea>
</label>
