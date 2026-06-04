export default function toOptValue(value: string): string {
	return value.toLocaleLowerCase().replace(/[\s.]/g, "-")
}
