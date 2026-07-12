<script lang="ts">
	import type { ProjectPreview } from "models/project"
	import type ProjectTag from "models/project-tag"
	import { generateColorFrom, hslStrToCss } from "utils/generate-color-from"

	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"
	import ProjectPreviewLabel from "./project-preview-label.svelte"

	type Props = {
		tag: ProjectTag
		projects: ProjectPreview[]
	}

	const { tag, projects }: Props = $props()

	const tagColor = $derived(hslStrToCss(generateColorFrom(tag)))
</script>

<section
	style="--c: {tagColor}"
	class={[
		"flex h-full w-[24ch] shrink-0 flex-col gap-4 overflow-hidden",
		"rounded-xl hover:p-4 hover:pb-0 hover:outline-3 hover:outline-(--c)",
	]}>
	<header class="flex w-full flex-col items-start justify-start [&_svg]:fill-(--c)" aria-labelledby="GROUP_TAG_{tag}">
		<Icon icon="Starmark" />
		<h3 id="GROUP_TAG_{tag}" class="font-serif text-2xl font-bold wrap-break-word text-(--c) italic">
			{tag}
			<BadgeText text={projects.length.toString()} />
		</h3>
	</header>
	<ul class="flex h-full w-full shrink-0 pretty-scrollbar flex-col items-start justify-start overflow-y-auto">
		{#each projects as p, i (p.name)}
			<ProjectPreviewLabel index={i} preview={p} />
		{/each}
	</ul>
</section>
