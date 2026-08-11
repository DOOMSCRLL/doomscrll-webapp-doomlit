<script lang="ts">
	import { goto } from "$app/navigation"
	import { resolve } from "$app/paths"
	import { onMount } from "svelte"

	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte.js"
	import { getDictionaryOf } from "repos/locale-repo.js"
	import DDate from "utils/d-date"

	import DoomlitReservationAnchor from "comps/buttons/doomlit-reservation-anchor.svelte"
	import SlabButton from "comps/buttons/slab-button.svelte"
	import Countdown from "comps/countdown.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"

	const { data } = $props()

	onMount(() => {
		const handleSuccess = () => goto(resolve("/?reservationConfirmed=true"))

		const messageHandler = (event: MessageEvent) => {
			let data = event.data
			if (typeof data === "string") {
				try {
					data = JSON.parse(data)
				} catch {
					/* ignore */
				}
			}
			if (data?.event === "Checkout.Success" || data?.event === "LemonSqueezy.Checkout.Success") {
				handleSuccess()
			}
		}
		window.addEventListener("message", messageHandler)

		let intervalId: ReturnType<typeof setInterval> | null = null
		const setupLemonSqueezy = () => {
			if (window.LemonSqueezy) {
				window.LemonSqueezy.Setup({
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					eventHandler: (event: any) => {
						if (event.event === "Checkout.Success") handleSuccess()
					},
				})
				if (intervalId) clearInterval(intervalId)
			}
		}

		setupLemonSqueezy()
		if (!window.LemonSqueezy) {
			intervalId = setInterval(setupLemonSqueezy, 300)
		}

		return () => {
			window.removeEventListener("message", messageHandler)
			if (intervalId) clearInterval(intervalId)
		}
	})

	const fmt = $derived(DateFmtContext.context.value!)
	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).payment)

	const project = $derived(data.project)

	let isLaunchPromoActive = $derived.by(() => {
		if (!data.rules.isFreeLaunchActive) return false
		const promoEndDate = DDate.fromISOString(data.rules.freeLaunchEndDate)
		return !promoEndDate.isPrior(DDate.today())
	})

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
	<p class="font-serif text-xl font-bold text-accent lowercase italic">{label}:</p>
	<p class="font-serif text-xl font-medium text-inverse">{content}</p>
{/snippet}

<main class="flex h-screen w-full flex-col items-center justify-around overflow-hidden supports-[height:100dvh]:h-dvh">
	<DoomscrllWordmark />
	<section class="flex h-full w-[50vw] flex-col items-center justify-evenly">
		{#if !isDraftExpired}
			<p class="font-serif text-xl font-medium tracking-tight whitespace-pre-wrap text-inverse">{dict.copy}</p>
			<section class="grid w-fit auto-rows-fr grid-cols-2 gap-4 rounded-3xl border-4 border-inverse p-6">
				{@render labeledText(
					dict.details.labelReservationDate,
					fmt.getFullDate(DDate.fromISOString(project.showcaseDate)),
				)}
				{@render labeledText(dict.details.labelProjectName, project.name)}
				{@render labeledText(dict.details.labelCategory, project.category)}
				{@render labeledText(dict.details.labelAuthor, `@${project.authorHandle}`)}
				{@render labeledText(dict.details.labelRefId, project.referenceId)}
			</section>
			<section class="flex w-full justify-center gap-4">
				<form action="?/cancelDraft" method="POST">
					<SlabButton alignment="left" fit="min" hasAccent={true} variant="outlined" buttonType="submit">
						<Icon icon="ArrowBack" />{dict.actions.labelCancel}
					</SlabButton>
				</form>
				{#if isLaunchPromoActive}
					<form action="?/claimFree" method="POST">
						<SlabButton variant="filled" buttonType="submit">{dict.actions.labelClaimFree}</SlabButton>
					</form>
				{:else}
					<DoomlitReservationAnchor label={dict.actions.labelProceed} referenceId={project.referenceId} />
				{/if}
			</section>
			<section class="w-full">
				<Countdown
					durationMins={data.rules.draftExpirationMinutes}
					startTimestamp={new Date(data.project.reservedAt)}
					onCountdownEnd={onDraftExpiration} />
			</section>
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
