<script lang="ts">
	import BadgeText from "comps/badge-text.svelte"
	import Icon from "comps/icons/icon.svelte"
	import type Project from "models/project"
	import type ProjectTag from "models/project-tag"
	import { hslStrToCss, stringToHsl } from "utils/string-to-hsl"

	type Props = {
		tag: ProjectTag
		projects: Project[]
	}

	const { tag, projects }: Props = $props()

	const tagColor = $derived(hslStrToCss(stringToHsl(tag)))
</script>

<section
	style="--c: {tagColor}"
	class={["flex h-full w-min flex-col overflow-hidden", "hover:p-4 hover:pb-0 hover:outline-3 hover:outline-(--c)"]}>
	<header class="flex flex-col items-start justify-start" aria-labelledby="GROUP_TAG_{tag}">
		<Icon icon="Starmark" size="small" />
		<h3 id="GROUP_TAG_{tag}" class="font-serif text-2xl font-bold text-(--c) italic">
			{tag}
			<BadgeText text={projects.length.toString()} />
		</h3>
	</header>
	<ul class="flex h-full w-min pretty-scrollbar flex-col items-start justify-start overflow-y-auto"></ul>
</section>
