type AvatarSwatch = {
	background: string
	accent1: string
	accent2: string
}

export function generateAvatarSwatchFrom(uuidV4: string): AvatarSwatch {
	const stripUuid = uuidV4.replace(/-/g, "")

	const chunkBg = stripUuid.substring(0, 8)
	const chunk1 = stripUuid.substring(8, 16)
	const chunk2 = stripUuid.substring(16, 24)

	const hueBg = parseInt(chunkBg, 16) % 360
	const hue1 = parseInt(chunk1, 16) % 360
	const hue2 = parseInt(chunk2, 16) % 360

	return {
		background: `hsl(${hueBg}, 35%, 15%)`,
		accent1: `hsl(${hue1}, 85%, 65%)`,
		accent2: `hsl(${hue2}, 75%, 80%)`,
	}
}

export function applySwatchToTokens(swatch: AvatarSwatch): void {
	if (typeof document === "undefined" || !document.documentElement) return

	const rootStyle = document.documentElement.style

	rootStyle.setProperty("--avatar-background", swatch.background)
	rootStyle.setProperty("--avatar-accent-1", swatch.accent1)
	rootStyle.setProperty("--avatar-accent-2", swatch.accent2)
}
