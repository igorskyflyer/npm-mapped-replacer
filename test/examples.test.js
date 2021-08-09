const MappedReplacer = require('../src/index.js')
const assert = require('chai').assert

describe('examples', () => {
  describe('addRule()', () => {
    it('should return "Hello world 😀"', () => {
      const mapper = new MappedReplacer()

      mapper.addRule(':smile:', '😀')
      assert.equal(mapper.replace('Hello world :smile:'), 'Hello world 😀')
    })
  })

  describe('addRules()', () => {
    it('should return "&#120139; &#8776; &#120113;"', () => {
      const mapper = new MappedReplacer()

      mapper.addRules({
        '𝕋': '&#120139;',
        '≈': '&#8776;',
        '𝔱': '&#120113;',
      })

      assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '&#120139; &#8776; &#120113;')
    })
  })

  describe('removeRule()', () => {
    it('should "𝕋 &#8776; 𝔱"', () => {
      const mapper = new MappedReplacer()

      mapper.addRule('𝕋', '&#120139;')
      mapper.addRule('≈', '&#8776;')

      mapper.removeRule('𝕋')

      assert.equal(mapper.replace('𝕋 ≈ 𝔱'), '𝕋 &#8776; 𝔱')
    })
  })

  describe('rulesCount()', () => {
    it('should return 1', () => {
      const mapper = new MappedReplacer()

      mapper.addRule('𝕋', '&#120139;')

      assert.equal(mapper.rulesCount(), 1)
    })
  })

  describe('clearRules()', () => {
    it('should return 0', () => {
      const mapper = new MappedReplacer()

      mapper.addRule('𝕋', '&#120139;')
      mapper.clearRules()

      assert.equal(mapper.rulesCount(), 0)
    })
  })

  describe('replace()', () => {
    it('should return "a &#8594; b"', () => {
      const mapper = new MappedReplacer()

      mapper.addRule('→', '&#8594;')

      assert.equal(mapper.replace('a → b'), 'a &#8594; b')
    })
  })
})
