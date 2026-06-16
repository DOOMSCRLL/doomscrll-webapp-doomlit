<script>
	import { DateFmtContext, LocaleContext } from "../src/contexts/shared.svelte"
	import StylisticTimeFormat from "../src/utils/stylistic-time-fmt"

	let { children } = $props()

	LocaleContext.initialize("en")
	DateFmtContext.initialize(new StylisticTimeFormat("en"))
</script>

{@render children?.()}
