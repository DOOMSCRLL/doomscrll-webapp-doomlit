<script lang="ts">
	import Icon from "comps/icons/icon.svelte"
	import { sortByStringProp } from "utils/sort-by"

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
		doHideLabel?: boolean
		value?: string
	}

	let {
		label,
		name,
		options,
		placeholder,
		isRequired = false,
		doHideLabel = false,
		value = $bindable(),
	}: Props = $props()

	const sortedOpts = $derived(sortByStringProp(options, "label"))
</script>

{#if !doHideLabel}
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
			{#each sortedOpts as opt (opt)}
				<option value={opt.value}>{opt.label}</option>
			{/each}
		</select>
	</label>
{:else}
	<label for={name} class="sr-only">
		{label}:
	</label>

	<select
		{name}
		id={name}
		required={isRequired}
		class={[
			"h-12 w-min min-w-0 cursor-pointer rounded-2xl border-3 border-inverse bg-obverse hover:bg-inverse/40 active:bg-accent",
			"text-center font-mono font-bold text-ellipsis text-inverse uppercase hover:text-obverse active:text-obverse",
			"overflow-hidden whitespace-nowrap",
		]}
		bind:value>
		<option value={undefined} disabled hidden>{placeholder}</option>
		{#each options as opt (opt)}
			<option value={opt.value}>{opt.label}</option>
		{/each}
	</select>
{/if}
