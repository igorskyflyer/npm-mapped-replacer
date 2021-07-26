/**
 * Zero-dependency Map and RegExp based string replacer with Unicode support.
 *
 * @author Igor Dimitrijević <igor.dvlpr@gmail.com>
 * @license MIT
 * @copyright Igor Dimitrijević, 2021.
 *
 */

function escapeRegExp(expression) {
  return expression.replace(/[.*?+^$()\[\]{}\\|]/g, '\\$&')
}

/**
 * MappedReplacer class.
 */
class MappedReplacer {
  /**
   * Creates a new instance of MappedReplacer.
   */
  constructor() {
    this.map = new Map()
    this.expression = null
  }

  /**
   * Updates the RegExp for the internal Map.
   * @private
   */
  updateRules() {
    const count = this.rulesCount()

    if (count === 0) {
      this.expression = new RegExp('[]', 'gu')
      return
    }

    const keyIterator = this.map.keys()
    let key = keyIterator.next()
    let chars = ''

    while (!key.done) {
      chars += escapeRegExp(key.value)

      key = keyIterator.next()

      if (count > 1 && key && !key.done) {
        chars += '|'
      }
    }

    this.expression = new RegExp(`${chars}`, 'gu')
  }

  /**
   * Adds a new rule or updates the existing rule for character replacing.
   * @param {string} key
   * @param {string} value
   * @return {boolean}
   */
  addRule(key, value) {
    if (typeof key !== 'string' || typeof value !== 'string') {
      return false
    }

    this.map.set(key, value)
    this.updateRules()

    return true
  }

  /**
   * Adds an array of rules or updates the existing rules for character replacing.
   *
   * Passed objects are simple key-value objects, i.e. { '<': '\&#60;' }
   * @param {Object} rules
   * @return {boolean}
   */
  addRules(rules) {
    if (typeof rules !== 'object') {
      return
    }

    const keys = Object.keys(rules)
    const count = keys.length
    let needsUpdating = false

    for (let i = 0; i < count; i++) {
      if (typeof keys[i] !== 'string' || typeof rules[keys[i]] !== 'string') {
        continue
      }

      const key = keys[i]
      const value = rules[key]

      this.map.set(key, value)

      needsUpdating = true
    }

    if (needsUpdating) {
      this.updateRules()
    }

    return needsUpdating
  }

  /**
   * Removes the rule that matches the provided key.
   * @param {string} key
   * @returns {boolean}
   */
  removeRule(key) {
    if (!(typeof key === 'string')) {
      return false
    }

    const result = this.map.delete(key)

    this.updateRules()

    return result
  }

  /**
   * Gets the number of rules for character replacing.
   * @returns {number}
   */
  rulesCount() {
    return this.map.size
  }

  /**
   * Clears all the rules.
   * @returns {void}
   */
  clearRules() {
    this.map.clear()
    this.updateRules()
  }

  /**
   * Replaces the values in the input that match the keys in the Map object.
   * @param {string} input
   * @returns {string}
   */
  replace(input) {
    if (typeof input !== 'string') {
      return ''
    } else {
      const count = input.length

      if (count === 0 || this.rulesCount() === 0) {
        return input || ''
      }

      if (!this.expression.test(input)) {
        return input
      }

      let match = null
      let lastIndex = 0
      let current = null
      let currentIndex = -1
      let result = ''

      this.expression.lastIndex = 0

      while ((match = this.expression.exec(input))) {
        current = match[0]
        currentIndex = match.index

        if (lastIndex < currentIndex) {
          result += input.substring(lastIndex, currentIndex)
        }

        result += this.map.get(current)

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
}

module.exports = MappedReplacer
