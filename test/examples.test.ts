// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, suite, test } from 'vitest'
import { MappedReplacer } from '../src/index.ts'

let mapper: MappedReplacer

describe('examples', () => {
  beforeEach(() => {
    mapper = new MappedReplacer()
  })

  suite('addRule()', () => {
    test('#1 should return "Hello world 😀"', () => {
      mapper.addRule('😀', ':smile:')

      assert.equal(mapper.replace('Hello world :smile:'), 'Hello world 😀')
    }) // #1

    test('#2 should return "Hello world 😀 😀"', () => {
      mapper.addRule('😀', [':smile:', ':D'])

      assert.equal(
        mapper.replace('Hello world :smile: :D'),
        'Hello world 😀 😀'
      )
    }) // #2
  })

  suite('updateRule()', () => {
    test('#3 should return "Hello world 😀"', () => {
      mapper.addRule('🤨', ':smile:')
      mapper.updateRule('😀', ':smile:')

      assert.equal(mapper.replace('Hello world :smile:'), 'Hello world 😀')
    }) // #3

    test('#4 should return "Hello world 😀 😀"', () => {
      mapper.addRule('🤨', [':smile:', ':D'])
      mapper.updateRule('😀', [':smile:', ':D'])

      assert.equal(
        mapper.replace('Hello world :smile: :D'),
        'Hello world 😀 😀'
      )
    }) // #4
  })

  suite('addRules()', () => {
    test('#5 should return "&#120139; &#8776; &#120113;"', () => {
      mapper.addRules({
        '&#120139;': '𝕋',
        '&#8776;': '≈',
        '&#120113;': '𝔱'
      })

      assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '&#120139; &#8776; &#120113;')
    }) // #5
  })

  suite('removeRule()', () => {
    test('#6 should "𝕋 &#8776; 𝔱"', () => {
      mapper.addRule('&#120139;', '𝕋')
      mapper.addRule('&#8776;', '≈')

      mapper.removeRule('𝕋')

      assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '𝕋 &#8776; 𝔱')
    }) // #6
  })

  suite('rulesCount()', () => {
    test('#7 should return 1', () => {
      mapper.addRule('&#120139;', '𝕋')

      assert.equal(mapper.rulesCount(), 1)
    }) // #7
  })

  suite('clearRules()', () => {
    test('#8 should return 0', () => {
      mapper.addRule('&#120139;', '𝕋')
      mapper.clearRules()

      assert.equal(mapper.rulesCount(), 0)
    }) // #8
  })

  suite('replace()', () => {
    test('#9 should return "a &#8594; b"', () => {
      mapper.addRule('&#8594;', '→')

      assert.equal(mapper.replace('a → b'), 'a &#8594; b')
    }) // #9
  })
})
