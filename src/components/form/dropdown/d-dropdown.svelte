<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Icon from "comps/icons/icon.svelte"
	import Popover from "comps/popover.svelte"
	import DOptionGroup from "./d-option-group.svelte"
	import DOption from "./d-option.svelte"

	type OptData = {
		value: string
		label: string
	}
	type OptGroupData = {
		label?: string
		opts: OptData[]
	}

	type Props = {
		name: string
		placeholder: string
		emptyQueryLabel: string
		options: OptGroupData[]
		selectedValue?: string
	}

	let { name, placeholder, emptyQueryLabel, options, selectedValue = $bindable() }: Props = $props()

	let trigger = $state<HTMLButtonElement>()
	let inputRef = $state<HTMLInputElement>()

	function handleTriggerOnClick(): void {
		isOpen = !isOpen
	}

	$effect(() => {
		if (isOpen && inputRef) inputRef.focus()
	})

	const listboxId = `listbox-${Math.random().toString(36).slice(2, 9)}`

	let isOpen = $state<boolean>(false)
	let searchQuery = $state<string>("")
	let highlightedValue = $state<string>()

	let flatOpts = $derived<OptData[]>(options.flatMap((g) => g.opts))
	let filteredOptions = $derived.by<OptData[] | undefined>(() => {
		const query = searchQuery.toLocaleLowerCase().trim()
		if (!query) return undefined
		else return flatOpts.filter((o) => o.label.toLocaleLowerCase().includes(query))
	})

	let triggerLabel = $derived.by<string>(() => {
		if (!selectedValue) return placeholder
		return flatOpts.find((o) => o.value === selectedValue)?.label ?? placeholder
	})

	function handleHover(event: PointerEvent, value: string): void {
		if (event.movementX === 0 && event.movementY === 0) return
		else if (highlightedValue !== value) highlightedValue = value
	}

	function handleSelect(value: string): void {
		selectedValue = value
		searchQuery = ""
		isOpen = false
		trigger?.focus()
	}

	function scrollToActive(): void {
		requestAnimationFrame(() =>
			document.getElementById(`opt-${highlightedValue}`)?.scrollIntoView({ block: "nearest" }),
		)
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === "Tab") {
			isOpen = false
			return
		} else if (event.key === "Escape") {
			event.preventDefault()
			isOpen = false
			trigger?.focus()
			return
		}

		const validOpts = filteredOptions ?? flatOpts
		if (validOpts.length === 0) return

		const currentIndex = highlightedValue ? validOpts.findIndex((o) => o.value === highlightedValue) : -1
		if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
			event.preventDefault()
			isOpen = true
			highlightedValue = validOpts[0].value
			return
		}

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault()
				highlightedValue = validOpts[Math.min(currentIndex + 1, validOpts.length - 1)].value
				scrollToActive()
				break
			case "ArrowUp":
				event.preventDefault()
				highlightedValue = validOpts[Math.max(currentIndex - 1, 0)].value
				scrollToActive()
				break
			case "Enter":
				event.preventDefault()
				if (highlightedValue) handleSelect(highlightedValue)
				break
		}
	}
</script>

{#snippet dopt(opt: OptData)}
	<DOption
		value={opt.value}
		label={opt.label}
		isSelected={selectedValue === opt.value}
		isHighlighted={highlightedValue === opt.value}
		onHover={(e) => handleHover(e, opt.value)}
		onSelect={handleSelect} />
{/snippet}

<section class="h-min w-min">
	<input type="hidden" {name} bind:value={selectedValue} />

	<SlabButton variant="outlined" alignment="right" onClick={handleTriggerOnClick} bind:reference={trigger}>
		{triggerLabel}
		<Icon icon="ArrowDropdown" size="small" />
	</SlabButton>

	{#if isOpen}
		<Popover
			{trigger}
			arrowPosition="top"
			horizontalAlignment="center"
			verticalAlignment="bottom"
			doManageTrigger={false}>
			<input
				type="text"
				role="combobox"
				aria-activedescendant={highlightedValue ? `opt-${highlightedValue}` : undefined}
				aria-autocomplete="list"
				aria-controls={listboxId}
				aria-expanded={isOpen}
				{placeholder}
				onkeydown={handleKeyDown}
				class={[
					"w-full border-b-3 border-inverse bg-obverse",
					"cursor-pointer text-center font-serif text-2xl font-medium tracking-tighter text-inverse",
					"placeholder:text-accent placeholder:italic placeholder:brightness-200",
				]}
				bind:this={inputRef}
				bind:value={searchQuery} />

			<ul
				id={listboxId}
				role="listbox"
				class="flex h-full max-h-60 w-full pretty-scrollbar flex-col gap-1 overflow-x-hidden overflow-y-auto px-2">
				{#if filteredOptions !== undefined}
					{#each filteredOptions as opt (opt.value)}
						{@render dopt(opt)}
					{:else}
						<li role="presentation">
							<p>{emptyQueryLabel}</p>
						</li>
					{/each}
				{:else}
					{#each options as group (group.label || "flat")}
						<DOptionGroup label={group.label}>
							{#each group.opts as opt (opt.value)}{@render dopt(opt)}{/each}
						</DOptionGroup>
					{/each}
				{/if}
			</ul>
		</Popover>
	{/if}
</section>
