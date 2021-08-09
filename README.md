# 🗺 Mapped Replacer 🍁

<br>

_Zero-dependency Map and RegExp based string replacer with Unicode support._

<br>

✨Since version `1.1.0` `Mapped Replacer` is a hybrid module that supports both CommonJS (legacy) and ES modules, thanks to [Modern Module](https://github.com/igorskyflyer/npm-modern-module).

<br>

## Table of contents

<!--generated by TOC-->

- [Install](#install)
- [API](#api)
  - [addRule&#40;&#41;](#addrulekey-string-value-string-boolean)
  - [addRules&#40;&#41;](#addrulesrules-object-boolean)
  - [removeRule&#40;&#41;](#removerulekey-string-boolean)
  - [rulesCount&#40;&#41;](#rulescount-number)
  - [clearRules&#40;&#41;](#clearrules-void)
  - [replace&#40;&#41;](#replaceinput-string-string)
- [Test](#test)
  <!--/generated by TOC-->

<br>

### Install

```
npm i mapped-replacer
```

<br>

### API

#### addRule(key: string, value: string): boolean

_Adds a new rule or updates the existing rule for character replacing._

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRule(':smile:', '😀')

console.log(mapper.replace('Hello world :smile:')) // outputs 'Hello world 😀'
```

<br>

#### addRules(rules: Object): boolean

_Adds rules or updates the existing rules for character replacing._
<br>
_Passed object is a simple key-value object, i.e. { '<': '\&#60;', '>': '\&#62;'}_

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRules({
  '𝕋': '&#120139;',
  '≈': '&#8776;',
  '𝔱': '&#120113;',
})

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '&#120139; &#8776; &#120113;'
```

<br>

#### removeRule(key: string): boolean

_Removes the rule that matches the provided key._

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')
mapper.addRule('≈', '&#8776;')

mapper.removeRule('𝕋')

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '𝕋 &#8776; 𝔱'
```

<br>

#### rulesCount(): number

_Gets the number of rules for character replacing._

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')

console.log(mapper.rulesCount()) // outputs 1
```

<br>

#### clearRules(): void

_Clears all the rules._

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')
mapper.clearRules()

console.log(mapper.rulesCount()) // outputs 0
```

<br>

#### replace(input: string): string

_Replaces the values in the input that match the keys in the Map object._

```javascript
const MappedReplacer = require('mapped-replacer')

const mapper = new MappedReplacer()

mapper.addRule('→', '&#8594;')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

<br>

### Test

```
npm test
```
