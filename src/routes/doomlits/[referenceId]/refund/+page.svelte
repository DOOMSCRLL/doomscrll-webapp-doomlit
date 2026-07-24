<script lang="ts">
	import type { SubmitFunction } from "@sveltejs/kit"
	import { enhance } from "$app/forms"
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"

	import SlabAnchor from "comps/buttons/slab-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"
	import SpinnerModal from "comps/spinner-modal.svelte"
	import UrgentModal from "comps/urgent-modal.svelte"
	import DDate from "utils/d-date"

	const { data } = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).doomlitRefund)
	const fmt = $derived(DateFmtContext.context.value!)

	const project = $derived(data.project)

	let isRefunding = $state(false)
	let statusMsg = $state<{ title: string; body: string; isSuccess?: boolean }>()

	const handleRefund: SubmitFunction = () => {
		isRefunding = true

		return async ({ result, update }) => {
			isRefunding = false

			if (result.type === "success") {
				statusMsg = {
					isSuccess: true,
					title: dict.statusMsg.success.title,
					body: dict.statusMsg.success.body,
				}
			} else if (result.type === "failure") {
				statusMsg = {
					title: dict.statusMsg.fail.title,
					body: dict.statusMsg.fail.body,
				}
			} else if (result.type === "error") {
				statusMsg = {
					title: dict.statusMsg.error.title,
					body: dict.statusMsg.error.body,
				}
			}

			update({ reset: false })
		}
	}
</script>

<svelte:head>
	<title>{dict.meta.titlePrefix}: {data.project.name} | DOOMSCRLL</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

{#snippet labeledText(label: string, content: string)}
	<p class="font-serif text-2xl font-bold text-accent lowercase italic">{label}:</p>
	<p class="font-serif text-2xl font-medium text-inverse">{content}</p>
{/snippet}

<main class="flex h-screen w-full flex-col items-center justify-around overflow-hidden supports-[height:100dvh]:h-dvh">
	<DoomscrllWordmark />
	<section class="flex h-full w-[50vw] flex-col items-center justify-evenly">
		<section class="grid w-fit auto-rows-fr grid-cols-2 gap-4 rounded-3xl border-4 border-inverse p-6">
			{@render labeledText(dict.details.labelRefId, project.referenceId)}
			{@render labeledText(dict.details.labelProjectName, project.name)}
			{@render labeledText(
				dict.details.labelReservationDate,
				fmt.getFullDate(DDate.fromISOString(project.showcaseDate)),
			)}
		</section>
		<p class="font-serif text-2xl font-medium text-inverse">{dict.textBody}</p>
		<section class="flex w-full justify-center gap-4">
			<SlabAnchor href="/doomlits/{data.project.referenceId}" variant="text" fit="max">
				<Icon icon="ArrowBack" />
				{dict.actions.labelCancel}
			</SlabAnchor>
			<form action="?/refund" method="POST" class="contents" use:enhance={handleRefund}>
				<SlabButton variant="text" hasAccent={true} fit="max" buttonType="submit">
					<Icon icon="Purchase" />
					{dict.actions.labelRefund}
					<Icon icon="ArrowForward" />
				</SlabButton>
			</form>
		</section>
	</section>
</main>

{#if isRefunding}
	<SpinnerModal label={dict.spinnerBodyRefunding} />
{/if}

{#if statusMsg}
	<UrgentModal header={statusMsg.title} body={statusMsg.body}>
		{#snippet actions()}
			<SlabButton
				variant="filled"
				fit="max"
				onClick={() => {
					const success = statusMsg?.isSuccess
					statusMsg = undefined
					if (success) goto(resolve(`/`))
				}}>{statusMsg?.isSuccess ? dict.statusMsg.action.labelClose : dict.statusMsg.action.labelReturn}</SlabButton>
		{/snippet}
	</UrgentModal>
{/if}
