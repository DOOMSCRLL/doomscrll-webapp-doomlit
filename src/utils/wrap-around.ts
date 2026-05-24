export default function wrapAround(value: number, min: number, max: number): number {
	const range = max - min + 1
	return ((((value - min) % range) + range) % range) + min
}
