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
		doRenderLabel?: boolean
		errorMessage?: string
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
		doRenderLabel = true,
		errorMessage,
		value = $bindable(),
		inputType = "text",
		layout = "row",
		isRequired = false,
	}: Props = $props()

	const nativeInputType = $derived(inputType === "otp" ? "text" : inputType)
</script>

<section class="flex h-min w-full flex-col items-start gap-4">
	<section class={["flex h-fit w-full items-center justify-start gap-4", layout === "row" ? "flex-row" : "flex-col"]}>
		{#if doRenderLabel}
			<div class="flex justify-start {layout === 'row' ? 'w-min' : 'w-full'} gap-2">
				<label
					for={name}
					class="flex cursor-text gap-2 font-serif text-2xl font-medium tracking-tighter whitespace-nowrap text-inverse">
					<Icon icon="Starmark" size="small" />
					{#if isRequired}<span class="text-[red]">*</span>{/if}{label}{#if instructions}<BadgeText
							text={instructions} />{/if}:
				</label>
				{#if tooltip}<TooltipButton id="{name}-tooltip" content={tooltip} />{/if}
			</div>
		{:else}
			<label for={name} class="sr-only">{label}</label>
		{/if}
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
				"placeholder:text-[darkgray] placeholder:italic",
			]}
			bind:value />
	</section>

	{#if errorMessage}
		<p class="ml-4 flex items-center gap-2 font-serif text-xl font-medium tracking-tight text-accent">
			<Icon icon="Cancel" />
			{errorMessage}
		</p>
	{/if}
</section>
