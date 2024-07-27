// Author: Igor Dimitrijević (@igorskyflyer)

import type { IOptions } from './IOptions.js'

// https://en.wikipedia.org/wiki/List_of_emoticons

/**
 * Zero-dependency Map and RegExp based string replacer with Unicode support.
 */

type RuleSingle = { [replaceWith: string]: string }
type RuleMultiple = { [replaceWith: string]: string[] }
type Rule = { [replaceWith: string]: string | string[] }

const rxEscapeChars: RegExp = /[.*?+^$()\[\]{}\\|]/g

function escapeRegExp(expression: string): string {
  return expression.replace(rxEscapeChars, '\\$&')
}

/**
 * MappedReplacer class.
 * @since v1.0.0
 */
export class MappedReplacer {
  #map: Map<string, string>
  #expression: RegExp | null
  #caseSensitive: boolean

  /**
   * Creates a new instance of MappedReplacer.
   */
  constructor(options: IOptions = {}) {
    this.#map = new Map()
    this.#expression = null
    this.#caseSensitive = options.caseSensitive ?? true
  }

  #addMapRule(replaceWith: string, searchFor: string): void {
    if (this.#caseSensitive) {
      this.#map.set(replaceWith, searchFor)
    } else {
      this.#map.set(replaceWith.toLowerCase(), searchFor.toLowerCase())
    }
  }

  #addMultipleRules(replaceWith: string, searchFor: string[]): boolean {
    const searchCount: number = searchFor.length

    if (searchCount === 0) {
      return false
    }

    for (let j = 0; j < searchCount; j++) {
      if (typeof searchFor[j] !== 'string') {
        continue
      }

      this.#addMapRule(searchFor[j], replaceWith)
    }

    return true
  }

  #updateRules() {
    const count: number = this.rulesCount()

    if (count === 0) {
      this.#expression = null
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

    let sensitiveFlag: string = ''

    if (!this.#caseSensitive) {
      sensitiveFlag = 'i'
    }

    this.#expression = new RegExp(`${chars}`, `gu${sensitiveFlag}`)
  }

  /**
   * Adds a new rule or updates an existing rule used in replacing a single string.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string} searchFor - The string to be replaced.
   * @returns {boolean} - Returns true if the rule was added or updated successfully, false otherwise.
   * @since v1.0.0
   */
  addRule(replaceWith: string, searchFor: string): boolean

  /**
   * Adds a new rule or updates an existing rule for character replacement with multiple subjects.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string[]} searchFor - The array of strings to be replaced.
   * @returns {boolean} - Returns true if the rule was added or updated successfully, false otherwise.
   * @since v2.0.0
   */
  addRule(replaceWith: string, searchFor: string[]): boolean

  addRule(replaceWith: string, searchFor: string | string[]): boolean {
    if (typeof replaceWith !== 'string') {
      return false
    }

    if (typeof searchFor !== 'string' && !Array.isArray(searchFor)) {
      return false
    }

    if (Array.isArray(searchFor)) {
      const result: boolean = this.#addMultipleRules(replaceWith, searchFor)
      this.#updateRules()

      return result
    }

    this.#addMapRule(searchFor, replaceWith)
    this.#updateRules()

    return true
  }

  /**
   * Adds or updates the rules for string replacement.
   * @param rules A simple key-value object, i.e.: { '\&#60;' : '<', '\&#62;' : '>' }.
   * @returns Returns a Boolean whether the rules were added/updated successfully.
   * @since v1.0.0
   */
  addRules(rules: RuleSingle): boolean
  /**
   * Adds or updates the rules for string replacement.
   * @param rules A simple key-value[] object, i.e.: { '😁' : [':D', ':-D'], '😛' : [':P', ':-P'] }.
   * @returns Returns a Boolean whether the rules were added/updated successfully.
   * @since v2.0.0
   */
  addRules(rules: RuleMultiple): boolean
  addRules(rules: Rule): boolean {
    if (typeof rules !== 'object') {
      return false
    }

    const keys: string[] = Object.keys(rules)
    const count: number = keys.length
    let needsUpdating: boolean = false

    for (let i = 0; i < count; i++) {
      if (typeof keys[i] !== 'string') {
        continue
      }

      const replace: string = keys[i]
      const search: string | string[] = rules[replace]

      if (typeof search !== 'string' && !Array.isArray(search)) {
        continue
      }

      if (Array.isArray(search)) {
        this.#addMultipleRules(replace, search)
      } else if (typeof search === 'string') {
        this.#addMapRule(search, replace)
      }

      needsUpdating = true
    }

    if (needsUpdating) {
      this.#updateRules()
    }

    return needsUpdating
  }

  /**
   * Removes the rule that matches the provided value.
   * @param searchFor The rule to remove.
   * @since v1.0.0
   */
  removeRule(searchFor: string): boolean {
    if (typeof searchFor !== 'string') {
      return false
    }

    const result: boolean = this.#map.delete(searchFor)

    this.#updateRules()

    return result
  }

  /**
   * Gets the number of rules for string replacing.
   * @since v1.0.0
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
   * Replaces the values in the input with the values from the Map.
   * @param input The input string.
   * @since v1.0.0
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

    this.#expression.lastIndex = -1

    let match: RegExpExecArray | null = this.#expression.exec(input)
    let lastIndex: number = 0
    let current: string | null = null
    let currentIndex: number = -1
    let result: string = ''

    while (match) {
      current = match[0]
      currentIndex = match.index

      if (lastIndex < currentIndex) {
        result += input.substring(lastIndex, currentIndex)
      }

      if (this.#caseSensitive) {
        result += this.#map.get(current)
      } else {
        result += this.#map.get(current.toLowerCase())
      }

      lastIndex = currentIndex + current.length

      if (lastIndex === count) {
        break
      }

      match = this.#expression.exec(input)
    }

    if (lastIndex < count) {
      result += input.substring(lastIndex)
    }

    return result
  }
}
