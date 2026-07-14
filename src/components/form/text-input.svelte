<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import TooltipButton from "comps/buttons/tooltip-button.svelte"
	import Icon from "comps/icons/icon.svelte"

	type StatusMessage = {
		message?: string
		type?: "error" | "info"
	}

	type Props = {
		name: string
		label: string
		placeholder: string
		instructions?: string
		tooltip?: string
		status?: StatusMessage
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
		status,
		value = $bindable(),
		inputType = "text",
		layout = "row",
		isRequired = false,
	}: Props = $props()

	const nativeInputType = $derived(inputType === "otp" ? "text" : inputType)
	let isFocused = $state(false)
</script>

<section class="flex h-min w-full flex-col items-start gap-4">
	<section class={["flex h-fit w-full items-center justify-start gap-4", layout === "row" ? "flex-row" : "flex-col"]}>
		<div class="flex {layout === 'column' ? 'w-full justify-between' : 'w-min gap-4'}">
			<label
				for={name}
				class="flex cursor-text gap-2 font-serif text-2xl font-medium tracking-tighter whitespace-nowrap text-inverse">
				<Icon icon="Starmark" size="small" />
				{label}{#if instructions}<BadgeText text={instructions} />{/if}:
			</label>
			{#if tooltip}<TooltipButton id="{name}-tooltip" content={tooltip} />{/if}
		</div>
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
			class={[
				"w-full border-b-3 border-inverse bg-obverse",
				"cursor-text text-center font-serif text-2xl font-medium tracking-tighter text-inverse",
				"placeholder:text-accent placeholder:italic placeholder:brightness-200",
			]}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
			bind:value />
	</section>

	{#if status?.message && (status.type === "error" || isFocused)}
		<p
			class={[
				"font-serif text-xl font-medium tracking-tight",
				status.type === "error" ? "text-accent" : "text-inverse",
				"ml-4 flex items-center gap-2",
			]}>
			<Icon icon={status.type === "error" ? "Cancel" : "Help"} />
			{status.message}
		</p>
	{/if}
</section>
