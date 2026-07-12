<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import TooltipButton from "comps/buttons/tooltip-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type Props = {
		name: string
		label: string
		placeholder: string
		instructions?: string
		tooltip?: string
		value?: string
		inputType?: "text" | "url" | "email" | "otp"
		layout?: "column" | "row"
		isRequired?: boolean
	}

	let {
		label,
		name,
		placeholder,
		instructions,
		tooltip,
		value = $bindable(),
		inputType = "text",
		layout = "row",
		isRequired = false,
	}: Props = $props()

	const nativeInputType = $derived(inputType === "otp" ? "text" : inputType)
</script>

<section class="flex h-min w-full flex-col items-start">
	{#if tooltip}<TooltipButton id="{name}-tooltip" content={tooltip} />{/if}

	<label
		for={name}
		class={[
			"flex h-min w-full cursor-text gap-4 font-serif text-2xl font-medium tracking-tighter whitespace-nowrap text-inverse",
			layout === "row" ? "flex-row items-center" : "flex-col justify-start",
		]}>
		<span class="flex gap-2">
			<Icon icon="Starmark" size="small" />
			{label}{#if instructions}<BadgeText text={instructions} />{/if}:
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
			aria-describedby="{name}-tooltip"
			bind:value
			class={[
				"w-full border-b-3 border-inverse bg-obverse",
				"cursor-pointer text-center font-serif text-2xl font-medium tracking-tighter text-inverse",
				"placeholder:text-accent placeholder:italic placeholder:brightness-200",
			]} />
	</label>
</section>
