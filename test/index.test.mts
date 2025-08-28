// Author: Igor Dimitrijević (@igorskyflyer)

import { assert, beforeEach, describe, suite, test } from 'vitest'
import { MappedReplacer } from '../src/index.mjs'

const htmlDocument: string = `
<html>
	<head>
		<title>Hello World</title>
	</head>
	<body>
		<div class="test-class">
			<form action="">
				<input type="text" placeholder="Test" required>
			</form>
		</div>
	</body>
</html>
`

let mapper: MappedReplacer

describe('🧪 Mapped Replacer tests 🧪', () => {
  beforeEach(() => {
    mapper = new MappedReplacer()
  })

  suite('replace()', () => {
    suite('undefined', () => {
      test('#1 should return an empty string', () => {
        // @ts-expect-error
        const result: string = mapper.replace()

        assert.isEmpty(result)
      })
    }) // #1

    suite('null', () => {
      test('# 2 should return an empty string', () => {
        // @ts-expect-error
        const result: string = mapper.replace(null)

        assert.isEmpty(result)
      }) // #2
    })

    suite('""', () => {
      test('#3 should return an empty string', () => {
        const result: string = mapper.replace('')

        assert.isEmpty(result)
      }) // #3
    })

    suite('<string>', () => {
      test('#4 should return the replaced string', () => {
        mapper.addRule('😀', ':smile:')

        const result: string = mapper.replace('Hello world :smile:')

        assert.equal(result, 'Hello world 😀')
      }) // #4

      test('#5 should return the replaced string', () => {
        const insensitiveMapper: MappedReplacer = new MappedReplacer({
          caseSensitive: false
        })
        insensitiveMapper.addRule('😀', ':smile:')

        const result: string = insensitiveMapper.replace('Hello world :SmIlE:')

        assert.equal(result, 'Hello world 😀')
      }) // #5

      test('#6 should return the replace string', () => {
        const strictMapper: MappedReplacer = new MappedReplacer({
          strict: true
        })
        strictMapper.addRule('😀', 'e')

        const result: string = strictMapper.replace('Hello woerled e')

        assert.equal(result, 'Hello woerled 😀')
      }) // #6
    })

    suite('<string>', () => {
      test("#7 shouldn't replace unsupported characters", () => {
        mapper.addRule('&#60;', '<')

        const result: string = mapper.replace('<a href="#">test</a>')

        assert.equal(result, '&#60;a href="#">test&#60;/a>')
      }) // #7
    })

    suite('<string>', () => {
      test('#8 multiline support', () => {
        mapper.addRules({
          '&#60;': '<',
          '&#62;': '>',
          '&#34;': '"',
          '&#39;': "'",
          '&#38;': '&'
        })

        const result: string = mapper.replace(htmlDocument)

        assert.equal(
          result,
          '\n&#60;html&#62;\n\t&#60;head&#62;\n\t\t&#60;title&#62;Hello World&#60;/title&#62;\n\t&#60;/head&#62;\n\t&#60;body&#62;\n\t\t&#60;div class=&#34;test-class&#34;&#62;\n\t\t\t&#60;form action=&#34;&#34;&#62;\n\t\t\t\t&#60;input type=&#34;text&#34; placeholder=&#34;Test&#34; required&#62;\n\t\t\t&#60;/form&#62;\n\t\t&#60;/div&#62;\n\t&#60;/body&#62;\n&#60;/html&#62;\n'
        )
      }) // #8
    })
  })

  suite('addRule()', () => {
    suite("'→', '&#8594;'", () => {
      test('#9 should use the new rule', () => {
        mapper.addRule('&#8594;', '→')

        const result: string = mapper.replace('a → b')

        assert.equal(result, 'a &#8594; b')
      }) // #9
    })

    suite('addRule(from, to) x 2', () => {
      test('#10 should use the latest rule', () => {
        mapper.addRule('&#0000;', '→')
        mapper.updateRule('&#8594;', '→')

        const result: string = mapper.replace('a → b')

        assert.equal(result, 'a &#8594; b')
      }) // #10
    })
  })

  suite('addRules()', () => {
    suite('addRules({})', () => {
      test('#11 should use the new rules', () => {
        mapper.addRules({
          '&#120139;': '𝕋',
          '&#8776;': '≈',
          '&#120113;': '𝔱'
        })

        const result: string = mapper.replace('𝕋 ≈ 𝔱')

        assert.equal(result, '&#120139; &#8776; &#120113;')
      }) // #11
    })

    suite('addRules({string[]: string})', () => {
      test('#12 should use the new rules', () => {
        mapper.addRules({
          '&#120139;': '𝕋',
          '&#8776;': '≈',
          '&#120113;': '𝔱'
        })

        const result: string = mapper.replace('𝕋 ≈ 𝔱')

        assert.equal(result, '&#120139; &#8776; &#120113;')
      }) // #12
    })
  })

  suite('rulesCount()', () => {
    suite('default', () => {
      test('#13 should return 0', () => {
        const result: number = mapper.rulesCount()

        assert.equal(result, 0)
      }) // #13
    })

    suite('rulesCount()', () => {
      test('#14 should return 1', () => {
        mapper.addRule('→', '&#8594;')

        const result: number = mapper.rulesCount()

        assert.equal(result, 1)
      }) // #14
    })

    suite('rulesCount()', () => {
      test('#15 should return 3', () => {
        mapper.addRules({
          𝕋: '&#120139;',
          '≈': '&#8776;',
          𝔱: '&#120113;'
        })

        const result: number = mapper.rulesCount()

        assert.equal(result, 3)
      }) // #15
    })
  })

  suite('clearRules()', () => {
    suite('#16 clearRules()', () => {
      test('should return 0 when clearing the default rules', () => {
        mapper.clearRules()

        const result: number = mapper.rulesCount()

        assert.equal(result, 0)
      }) // #16
    })

    suite('clearRules()', () => {
      test('#17 should return 0 when clearing the new rule', () => {
        mapper.addRule('≈', '&#8776;')
        mapper.clearRules()

        const result: number = mapper.rulesCount()

        assert.equal(result, 0)
      }) // #17
    })
  })

  suite('removeRule()', () => {
    suite('add a rule and remove it', () => {
      test('#18 should return 0', () => {
        mapper.addRule('&#8776;', '≈')
        mapper.removeRule('≈')

        const result: number = mapper.rulesCount()

        assert.equal(result, 0)
      }) // #18
    })
  })

  suite('hasRule()', () => {
    suite('case-sensitive + true', () => {
      test('#19 should return true', () => {
        mapper.addRule('&#8594;', 'a')

        const result: boolean = mapper.hasRule('a')

        assert.isTrue(result)
      }) // #19
    })

    suite('case-insensitive + true', () => {
      test('#20 should return true', () => {
        const insensitiveMapper: MappedReplacer = new MappedReplacer({
          caseSensitive: false
        })
        insensitiveMapper.addRule('&#8594;', 'a')

        const result: boolean = insensitiveMapper.hasRule('A')

        assert.isTrue(result)
      }) // #20
    })

    suite('case-sensitive + false', () => {
      test('#21 should return false', () => {
        mapper.addRule('&#8594;', 'a')

        const result: boolean = mapper.hasRule('b')

        assert.isFalse(result)
      }) // #21
    })

    suite('case-insensitive + false', () => {
      test('#22 should return false', () => {
        const insensitiveMapper: MappedReplacer = new MappedReplacer({
          caseSensitive: false
        })
        insensitiveMapper.addRule('&#8594;', 'a')

        const result: boolean = insensitiveMapper.hasRule('B')

        assert.isFalse(result)
      }) // #22
    })
  })
})
