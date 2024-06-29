// Author: Igor Dimitrijević (@igorskyflyer)

/**
 * Zero-dependency Map and RegExp based string replacer with Unicode support.
 */

function escapeRegExp(expression: string): string {
	return expression.replace(/[.*?+^$()\[\]{}\\|]/g, '\\$&')
}

/**
 * MappedReplacer class.
 */
export class MappedReplacer {
	#map: Map<string, string>
	#expression: RegExp | null

	/**
	 * Creates a new instance of MappedReplacer.
	 */
	constructor() {
		this.#map = new Map()
		this.#expression = null
	}

	#updateRules() {
		const count: number = this.rulesCount()

		if (count === 0) {
			this.#expression = new RegExp('[]', 'gu')
			return
		}

		const keyIterator: IterableIterator<string> = this.#map.keys()
		let key: IteratorResult<string, any> = keyIterator.next()
		let chars: string = ''

		while (!key.done) {
			chars += escapeRegExp(key.value)

			key = keyIterator.next()

			if (count > 1 && key && !key.done) {
				chars += '|'
			}
		}

		this.#expression = new RegExp(`${chars}`, 'gu')
	}

	/**
	 * Adds a new rule or updates the existing rule for character replacing.
	 */
	addRule(key: string, value: string): boolean {
		if (typeof key !== 'string' || typeof value !== 'string') {
			return false
		}

		this.#map.set(key, value)
		this.#updateRules()

		return true
	}

	/**
	 * Adds rules or updates the existing rules for character replacing.
	 *
	 * Passed object is a simple key-value object, i.e. { '<': '\&#60;', '>': '\&#62;' }
	 */
	addRules(rules: { [key: string]: string }): boolean {
		if (typeof rules !== 'object') {
			return false
		}

		const keys: string[] = Object.keys(rules)
		const count: number = keys.length
		let needsUpdating: boolean = false

		for (let i = 0; i < count; i++) {
			if (typeof keys[i] !== 'string' || typeof rules[keys[i]] !== 'string') {
				continue
			}

			const key: string = keys[i]
			const value: string = rules[key]

			this.#map.set(key, value)

			needsUpdating = true
		}

		if (needsUpdating) {
			this.#updateRules()
		}

		return needsUpdating
	}

	/**
	 * Removes the rule that matches the provided key.
	 */
	removeRule(key: string): boolean {
		if (typeof key !== 'string') {
			return false
		}

		const result: boolean = this.#map.delete(key)

		this.#updateRules()

		return result
	}

	/**
	 * Gets the number of rules for character replacing.
	 */
	rulesCount(): number {
		return this.#map.size
	}

	/**
	 * Clears all the rules.
	 */
	clearRules(): void {
		this.#map.clear()
		this.#updateRules()
	}

	/**
	 * Replaces the values in the input that match the keys in the Map object.
	 */
	replace(input: string): string {
		if (typeof input !== 'string' || this.#expression == null) {
			return ''
		}

		const count: number = input.length

		if (count === 0 || this.rulesCount() === 0) {
			return input || ''
		}

		if (!this.#expression.test(input)) {
			return input
		}

		let match: RegExpExecArray | null = null
		let lastIndex: number = 0
		let current: string | null = null
		let currentIndex: number = -1
		let result: string = ''

		this.#expression.lastIndex = 0

		while ((match = this.#expression.exec(input))) {
			current = match[0]
			currentIndex = match.index

			if (lastIndex < currentIndex) {
				result += input.substring(lastIndex, currentIndex)
			}

			result += this.#map.get(current)

			lastIndex = currentIndex + current.length

			if (lastIndex === count) {
				break
			}
		}

		if (lastIndex < count) {
			result += input.substring(lastIndex)
		}

		return result
	}
}
