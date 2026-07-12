<script lang="ts">
	import { LocaleContext } from "contexts/shared.svelte"
	import { getDictionaryOf } from "repos/locale-repo"
	import IconButton from "./buttons/icon-button.svelte"
	import SlabButton from "./buttons/slab-button.svelte"

	type Props = {
		content: string
	}

	const { content }: Props = $props()

	const dict = $derived(getDictionaryOf(LocaleContext.context.value!).common.copyableText)
	let status = $state("")

	async function copyText() {
		try {
			await navigator.clipboard.writeText(content)
			status = dict.status.labelCopied
		} catch (error) {
			console.error("Failed to copy the contents to clipboard: ", error)
			status = dict.status.labelFailed
		} finally {
			setTimeout(() => (status = ""), 1000)
		}
	}
</script>

<div class="flex gap-2">
	<SlabButton hasAccent={true} variant="text" onClick={copyText}>{content}</SlabButton>
	<IconButton icon="Copy" size="small" onClick={copyText} />
	<p class="sr-only" aria-live="polite">{status}</p>
	<p class="sr-only">{dict.labelInstructions}</p>
</div>
