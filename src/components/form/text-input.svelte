<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		value: string
		inputType?: "text" | "url"
		layout?: "column" | "row"
	}

	let { label, name, placeholder, value = $bindable(), inputType = "text", layout = "row" }: Props = $props()
</script>

<label
	for={name}
	class={[
		"flex h-min w-full font-serif text-2xl font-medium tracking-tighter text-inverse",
		layout === "row" ? "flex-row items-center gap-4" : "flex-col justify-start",
	]}>
	<span class="flex gap-2">
		<Icon icon="Starmark" size="small" />
		{label}:
	</span>

	<input
		id={name}
		{name}
		type={inputType}
		autocomplete="off"
		inputmode={inputType}
		{placeholder}
		bind:value
		class={[
			"w-full border-b-3 border-inverse bg-obverse",
			"text-center font-serif text-2xl font-medium tracking-tighter text-inverse",
			"placeholder:text-accent placeholder:italic placeholder:brightness-200",
		]} />
</label>
