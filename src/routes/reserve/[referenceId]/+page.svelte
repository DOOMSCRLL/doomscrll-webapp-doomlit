<script lang="ts">
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"
	import DDate from "utils/d-date"

	import DoomlitReservationAnchor from "comps/buttons/doomlit-reservation-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Countdown from "comps/countdown.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	const { data } = $props()

	const fmt = $derived(DateFmtContext.context.value!)
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).payment)

	const project = $derived(data.project)

	//let errorDetails = $state<Record<string, unknown>>()

	let isDraftExpired = $state(false)
	function onDraftExpiration() {
		isDraftExpired = true
	}
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
	<section class="flex h-full w-min min-w-60/100 flex-col items-stretch justify-evenly">
		<DoomscrllWordmark />

		{#if !isDraftExpired}
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
			<Countdown
				durationMins={data.rules.draftExpirationMinutes}
				startTimestamp={new Date(data.project.reservedAt)}
				onCountdownEnd={onDraftExpiration} />
		{:else}
			<p class="font-serif text-2xl font-medium tracking-tight whitespace-pre-wrap text-inverse">
				{dict.copyExpiration}
			</p>
			<form action="?/cancelDraft" method="POST">
				<SlabButton alignment="left" fit="max" hasAccent={true} variant="outlined" buttonType="submit">
					<Icon icon="ArrowBack" />{dict.actions.labelReturn}
				</SlabButton>
			</form>
		{/if}
	</section>
</main>
