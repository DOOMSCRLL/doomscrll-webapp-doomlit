export const MARKER_NEWLINE = "__MARKS_NEWLINE__"

function cstr(strings: TemplateStringsArray, ...values: unknown[]): string {
	return String.raw({ raw: strings }, ...values)
		.replace(/\s+/g, " ")
		.replace(new RegExp(MARKER_NEWLINE, "g"), "\n")
		.trim()
}

export default cstr
