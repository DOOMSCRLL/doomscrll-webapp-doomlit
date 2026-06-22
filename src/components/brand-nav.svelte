<script lang="ts">
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import type DDate from "utils/d-date"

	import IconButton from "./buttons/icon-button.svelte"
	import SlabButton from "./buttons/slab-button.svelte"
	import DoomscrllWordmark from "./icons/doomscrll-wordmark.svelte"
	import Icon from "./icons/icon.svelte"
	import InlineDoomlitIndicator from "./inline-doomlit-indicator.svelte"
	import LanguageSelector from "./language-selector.svelte"
	import ProfileButton from "./profile-button.svelte"

	type NavComponents = {
		returnHref?: `/?year=${number}&month=${number}`
		date?: DDate
		reservationProgress?: number
		reservationLimit?: number
	}

	type Props = {
		helpModalTrigger?: HTMLButtonElement
		comps?: NavComponents
	}

	let { helpModalTrigger = $bindable(), comps }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.navbar)
	const fmt = $derived(DateFmtContext.context.value!)

	const hasComps = $derived(comps !== undefined && comps.returnHref !== undefined && comps.date !== undefined)
</script>

{#snippet topbar()}
	<DoomscrllWordmark />
	<section class="flex h-min w-full items-center justify-between">
		<section class="flex gap-4">
			<LanguageSelector label={dict.ariaLabelLangSelect} />
			<IconButton icon="Help" variant="text" renderDecors={false} bind:reference={helpModalTrigger} />
		</section>
		<ProfileButton />
	</section>
{/snippet}

{#if !hasComps}
	<nav class="grid w-full grid-cols-2 items-center gap-12">
		{@render topbar()}
	</nav>
{:else}
	<nav class="flex w-full flex-col gap-2">
		<section class="grid w-full grid-cols-2 bg-[yellow]">{@render topbar()}</section>
		<section class="grid w-full grid-cols-[1fr_auto_1fr]">
			<SlabButton>MISSING_RETURN_LABEL</SlabButton>
			<div>
				<p>{fmt.getFullDate(comps!.date!)}</p>
				<Icon icon="Starmark" size="small" />
				<p>{fmt.getLongDayName(comps!.date!)}</p>
				{#if comps?.reservationProgress !== undefined && comps?.reservationLimit !== undefined}
					<Icon icon="Starmark" size="small" />
					<div>
						<InlineDoomlitIndicator current={comps.reservationProgress} max={comps.reservationLimit} />
						<p>{dict.suffixReservationProgress}</p>
					</div>
				{/if}
			</div>
		</section>
	</nav>
{/if}
