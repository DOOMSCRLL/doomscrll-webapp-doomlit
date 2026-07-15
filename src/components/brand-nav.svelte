<script lang="ts">
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import type DDate from "utils/d-date"

	import SlabAnchor from "./buttons/slab-anchor.svelte"
	import SlabButton from "./buttons/slab-button.svelte"
	import DoomscrllWordmark from "./icons/doomscrll-wordmark.svelte"
	import Icon from "./icons/icon.svelte"
	import LanguageSelector from "./language-selector.svelte"
	import ProfileButton from "./profile-button.svelte"
	import ReservationProgress from "./reservation-progress.svelte"

	type NavComponents = {
		returnHref?: "/" | `/?year=${number}&month=${number}`
		date?: DDate
		reservationProgress?: number
		reservationLimit?: number
	}

	type Props = {
		helpModalTrigger?: HTMLButtonElement
		doomlitMenuTrigger?: HTMLButtonElement
		activeDraftRefId?: string
		hasDoomlitsMenu?: boolean
		comps?: NavComponents
	}

	let {
		helpModalTrigger = $bindable(),
		doomlitMenuTrigger = $bindable(),
		activeDraftRefId,
		hasDoomlitsMenu = false,
		comps,
	}: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common)
	const fmt = $derived(DateFmtContext.context.value!)

	const hasComps = $derived(comps !== undefined && comps.returnHref !== undefined && comps.date !== undefined)
</script>

{#snippet topbar()}
	<DoomscrllWordmark />
	<section class="flex h-min w-full items-center justify-between">
		<section class="flex gap-4">
			<LanguageSelector label={dict.navbar.ariaLabelLangSelect} />
			<SlabButton
				variant="text"
				fit="square"
				ariaLabel={dict.navbar.ariaLabelHelp}
				renderDecors={false}
				bind:reference={helpModalTrigger}><Icon icon="Help" /></SlabButton>
		</section>
		{#if activeDraftRefId}
			<SlabAnchor href="/reserve/{activeDraftRefId}">{dict.navbar.labelActiveDraftWarning}</SlabAnchor>
		{/if}
		<ProfileButton {hasDoomlitsMenu} bind:doomlitMenuTrigger />
	</section>
{/snippet}

{#if !hasComps}
	<nav class="grid w-full grid-cols-2 items-center gap-12">
		{@render topbar()}
	</nav>
{:else}
	<nav class="flex w-full flex-col gap-2">
		<section class="grid w-full grid-cols-2 items-center gap-12">{@render topbar()}</section>
		<section class="grid w-full grid-cols-[1fr_auto_1fr]">
			<SlabAnchor alignment="left" href={comps!.returnHref!} hasUnderline={true}>
				<Icon icon="ArrowBack" size="small" />
				{dict.labelReturnHome}
			</SlabAnchor>
			<div class="flex w-full items-center gap-4">
				<p class="font-mono text-xl tracking-wider uppercase">{fmt.getFullDate(comps!.date!)}</p>
				<Icon icon="Starmark" size="small" />
				<p class="font-mono text-xl font-bold tracking-widest uppercase">{fmt.getLongDayName(comps!.date!)}</p>
				{#if comps?.reservationProgress !== undefined && comps?.reservationLimit !== undefined}
					<Icon icon="Starmark" size="small" />
					<div class="flex items-center gap-2">
						<ReservationProgress current={comps.reservationProgress} max={comps.reservationLimit} />
						<p class="font-serif text-2xl font-medium tracking-tight text-inverse">
							{dict.navbar.suffixReservationProgress}
						</p>
					</div>
				{/if}
			</div>
		</section>
	</nav>
{/if}
