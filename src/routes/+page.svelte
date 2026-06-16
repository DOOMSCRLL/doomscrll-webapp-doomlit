<script lang="ts">
	import { DateFmtContext, LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import DDate from "utils/d-date"

	import SlabButton from "comps/buttons/slab-button.svelte"
	import CalendarAnchor from "comps/calendar/calendar-anchor.svelte"
	import CalendarTable from "comps/calendar/calendar-table.svelte"
	import DoomscrllWordmark from "comps/icons/doomscrll-wordmark.svelte"
	import Icon from "comps/icons/icon.svelte"
	import InlineDoomlitIndicator from "comps/inline-doomlit-indicator.svelte"
	import ProfileButton from "comps/profile-button.svelte"

	const dict = getDictionaryOf(LocaleContext.context.value).reservation
	const fmt = DateFmtContext.context.value!

	const date = $state(DDate.today())
	// TODO: Add handling for next month, and previous month when month changes.
	// TODO: Add fetching for project progress for month.
	// TODO: Add profile state.
</script>

<svelte:head>
	<title>{dict.meta.title}</title>
	<meta name="description" content={dict.meta.description} />
</svelte:head>

<main class="grid h-screen w-full grid-cols-2 gap-4 overflow-hidden px-4 supports-[height:100dvh]:h-dvh">
	<section class="flex flex-col items-start justify-between pb-4">
		<DoomscrllWordmark />

		<p class="font-serif text-2xl font-medium tracking-tighter">{dict.copy}</p>
		<CalendarTable month={date.month} year={date.year} />

		<CalendarAnchor month={date.month + 1} year={date.year} onClick={() => {}} />
	</section>

	<section class="flex flex-col justify-between py-4">
		<div class="flex w-full justify-end">
			<ProfileButton />
		</div>

		<section class="flex flex-col gap-8">
			<div class="flex flex-col items-center justify-center gap-4">
				<p class="font-mono text-2xl tracking-widest uppercase">{fmt.getFullDate(date)}</p>
				<p class="font-mono text-xl font-bold tracking-widest uppercase">{fmt.getLongDayName(date)}</p>
			</div>
			<div class="flex w-full justify-center gap-2">
				<InlineDoomlitIndicator current={36} max={256} />
				<p class="font-serif text-2xl font-medium tracking-tight text-inverse">{dict.cta.suffixSlotInfo}</p>
			</div>
			<div class="flex flex-col gap-2">
				<SlabButton alignment="center" fit="max" variant="outlined">
					<Icon icon="Doomeye" />
					{dict.cta.labelPreview}
				</SlabButton>
				<SlabButton alignment="center" fit="max" variant="filled">
					<Icon icon="Purchase" />
					{dict.cta.labelReserve}
				</SlabButton>
			</div>
		</section>

		<ol role="list" class="super-markers font-serif text-2xl font-medium tracking-tight break-normal">
			{#each Object.values(dict.disclaimer) as d (d)}<li>{d}</li>{/each}
		</ol>
	</section>
</main>
