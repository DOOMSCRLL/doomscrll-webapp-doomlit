<script lang="ts">
	import toOptValue from "utils/to-opt-value"

	type Props = {
		name: string
		label: string
		placeholder: string
		options: string[]
		value?: string
	}

	let { label, name, options, placeholder, value = $bindable() }: Props = $props()
</script>

<label for={name} class={[""]}>
	{label}
	<select {name} id={name} class={[""]} bind:value>
		<option value="" disabled hidden>{placeholder}</option>
		{#each options as opt (opt)}
			<option value={toOptValue(opt)}>{opt}</option>
		{/each}
	</select>
</label>
