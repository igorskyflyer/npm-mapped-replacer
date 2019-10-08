const Benchmark = require('benchmark')
const Beautifier = require('beautify-benchmark')
const MappedReplacer = require('../index')

const suite = new Benchmark.Suite()

global.MappedReplacer = MappedReplacer

suite.add('replace(undefined)', {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
	},
	fn: () => {
		mappedReplacer.replace(undefined)
	}
})

suite.add('replace(null)', {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
	},
	fn: () => {
		mappedReplacer.replace(null)
	}
})

suite.add("replace('')", {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
	},
	fn: () => {
		mappedReplacer.replace('')
	}
})

suite.add("replace('a')", {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
	},
	fn: () => {
		mappedReplacer.replace('a')
	}
})

suite.add("replace('abcdefg')", {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
	},
	fn: () => {
		mappedReplacer.replace('abcdefg')
	}
})

suite.add("replace('<')", {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
		mappedReplacer.addRules({
			'<': '&#60;',
			'>': '&#62;',
			'"': '&#34;',
			"'": '&#39;',
			'&': '&#38;'
		})
	},
	fn: () => {
		mappedReplacer.replace('<')
	}
})

suite.add("replace('<em></em>')", {
	setup: () => {
		let mappedReplacer = new MappedReplacer()
		mappedReplacer.addRules({
			'<': '&#60;',
			'>': '&#62;',
			'"': '&#34;',
			"'": '&#39;',
			'&': '&#38;'
		})
	},
	fn: () => {
		mappedReplacer.replace('<em></em>')
	}
})

suite
	.add('encode a small document', {
		setup: () => {
			const smallDocument = `
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
			</html>`

			let mappedReplacer = new MappedReplacer()
			mappedReplacer.addRules({
				'<': '&#60;',
				'>': '&#62;',
				'"': '&#34;',
				"'": '&#39;',
				'&': '&#38;'
			})
		},
		fn: () => {
			mappedReplacer.replace(smallDocument)
		}
	})
	.on('cycle', event => {
		Beautifier.add(event.target)
	})
	.on('complete', () => {
		Beautifier.log()
	})
	.on('error', event => {
		console.log(event.target.error.message)
	})
	.run({ async: false })
