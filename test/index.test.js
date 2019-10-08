const MappedReplacer = require('../index')
const assert = require('chai').assert

const htmlDocument = `
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

let mapped = null

describe('Mapped Replacer Tests', () => {
	beforeEach(() => {
		mapped = new MappedReplacer()
	})

	describe('replace()', () => {
		describe('undefined', () => {
			it('should return an empty string', () => {
				const result = mapped.replace()
				assert.isEmpty(result)
			})
		})

		describe('null', () => {
			it('should return an empty string', () => {
				const result = mapped.replace(null)
				assert.isEmpty(result)
			})
		})

		describe('""', () => {
			it('should return an empty string', () => {
				const result = mapped.replace('')
				assert.isEmpty(result)
			})
		})

		describe('<string>', () => {
			it('should return the replaced string', () => {
				mapped.addRule(':smile:', '😀')
				const result = mapped.replace('Hello world :smile:')
				assert.equal(result, 'Hello world 😀')
			})
		})

		describe('<string>', () => {
			it("shouldn't replace unsupported characters", () => {
				mapped.addRule('<', '&#60;')
				const result = mapped.replace('<a href="#">test</a>')
				assert.equal(result, '&#60;a href="#">test&#60;/a>')
			})
		})

		describe('<string>', () => {
			it('multiline support', () => {
				mapped.addRules({
					'<': '&#60;',
					'>': '&#62;',
					'"': '&#34;',
					"'": '&#39;',
					'&': '&#38;'
				})
				const result = mapped.replace(htmlDocument)
				assert.equal(
					result,
					'\n&#60;html&#62;\n\t&#60;head&#62;\n\t\t&#60;title&#62;Hello World&#60;/title&#62;\n\t&#60;/head&#62;\n\t&#60;body&#62;\n\t\t&#60;div class=&#34;test-class&#34;&#62;\n\t\t\t&#60;form action=&#34;&#34;&#62;\n\t\t\t\t&#60;input type=&#34;text&#34; placeholder=&#34;Test&#34; required&#62;\n\t\t\t&#60;/form&#62;\n\t\t&#60;/div&#62;\n\t&#60;/body&#62;\n&#60;/html&#62;\n'
				)
			})
		})
	})

	describe('addRule()', () => {
		describe("'→', '&#8594;'", () => {
			it('should use the new rule', () => {
				mapped.addRule('→', '&#8594;')
				const result = mapped.replace('a → b')
				assert.equal(result, 'a &#8594; b')
			})
		})

		describe('addRule(from, to) x 2', () => {
			it('should use the latest rule', () => {
				mapped.addRule('→', '&#0000;')
				mapped.addRule('→', '&#8594;')
				const result = mapped.replace('a → b')
				assert.equal(result, 'a &#8594; b')
			})
		})
	})

	describe('addRules()', () => {
		describe('addRules({})', () => {
			it('should use the new rules', () => {
				mapped.addRules({
					'𝕋': '&#120139;',
					'≈': '&#8776;',
					'𝔱': '&#120113;'
				})
				const result = mapped.replace('𝕋 ≈ 𝔱')
				assert.equal(result, '&#120139; &#8776; &#120113;')
			})
		})
	})

	describe('rulesCount()', () => {
		describe('default', () => {
			it('should return 0', () => {
				const result = mapped.rulesCount()
				assert.equal(result, 0)
			})
		})

		describe('rulesCount()', () => {
			it('should return 1', () => {
				mapped.addRule('→', '&#8594;')
				const result = mapped.rulesCount()
				assert.equal(result, 1)
			})
		})

		describe('rulesCount()', () => {
			it('should return 3', () => {
				mapped.addRules({
					'𝕋': '&#120139;',
					'≈': '&#8776;',
					'𝔱': '&#120113;'
				})

				const result = mapped.rulesCount()
				assert.equal(result, 3)
			})
		})
	})

	describe('clearRules()', () => {
		describe('clearRules()', () => {
			it('should return 0 when clearing the default rules', () => {
				mapped.clearRules()
				const result = mapped.rulesCount()
				assert.equal(result, 0)
			})
		})

		describe('clearRules()', () => {
			it('should return 0 when clearing the new rule', () => {
				mapped.addRule('≈', '&#8776;')
				mapped.clearRules()
				const result = mapped.rulesCount()
				assert.equal(result, 0)
			})
		})
	})

	describe('removeRule()', () => {
		describe('add a rule and remove it', () => {
			it('should return 0', () => {
				mapped.addRule('≈', '&#8776;')
				mapped.removeRule('≈')
				const result = mapped.rulesCount()
				assert.equal(result, 0)
			})
		})
	})
})
