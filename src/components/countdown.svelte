<script lang="ts">
	import ProgressIndicator from "./progress-indicator.svelte"

	type Props = {
		startTimestamp: Date
		durationMins: number
		onCountdownTick?: (remainingSecs: number) => void
		onCountdownEnd?: () => void
	}

	const DELAY_TICK_MS = 1000

	const { startTimestamp, durationMins, onCountdownTick, onCountdownEnd }: Props = $props()

	let timestamp = $state<string>("00:00")
	let progress = $state<number>(100)

	function startCountdown(): () => void {
		let intervalId: ReturnType<typeof setInterval>
		const cdEndMs = startTimestamp.getTime() + durationMins * 60 * 1000

		function tick() {
			const nowMs = Date.now()
			const remainingSecs = Math.max(0, Math.floor((cdEndMs - nowMs) / 1000))
			progress = (remainingSecs / (durationMins * 60)) * 100

			const tickMins = Math.floor(remainingSecs / 60)
			const tickSecs = remainingSecs % 60

			timestamp = `${String(tickMins).padStart(2, "0")}:${String(tickSecs).padStart(2, "0")}`
			onCountdownTick?.(remainingSecs)

			if (intervalId !== undefined && remainingSecs <= 0) {
				onCountdownEnd?.()
				clearInterval(intervalId)
			}
		}

		tick()
		intervalId = setInterval(tick, DELAY_TICK_MS)

		return () => clearInterval(intervalId)
	}

	$effect(() => startCountdown())
</script>

<ProgressIndicator {progress} label={timestamp} />
