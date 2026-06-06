<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Option = {
		value: string
		label: string
	}

	type Props = {
		name: string
		label: string
		placeholder: string
		options: Option[]
		isRequired?: boolean
		value?: string
	}

	let { label, name, options, placeholder, isRequired = false, value = $bindable() }: Props = $props()
</script>

<label
	for={name}
	class="flex h-min w-full cursor-text gap-4 font-serif text-2xl font-medium tracking-tighter text-inverse">
	<span class="flex w-full gap-2">
		<Icon icon="Starmark" size="small" />
		{label}:
	</span>

	<select
		{name}
		id={name}
		required={isRequired}
		class={[
			"w-full cursor-pointer border-b-3 border-inverse bg-obverse text-center font-serif",
			"hover:bg-inverse/40 active:bg-accent",
		]}
		bind:value>
		<option value={undefined} disabled hidden>{placeholder}</option>
		{#each options as opt (opt)}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
</label>
