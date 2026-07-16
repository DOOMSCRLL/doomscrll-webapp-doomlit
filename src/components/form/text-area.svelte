<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"

	import type { StatusMessage } from "validators/doomlit"

	type Props = {
		name: string
		label: string
		placeholder: string
		instructions?: string
		value?: string
		validator?: (value: string | undefined) => StatusMessage | undefined
	}

	let { name, label, placeholder, instructions, value = $bindable(), validator }: Props = $props()
	
	let status = $state<StatusMessage>()
	let isFocused = $state(false)

	$effect(() => {
		if (validator) status = validator(value)
	})
</script>

<section class="flex h-min w-full flex-col items-start gap-4">
	<label class="flex h-full w-full flex-col gap-4 font-serif text-2xl tracking-tight text-inverse">
		<span class="flex gap-2">
			<Icon icon="Starmark" size="small" />
			{label}{#if instructions}<BadgeText text={instructions} />{/if}:
		</span>
		<textarea
			{name}
			{placeholder}
			cols={1}
			rows={2}
			class={[
				"w-full grow border-b-3 border-inverse bg-obverse",
				"cursor-text font-serif text-2xl font-medium tracking-tighter text-inverse",
				"placeholder:text-[darkgray] placeholder:italic",
			]}
			onfocus={() => (isFocused = true)}
			onblur={() => (isFocused = false)}
			bind:value></textarea>
	</label>

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
