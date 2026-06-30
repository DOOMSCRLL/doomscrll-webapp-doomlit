<script lang="ts">
	import SlabButton from "comps/buttons/slab-button.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	const { data } = $props()

	const project = $derived(data.project)
</script>

<main class="flex h-screen w-full flex-col justify-evenly overflow-hidden supports-[height:100dvh]:h-dvh">
	<DoomscrllWordmark />

	<p>MISSING_LABEL_RESERVATION_DETAILS</p>
	<section class="flex flex-col gap-2">
		<p class="font-serif text-xl font-medium text-inverse italic">
			LABEL_AUTHOR_NAME: <span class="font-bold not-italic">@{project.authorHandle}</span>
		</p>
		<p class="font-serif text-xl font-medium text-inverse italic">
			LABEL_REF_ID: <span class="font-bold not-italic">{project.referenceId}</span>
		</p>
		<p class="font-serif text-xl font-medium text-inverse italic">
			LABEL_PROJECT_NAME: <span class="font-bold not-italic">{project.name}</span>
		</p>
		<p class="font-serif text-xl font-medium text-inverse italic">
			LABEL_RESERV_DATE: <span class="font-bold not-italic">{project.showcaseDate}</span>
		</p>
	</section>

	<section class="flex gap-4">
		<form action="?/cancelDraft">
			<SlabButton alignment="left" fit="min" hasAccent={true} variant="outlined" buttonType="submit">
				<Icon icon="ArrowBack" />MISSING_LABEL_CANCEL
			</SlabButton>
		</form>
		<form action="?/startPayment">
			<SlabButton alignment="left" fit="max" variant="filled" buttonType="submit">
				<Icon icon="Purchase" /> MISSING_LABEL_PROCEED_TO_PAYMENT
			</SlabButton>
		</form>
	</section>
</main>
