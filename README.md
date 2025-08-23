<div align="center">
  <img src="https://raw.githubusercontent.com/igorskyflyer/npm-mapped-replacer/main/media/mapped-replacer.png" alt="Icon of Mapped Replacer" width="256" height="256">
<h1 align="center">Mapped Replacer</h1>
</div>

<br>

<div align="center">
  🦗 Zero-dependency Map and RegExp based string replacer with Unicode support. 🍁
</div>

<br>
<br>

## 📃 Table of Contents

- [Features](#-features)
- [Usage](#-usage)
- [Changelog](#-changelog)
- [Support](#-support)
- [License](#-license)
- [Related](#-related)
- [Author](#-author)

<br>
<br>

## 🤖 Features

- 🔄 Define or update single or multiple text replacement rules in one call
- 📚 Batch‑load rules from plain objects or key‑to‑array mappings
- 🔍 Toggle case‑sensitive or case‑insensitive matching via options
- 📏 Enable strict mode to match only whole words using compiled `RegExp` boundaries
- ✅ Check if a specific replacement rule exists before using it
- ❌ Remove individual rules without affecting others
- 📊 Get the exact number of active rules at any time
- 🧹 Clear all rules instantly to start fresh
- ✏️ Replace all matches in a string in a single, efficient pass
- 🌐 Match Unicode, emojis, and non‑Latin scripts with the u flag
- ⚡ Zero‑dependency, lightweight, TypeScript‑ready ES module

<br>
<br>

## 🕵🏼 Usage

Install it by executing any of the following, depending on your preferred package manager:

```bash
pnpm add @igorskyflyer/mapped-replacer
```

```bash
yarn add @igorskyflyer/mapped-replacer
```

```bash
npm i @igorskyflyer/mapped-replacer
```

<br>
<br>

## 🤹🏼 API

### constructor

`constructor(options?: IOptions): MappedReplacer`

*Creates a new instance of `MappedReplacer`.*  

<br>

`options` is a variable of type `IOptions` defined as:

- `caseSensitive` - A Boolean that indicates whether replacing should be case-sensitive or not. Default is `true`.  

- `strict` - A Boolean that indicates whether strict mode is enabled. In strict mode, only whole matches are replaced. Default is `false`.

---

### addRule()

`addRule(replaceWith: string, searchFor: string): boolean`

*Adds a new rule or updates an existing rule used in replacing a single string.*  

`replaceWith` - The string to replace the `searchFor` with.  

`searchFor` - The string to be replaced.  

Returns true if the rule was added or updated successfully, false otherwise.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('😀', ':smile:')

console.log(mapper.replace('Hello world :smile:')) // outputs 'Hello world 😀'

```

<br>

### addRule()

`addRule(replaceWith: string, searchFor: string[]): boolean`

*Adds a new rule or updates an existing rule for character replacement with multiple subjects.*  

`replaceWith` - The string to replace the `searchFor` with.  

`searchFor` - The array of strings to be replaced.

Returns true if the rule was added or updated successfully, false otherwise.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('😀', [':smile:', ':D'])

console.log(mapper.replace('Hello world :smile: :D')) // outputs 'Hello world 😀 😀'
```

---

### addRules()

`addRules(rules: { [key: string]: string }): boolean`

*Adds or updates the rules for string replacement.*  

`rules` - A simple key-value object, i.e.:  

<br>

```ts
{
  '&#60;' : '<',
  '&#62;' : '>'
}
```  

Returns a Boolean whether the rules were added/updated successfully.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRules({
  '&#120139;' : '𝕋',
  '&#8776;' : '≈',
  '&#120113;' : '𝔱'
})

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '&#120139; &#8776; &#120113;'
```

<br>


### addRules()

`addRules(rules: { [key: string]: string[] }): boolean`

*Adds or updates the rules for string replacement.*  

`rules` - A simple key-value[] object, i.e.:  

<br>

```ts
{
  '😁' : [':D', ':-D'],
  '😛' : [':P', ':-P']
}
```  

Returns a Boolean whether the rules were added/updated successfully.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRules({
  '😁' : [':D', ':-D'],
  '😛' : [':P', ':-P']
})

console.log(mapper.replace('Hello :D world :-D this is a :P test :-P')) // outputs 'Hello 😁 world 😁 this is a 😛 test 😛'
```

---

### hasRule()

`hasRule(rule: string): boolean`

*Checks whether a rule is present in the Map.*  

`rule` - The rule to check for.  

Returns a Boolean indicating the existence of the given rule.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')
mapper.addRule('&#8776;', '≈')

console.log(mapper.hasRule('𝕋')) // true
```

---

### removeRule()

`removeRule(searchFor: string): boolean`

*Removes the rule that matches the provided value.*  

`searchFor` - The rule to remove.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')
mapper.addRule('&#8776;', '≈')

mapper.removeRule('𝕋')

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '𝕋 &#8776; 𝔱'
```

<br>

### rulesCount()

`rulesCount(): number`

*Gets the number of rules for string replacing.*

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')

console.log(mapper.rulesCount()) // outputs 1
```

<br>

### clearRules()

`clearRules(): void`

*Clears all the rules.*  

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')
mapper.clearRules()

console.log(mapper.rulesCount()) // outputs 0
```

<br>

### replace(input: string)

`replace(input: string): string`

*Replaces the values in the input with the values from the Map.*  

`input` - The input string.

<br>

```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#8594;', '→')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

---

## ✨ Examples

`example.ts`
```ts
import { MappedReplacer } from '@igorskyflyer/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#8594;', '→')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

<br>
<br>

## 📝 Changelog

📑 The changelog is available here, [CHANGELOG.md](https://github.com/igorskyflyer/npm-mapped-replacer/blob/main/CHANGELOG.md).

<br>
<br>

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-mapped-replacer/blob/main/LICENSE.txt).

<br>
<br>

## 💖 Support

<div align="center">
  I work hard for every project, including this one and your support means a lot to me!
  <br>
  Consider buying me a coffee. ☕
  <br>
  <br>
  <a href="https://ko-fi.com/igorskyflyer" target="_blank"><img src="https://raw.githubusercontent.com/igorskyflyer/igorskyflyer/main/assets/ko-fi.png" alt="Donate to igorskyflyer" width="180" height="46"></a>
  <br>
  <br>
  <em>Thank you for supporting my efforts!</em> 🙏😊
</div>

<br>
<br>

## 🧬 Related

[@igorskyflyer/str-is-in](https://www.npmjs.com/package/@igorskyflyer/str-is-in)

> _🧵 Provides ways of checking whether a String is present in an Array of Strings using custom Comparators. 🔍_

<br>

[@igorskyflyer/duoscribi](https://www.npmjs.com/package/@igorskyflyer/duoscribi)

> _✒ DúöScríbî allows you to convert letters with diacritics to regular letters. 🤓_

<br>

[@igorskyflyer/strip-yaml-front-matter](https://www.npmjs.com/package/@igorskyflyer/strip-yaml-front-matter)

> _🦓 Strips YAML front matter from a String or a file. 👾_

<br>

[@igorskyflyer/encode-entities](https://www.npmjs.com/package/@igorskyflyer/encode-entities)

> _🏃‍♂️ Fast and simple Map and RegExp based HTML entities encoder. 🍁_

<br>

[@igorskyflyer/strip-html](https://www.npmjs.com/package/@igorskyflyer/strip-html)

> _🥞 Removes HTML code from the given string. Can even extract text-only from the given an HTML string. ✨_

<br>
<br>
<br>

## 👨🏻‍💻 Author
Created by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
