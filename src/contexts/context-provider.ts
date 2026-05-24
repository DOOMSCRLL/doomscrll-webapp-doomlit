import { getContext, hasContext, setContext } from "svelte"

export default class ContextProvider<T> {
	#key: string
	#defaultValue: T

	constructor(key: string, defaultValue: T) {
		this.#key = key
		this.#defaultValue = defaultValue
	}

	setContext(data: T): T {
		return setContext(this.#key, data)
	}

	#hasContext(): boolean {
		return hasContext(this.#key)
	}

	getContext(): T {
		if (this.#hasContext()) return getContext(this.#key)
		else return this.setContext(this.#defaultValue)
	}
}
