function hashCode(str: string): number {
	let hash = 0
	for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
	return Math.abs(hash)
}

type ColorOptions = {
	saturation?: number
	lightness?: number
}

type HSL = {
	h: number
	s: number
	l: number
}

export function generateHslFrom(str: string, options: ColorOptions = {}): HSL {
	const hash = hashCode(str)

	const h = hash % 360
	const s = options.saturation ?? 65
	const l = options.lightness ?? 50

	return { h, s, l }
}

export function hslStrToCss(hsl: HSL): string {
	const l = Math.min(100, Math.max(0, hsl.l))
	return `hsl(${hsl.h} ${hsl.s}% ${l}%)`
}
