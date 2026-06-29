<script lang="ts">
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		value?: string
		inputType?: "text" | "url" | "email" | "otp"
		layout?: "column" | "row"
		isRequired?: boolean
	}

	let {
		label,
		name,
		placeholder,
		value = $bindable(),
		inputType = "text",
		layout = "row",
		isRequired = false,
	}: Props = $props()

	const nativeInputType = $derived(inputType === "otp" ? "text" : inputType)
</script>

<label
	for={name}
	class={[
		"flex h-min w-full cursor-text font-serif text-2xl font-medium tracking-tighter text-inverse",
		layout === "row" ? "flex-row items-center gap-4" : "flex-col justify-start",
	]}>
	<span class="flex gap-2 whitespace-nowrap">
		<Icon icon="Starmark" size="small" />
		{label}:
	</span>

	<input
		id={name}
		{name}
		type={nativeInputType}
		autocomplete={inputType === "text" ? "off" : "on"}
		inputmode={nativeInputType}
		maxlength={inputType === "otp" ? 6 : undefined}
		minlength={inputType === "otp" ? 6 : undefined}
		required={isRequired}
		{placeholder}
		bind:value
		class={[
			"w-full border-b-3 border-inverse bg-obverse",
			"cursor-pointer text-center font-serif text-2xl font-medium tracking-tighter text-inverse",
			"placeholder:text-accent placeholder:italic placeholder:brightness-200",
		]} />
</label>
