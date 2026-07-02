export function sortByStringProp<T>(values: T[], key: keyof T): T[] {
	return [...values].sort((a, b) => String(a[key]).localeCompare(String(b[key]), undefined, { sensitivity: "base" }))
}
