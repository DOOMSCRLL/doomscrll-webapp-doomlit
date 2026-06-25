<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"
	import type { ProjectPreview } from "models/project"
	import type ProjectTag from "models/project-tag"
	import { hslStrToCss, stringToHsl } from "utils/string-to-hsl"

	import ProjectPreviewLabel from "./project-preview-label.svelte"

	type Props = {
		tag: ProjectTag
		projects: ProjectPreview[]
	}

	const { tag, projects }: Props = $props()

	const tagColor = $derived(hslStrToCss(stringToHsl(tag)))

	function handlePreviewHover(tag: ProjectTag, index: number): void {
		void tag
		void index
		throw Error("Not implemented yet!")
	}
</script>

<section
	style="--c: {tagColor}"
	class={[
		"flex h-full shrink-0 flex-col gap-4 overflow-hidden",
		"rounded-xl hover:p-4 hover:pb-0 hover:outline-3 hover:outline-(--c)",
	]}>
	<header class="flex flex-col items-start justify-start [&_svg]:fill-(--c)" aria-labelledby="GROUP_TAG_{tag}">
		<Icon icon="Starmark" />
		<h3 id="GROUP_TAG_{tag}" class="font-serif text-2xl font-bold wrap-break-word text-(--c) italic">
			{tag}
			<BadgeText text={projects.length.toString()} />
		</h3>
	</header>
	<ul class="flex h-full shrink-0 pretty-scrollbar flex-col items-start justify-start overflow-y-auto">
		{#each projects as p, i (p.name)}
			<ProjectPreviewLabel index={i} preview={p} onHover={handlePreviewHover} />
		{/each}
	</ul>
</section>
