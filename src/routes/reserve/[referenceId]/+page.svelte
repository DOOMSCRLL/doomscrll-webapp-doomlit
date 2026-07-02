<script lang="ts">
	import DoomlitReservationAnchor from "comps/buttons/doomlit-reservation-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"
	import DDate from "utils/d-date"

	const { data } = $props()

	const fmt = $derived(DateFmtContext.context.value!)
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).payment)

	// TODO: Change lable of reserve button on root route
	const project = $derived(data.project)
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix} ({data.project.name}) | DOOMSCRLL</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

{#snippet labeledText(label: string, content: string)}
	<p class="flex justify-between font-serif text-xl font-bold text-accent lowercase italic">
		{label}:<span class="font-medium text-inverse normal-case not-italic">{content}</span>
	</p>
{/snippet}

<main class="flex h-screen w-full flex-col items-center justify-around overflow-hidden supports-[height:100dvh]:h-dvh">
	<section class="flex h-full w-min flex-col items-stretch justify-evenly">
		<DoomscrllWordmark />
		<p class="font-serif text-xl font-medium tracking-tight whitespace-pre-wrap text-inverse">{dict.copy}</p>
		<section class="flex w-full flex-col gap-2 rounded-3xl border-4 border-inverse p-6">
			{@render labeledText(
				dict.details.labelReservationDate,
				fmt.getFullDate(DDate.fromISOString(project.showcaseDate)),
			)}
			{@render labeledText(dict.details.labelProjectName, project.name)}
			{@render labeledText(dict.details.labelCategory, project.category)}
			{@render labeledText(dict.details.labelAuthor, `@${project.authorHandle}`)}
			{@render labeledText(dict.details.labelRefId, project.referenceId)}
		</section>
		<section class="flex gap-4">
			<form action="?/cancelDraft" method="POST">
				<SlabButton alignment="left" fit="min" hasAccent={true} variant="outlined" buttonType="submit">
					<Icon icon="ArrowBack" />{dict.actions.labelCancel}
				</SlabButton>
			</form>
			<DoomlitReservationAnchor label={dict.actions.labelProceed} referenceId={project.referenceId} />
		</section>
	</section>
</main>
