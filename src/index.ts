// Author: Igor Dimitrijević (@igorskyflyer)

import type { IOptions } from './IOptions.js'

/**
 * Zero-dependency Map and RegExp based string replacer with Unicode support.
 */
type SearchKeySingle = string
type SearchKeyMultiple = string[]
type SearchKey = SearchKeySingle | SearchKeyMultiple

type RuleSingle = { [replaceWith: string]: SearchKeySingle }
type RuleMultiple = { [replaceWith: string]: SearchKeyMultiple }
type Rule = { [replaceWith: string]: SearchKey }

const rxEscapeChars: RegExp = /[.*?+^$()[\]{}\\|]/g

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
  #strict: boolean

  longestMatchFirst: boolean

  constructor(options: IOptions = {}) {
    this.#map = new Map()
    this.#expression = null

    this.#caseSensitive = options.caseSensitive ?? true
    this.#strict = options.strict ?? false

    this.longestMatchFirst = options.longestMatchFirst ?? true
  }

  #generateAlternations(): string {
    let keys: SearchKeyMultiple = Array.from(this.#map.keys())

    if (this.longestMatchFirst) {
      keys = keys.sort(
        (a: SearchKeySingle, b: SearchKeySingle) => b.length - a.length
      )
    }

    return keys.map(escapeRegExp).join('|')
  }

  #getSearchKey(searchFor: SearchKeySingle): SearchKeySingle {
    const key: SearchKeySingle = this.#caseSensitive
      ? searchFor
      : searchFor.toLowerCase()

    return key
  }

  #addMapRule(searchFor: SearchKeySingle, replaceWith: string): boolean {
    this.#map.set(this.#getSearchKey(searchFor), replaceWith)
    return true
  }

  #addMapRules(searchFor: SearchKeyMultiple, replaceWith: string): boolean {
    let added: boolean = false

    for (const key of searchFor) {
      if (typeof key !== 'string' || key.length === 0) {
        continue
      }

      added = this.#addMapRule(key, replaceWith)
    }

    return added
  }

  #updateRules(): void {
    const count: number = this.rulesCount()

    if (count === 0) {
      this.#expression = null
      return
    }

    const alternation: string = this.#generateAlternations()
    const sensitiveFlag: string = this.#caseSensitive ? '' : 'i'

    if (this.#strict) {
      this.#expression = new RegExp(
        `(?<![\\p{L}\\p{N}_])(?:${alternation})(?![\\p{L}\\p{N}_])`,
        `gu${sensitiveFlag}`
      )
    } else {
      this.#expression = new RegExp(`(?:${alternation})`, `gu${sensitiveFlag}`)
    }
  }

  #canInsertRule(searchFor: SearchKey, updateOnly: boolean = false): boolean {
    let exists: boolean

    if (Array.isArray(searchFor)) {
      if (updateOnly) {
        exists = searchFor.every((k: SearchKeySingle) => this.hasRule(k))
      } else {
        exists = searchFor.some((k: SearchKeySingle) => this.hasRule(k))
      }
    } else {
      exists = this.hasRule(searchFor)
    }

    if (updateOnly) {
      return exists
    } else {
      return !exists
    }
  }

  #insertRule(
    replaceWith: string,
    searchFor: SearchKey,
    updateOnly: boolean = false
  ): boolean {
    if (typeof replaceWith !== 'string') {
      return false
    }

    if (typeof searchFor !== 'string' && !Array.isArray(searchFor)) {
      return false
    }

    if (!this.#canInsertRule(searchFor, updateOnly)) {
      return false
    }

    let changed: boolean = false

    if (Array.isArray(searchFor)) {
      changed = this.#addMapRules(searchFor, replaceWith)
    } else {
      if (searchFor.length === 0) {
        return false
      }

      changed = this.#addMapRule(searchFor, replaceWith)
    }

    if (changed) {
      this.#updateRules()
    }

    return changed
  }

  /**
   * Adds a new rule used in replacing a single string.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string} searchFor - The string to be replaced.
   * @returns {boolean} - Returns true if the rule was added, false otherwise.
   * @since v1.0.0
   */
  addRule(replaceWith: string, searchFor: SearchKeySingle): boolean
  /**
   * Adds a new rule for character replacement with multiple subjects.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string[]} searchFor - The array of strings to be replaced.
   * @returns {boolean} - Returns true if the rule was added, false otherwise.
   * @since v2.0.0
   */
  addRule(replaceWith: string, searchFor: SearchKeyMultiple): boolean
  addRule(replaceWith: string, searchFor: SearchKey): boolean {
    return this.#insertRule(replaceWith, searchFor, false)
  }

  /**
   * Adds rules for string replacement.
   * @param rules A simple key-value object, i.e.: { '\&#60;' : '<', '\&#62;' : '>' }.
   * @returns Returns a Boolean whether the rules were added successfully.
   * @since v1.0.0
   */
  addRules(rules: RuleSingle): boolean
  /**
   * Adds rules for string replacement.
   * @param rules A simple key-value[] object, i.e.: { '😁' : [':D', ':-D'], '😛' : [':P', ':-P'] }.
   * @returns Returns a Boolean whether the rules were added successfully.
   * @since v2.0.0
   */
  addRules(rules: RuleMultiple): boolean
  addRules(rules: Rule): boolean {
    if (typeof rules !== 'object' || rules == null) {
      return false
    }

    const keys: SearchKeyMultiple = Object.keys(rules)
    let needsUpdating: boolean = false

    for (const replace of keys) {
      if (typeof replace !== 'string') {
        continue
      }

      const search: SearchKey = rules[replace]

      if (Array.isArray(search)) {
        needsUpdating = this.#addMapRules(search, replace)
      } else if (typeof search === 'string') {
        if (search.length === 0) {
          continue
        }

        needsUpdating = this.#addMapRule(search, replace)
      }
    }

    if (needsUpdating) {
      this.#updateRules()
    }

    return needsUpdating
  }

  /**
   * Updates an existing rule used in replacing a single string.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string} searchFor - The string to be replaced.
   * @returns {boolean} - Returns true if the rule was updated, false otherwise.
   * @since v3.0.0
   */
  updateRule(replaceWith: string, searchFor: SearchKeySingle): boolean
  /**
   * Updates an existing rule for character replacement with multiple subjects.
   *
   * @param {string} replaceWith - The string to replace the `searchFor` with.
   * @param {string[]} searchFor - The array of strings to be replaced.
   * @returns {boolean} - Returns true if the rule was updated, false otherwise.
   * @since v3.0.0
   */
  updateRule(replaceWith: string, searchFor: SearchKeyMultiple): boolean
  updateRule(replaceWith: string, searchFor: SearchKey): boolean {
    return this.#insertRule(replaceWith, searchFor, true)
  }

  /**
   * Checks whether a rule is present in the Map.
   * @param searchFor The rule to check for.
   * @returns A Boolean indicating the existence of
   * the given rule.
   * @since v2.2.0
   */
  hasRule(searchFor: SearchKey): boolean {
    if (typeof searchFor !== 'string') {
      return false
    }

    return this.#map.has(this.#getSearchKey(searchFor))
  }

  /**
   * Removes the rule that matches the provided value.
   * @param searchFor The rule to remove.
   * @since v1.0.0
   */
  removeRule(searchFor: SearchKeySingle): boolean {
    if (typeof searchFor !== 'string') {
      return false
    }

    const key: SearchKeySingle = this.#getSearchKey(searchFor)

    if (this.#map.delete(key)) {
      this.#updateRules()
      return true
    }

    return false
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
   * @since v1.0.0
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
    if (typeof input !== 'string') {
      return ''
    }

    if (this.#expression == null) {
      return input
    }

    const count: number = input.length

    if (count === 0 || this.rulesCount() === 0) {
      return input
    }

    this.#expression.lastIndex = 0

    let match: RegExpExecArray | null = this.#expression.exec(input)
    let lastIndex: number = 0
    let result: string = ''

    while (match) {
      const currentKey: string = match[0]
      const currentIndex: number = match.index

      if (lastIndex < currentIndex) {
        result += input.substring(lastIndex, currentIndex)
      }

      const key: SearchKeySingle = this.#getSearchKey(currentKey)

      result += this.#map.get(key) ?? currentKey
      lastIndex = currentIndex + currentKey.length

      if (lastIndex === count) {
        return result
      }

      match = this.#expression.exec(input)
    }

    if (lastIndex < count) {
      result += input.substring(lastIndex)
    }

    return result
  }
}
