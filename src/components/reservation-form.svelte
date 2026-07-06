<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getCategories, getCategoryLabelFor, isCategory } from "repos/category-repo"
	import { getDictionaryOf } from "repos/locale-repo"
	import { getPlatform, getPlatformsFor, slugToPlatformName } from "repos/platform-repo"
	import type DDate from "utils/d-date"

	import { enhance } from "$app/forms"
	import SlabButton from "./buttons/slab-button.svelte"
	import Dropdown from "./form/dropdown.svelte"
	import TextInput from "./form/text-input.svelte"
	import ExternalIcon from "./icons/external-icon.svelte"
	import Icon from "./icons/icon.svelte"

	type FailureCallback = (details?: { status?: string; message?: string; details?: unknown }) => void

	type Props = {
		date: DDate
		onCancel: () => void
		onFail?: FailureCallback
		onError?: FailureCallback
	}
	const { date, onCancel, onFail, onError }: Props = $props()

	const locale = $derived(LocaleContext.context.value!)
	const dict = $derived(getDictionaryOf(locale).reservation.reservationForm)

	let selectedCategory = $state<string>()
	let selectedPlatformSlug = $state<string>()
	const selectedPlatformName = $derived(slugToPlatformName(selectedPlatformSlug))
	type Option = { label: string; value: string }
	const categoryOpts = $derived<Option[]>(
		getCategories().map((c) => ({ value: c, label: getCategoryLabelFor(c, locale) })),
	)
	const platformOpts = $derived.by<Option[]>(() => {
		if (!selectedCategory || !isCategory(selectedCategory)) return []

		const filteredPlatforms = getPlatformsFor(selectedCategory)
		filteredPlatforms.push(getPlatform("web"))

		return filteredPlatforms.map((p) => ({ label: p.name, value: p.slug }))
	})
</script>

<form
	action="?/reserve"
	method="POST"
	class="flex flex-col gap-12"
	use:enhance={() =>
		async ({ result, update }) => {
			if (result.type === "redirect") {
				window.location.href = result.location
			} else if (result.type === "failure") {
				onFail?.(result.data)
				update()
			} else {
				onError?.({ status: String(result.status) })
				update()
			}
		}}>
	<input type="hidden" name="showcase-date" value={date.toISOString()} />
	<section class="flex flex-col gap-6">
		<TextInput
			name="project-name"
			label={dict.inputProjectName.label}
			placeholder={dict.inputProjectName.placeholder}
			layout="column"
			isRequired={true} />
		<Dropdown
			name="project-category"
			label={dict.inputCategory.label}
			placeholder={dict.inputCategory.placeholder}
			options={categoryOpts}
			isRequired={true}
			bind:value={selectedCategory} />
		<Dropdown
			name="project-platform"
			label={dict.inputPlatform.label}
			placeholder={dict.inputPlatform.placeholder}
			options={platformOpts}
			isRequired={true}
			bind:value={selectedPlatformSlug} />
		{#if selectedPlatformName}
			<div class="flex items-end gap-12">
				<ExternalIcon labelSuffix="MISSING_LABEL_PLATFORM_ICON" platform={selectedPlatformName} />
				<TextInput
					name="project-url"
					label={dict.inputPrimaryUrl.label}
					placeholder={dict.inputPrimaryUrl.placeholder}
					layout="column"
					inputType="url"
					isRequired={true} />
			</div>
		{/if}
	</section>

	<section class="flex gap-4">
		<SlabButton variant="outlined" alignment="left" fit="min" onClick={onCancel}>
			<Icon icon="ArrowBack" />
			{dict.labelCancel}
		</SlabButton>
		<SlabButton variant="filled" fit="max" buttonType="submit">
			{dict.labelReserve}
			<Icon icon="ArrowForward" />
		</SlabButton>
	</section>
</form>
