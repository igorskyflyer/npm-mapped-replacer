<h1 align="center">🗺 Mapped Replacer 🍁</h1>

<br>

<div align="center">
  🗺 Zero-dependency Map and RegExp based string replacer with Unicode support. 🍁
</div>

<br>
<br>

<div align="center">
  <blockquote>
    <br>
    <h4>💖 Support further development</h4>
    <span>I work hard for every project, including this one
    <br>
    and your support means a lot to me!
    <br>
    <br>
    Consider buying me a coffee. ☕
    <br>
    <strong>Thank you for supporting my efforts! 🙏😊</strong></span>
    <br>
    <br>
    <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="150"></a>
    <br>
    <br>
    <a href="https://github.com/igorskyflyer"><em>@igorskyflyer</em></a>
    <br>
    <br>
    <br>
  </blockquote>
</div>

<br>
<br>

## 📃 Table of contents

- [Usage](#-usage)
- [API](#-api)
    - [addRule()](#addrulekey-string-value-string-boolean)
    - [addRules()](#addrulesrules-object-boolean)
    - [removeRule()](#removerulekey-string-boolean)
    - [rulesCount()](#rulescount-number)
    - [clearRules()](#clearrules-void)
    - [replace()](#replaceinput-string-string)
- [Examples](#-examples)
- [Changelog](#-changelog)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i "@igor.dvlpr/mapped-replacer"
```

<br>

## 🤹🏼 API

### `addRule(key: string, value: string): boolean`

_Adds a new rule or updates the existing rule for character replacing._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule(':smile:', '😀')

console.log(mapper.replace('Hello world :smile:')) // outputs 'Hello world 😀'
```

<br>

### `addRules(rules: Object): boolean`

_Adds rules or updates the existing rules for character replacing._
_Passed object is a simple key-value object, i.e. { '<': '\&#60;', '>': '\&#62;'}_

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRules({
  '𝕋': '&#120139;',
  '≈': '&#8776;',
  '𝔱': '&#120113;',
})

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '&#120139; &#8776; &#120113;'
```

<br>

### `removeRule(key: string): boolean`

_Removes the rule that matches the provided key._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')
mapper.addRule('≈', '&#8776;')

mapper.removeRule('𝕋')

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '𝕋 &#8776; 𝔱'
```

<br>

### `rulesCount(): number`

_Gets the number of rules for character replacing._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')

console.log(mapper.rulesCount()) // outputs 1
```

<br>

### `clearRules(): void`

_Clears all the rules._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')
mapper.clearRules()

console.log(mapper.rulesCount()) // outputs 0
```

<br>

### `replace(input: string): string`

_Replaces the values in the input that match the keys in the Map object._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('→', '&#8594;')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

---

## ✨ Examples

`example.ts`
```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('→', '&#8594;')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

---

## 📝 Changelog

📑 The changelog is available here: [CHANGELOG.md](https://github.com/igorskyflyer/npm-mapped-replacer/blob/main/CHANGELOG.md).

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-mapped-replacer/blob/main/LICENSE).

---

## 🧬 Related

[@igor.dvlpr/str-is-in](https://www.npmjs.com/package/@igor.dvlpr/str-is-in)

> _🧵 Provides ways of checking whether a String is present in an Array of Strings using custom Comparators. 🔍_

<br>

[@igor.dvlpr/duoscribi](https://www.npmjs.com/package/@igor.dvlpr/duoscribi)

> _✒ DúöScríbî allows you to convert letters with diacritics to regular letters. 🤓_

<br>

[@igor.dvlpr/strip-yaml-front-matter](https://www.npmjs.com/package/@igor.dvlpr/strip-yaml-front-matter)

> _🦓 Strips YAML front matter from a String or a file. 👾_

<br>

[@igor.dvlpr/encode-entities](https://www.npmjs.com/package/@igor.dvlpr/encode-entities)

> _🏃‍♂️ Fast and simple Map and RegExp based HTML entities encoder. 🍁_

<br>

[@igor.dvlpr/strip-html](https://www.npmjs.com/package/@igor.dvlpr/strip-html)

> _🥞 Removes HTML code from the given string. Can even extract text-only from the given an HTML string. ✨_

---

<br>

### 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
