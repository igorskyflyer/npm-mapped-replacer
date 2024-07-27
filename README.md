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
    - [constructor()](#constructoroptions-ioptions---mappedreplacer)
    - [addRule(replaceWith: string, searchFor: string)](#addrulereplacewith-string-searchfor-string-boolean)
    - [addRule(replaceWith: string, searchFor: string[])](#addrulereplacewith-string-searchfor-string-boolean-1)
    - [addRules(rules: RuleSingle)](#addrulesrules--key-string-string--boolean)
    - [addRules(rules: RuleMultiple)](#addrulesrules--key-string-string--boolean-1)
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

### `constructor(options: IOptions = {}): MappedReplacer`

Create a new instance of `MappedReplacer`.  

<br>

`options` is a variable of type `IOptions` defined as:

- `caseSensitive` - a Boolean that indicates whether replacing should case-sensitive or not. 

---

### `addRule(replaceWith: string, searchFor: string): boolean`

Adds a new rule or updates an existing rule used in replacing a single string.  

`replaceWith` - The string to replace the `searchFor` with.  

`searchFor` - The string to be replaced.  

Returns true if the rule was added or updated successfully, false otherwise.

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('😀', ':smile:')

console.log(mapper.replace('Hello world :smile:')) // outputs 'Hello world 😀'
```

<br>

### `addRule(replaceWith: string, searchFor: string[]): boolean`

Adds a new rule or updates an existing rule for character replacement with multiple subjects.  

`replaceWith` - The string to replace the `searchFor` with.  

`searchFor` - The array of strings to be replaced.

Returns true if the rule was added or updated successfully, false otherwise.

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('😀', [':smile:', ':D'])

console.log(mapper.replace('Hello world :smile: :D')) // outputs 'Hello world 😀 😀'
```

---

### `addRules(rules: { [key: string]: string }): boolean`

Adds or updates the rules for string replacement.  

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
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRules({
  '&#120139;' : '𝕋',
  '&#8776;' : '≈',
  '&#120113;' : '𝔱'
})

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '&#120139; &#8776; &#120113;'
```

<br>


### `addRules(rules: { [key: string]: string[] }): boolean`

Adds or updates the rules for string replacement.  

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
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRules({
  '😁' : [':D', ':-D'],
  '😛' : [':P', ':-P']
})

console.log(mapper.replace('Hello :D world :-D this is a :P test :-P')) // outputs 'Hello 😁 world 😁 this is a 😛 test 😛'
```

---

### `removeRule(key: string): boolean`

*Removes the rule that matches the provided value.*  

`searchFor` - The rule to remove.

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')
mapper.addRule('&#8776;', '≈')

mapper.removeRule('𝕋')

console.log(mapper.replace('𝕋 ≈ 𝔱')) // outputs '𝕋 &#8776; 𝔱'
```

<br>

### `rulesCount(): number`

*Gets the number of rules for string replacing.*

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')

console.log(mapper.rulesCount()) // outputs 1
```

<br>

### `clearRules(): void`

*Clears all the rules.*  

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#120139;', '𝕋')
mapper.clearRules()

console.log(mapper.rulesCount()) // outputs 0
```

<br>

### `replace(input: string): string`

*Replaces the values in the input with the values from the Map.*  

`input` - The input string.

<br>

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#8594;', '→')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

---

## ✨ Examples

`example.ts`
```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('&#8594;', '→')

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
