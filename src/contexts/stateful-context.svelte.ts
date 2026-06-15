import { createContext } from "svelte"

class ContextState<T> {
	value = $state<T>()
	constructor(initialValue?: T) {
		this.value = initialValue
	}
}

export default class StatefulContext<T> {
	#get: () => ContextState<T>
	#set: (value: ContextState<T>) => ContextState<T>

	constructor() {
		;[this.#get, this.#set] = createContext<ContextState<T>>()
	}

	initialize(initialValue?: T): ContextState<T> {
		const state = new ContextState(initialValue)
		this.#set(state)
		return state
	}

	get state(): T | undefined {
		return this.#get().value
	}

	set state(newValue: T) {
		this.#get().value = newValue
	}
}
