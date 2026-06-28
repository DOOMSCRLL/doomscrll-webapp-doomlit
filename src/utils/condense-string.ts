function cstr(strings: TemplateStringsArray, ...values: unknown[]): string {
	return String.raw({ raw: strings }, ...values)
		.replace(/\s+/g, " ")
		.trim()
}

export default cstr
