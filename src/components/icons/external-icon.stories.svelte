<script lang="ts" module>
	import { defineMeta } from "@storybook/addon-svelte-csf"
	import { PLATFORMS } from "const/platforms"
	import ExternalIcon from "./external-icon.svelte"

	const { Story } = defineMeta({
		title: "Iconography/External Brand Icon",
		component: ExternalIcon,
		argTypes: { platform: { control: "select", options: Object.keys(PLATFORMS).sort() } },
	})
</script>

<Story name="Local_Steam" args={{ platform: "steam" }} />
<Story name="Local_itch.io" args={{ platform: "itchio" }} />
<Story name="Local_YouTube" args={{ platform: "youtube" }} />
<Story name="Local_Play Store" args={{ platform: "playStore" }} />
<Story name="CDN_Amazon" args={{ platform: "amazon" }} />
<Story name="CDN_Spotify" args={{ platform: "spotify" }} />
<Story name="CDN_Kickstarter" args={{ platform: "kickstarter" }} />
