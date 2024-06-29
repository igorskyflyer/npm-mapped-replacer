// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, suite, test } from 'vitest'
import { MappedReplacer } from '../src/index.mjs'

let mapper: MappedReplacer

describe('examples', () => {
	beforeEach(() => {
		mapper = new MappedReplacer()
	})

	suite('addRule()', () => {
		test('should return "Hello world 😀"', () => {
			mapper.addRule(':smile:', '😀')

			assert.equal(mapper.replace('Hello world :smile:'), 'Hello world 😀')
		})
	})

	suite('addRules()', () => {
		test('should return "&#120139; &#8776; &#120113;"', () => {
			mapper.addRules({
				𝕋: '&#120139;',
				'≈': '&#8776;',
				𝔱: '&#120113;'
			})

			assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '&#120139; &#8776; &#120113;')
		})
	})

	suite('removeRule()', () => {
		test('should "𝕋 &#8776; 𝔱"', () => {
			mapper.addRule('𝕋', '&#120139;')
			mapper.addRule('≈', '&#8776;')

			mapper.removeRule('𝕋')

			assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '𝕋 &#8776; 𝔱')
		})
	})

	suite('rulesCount()', () => {
		test('should return 1', () => {
			mapper.addRule('𝕋', '&#120139;')

			assert.equal(mapper.rulesCount(), 1)
		})
	})

	suite('clearRules()', () => {
		test('should return 0', () => {
			mapper.addRule('𝕋', '&#120139;')
			mapper.clearRules()

			assert.equal(mapper.rulesCount(), 0)
		})
	})

	suite('replace()', () => {
		test('should return "a &#8594; b"', () => {
			mapper.addRule('→', '&#8594;')

			assert.equal(mapper.replace('a → b'), 'a &#8594; b')
		})
	})
})
