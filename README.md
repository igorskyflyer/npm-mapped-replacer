# Mapped Replacer

<br>

🗺 Zero-dependency Map and RegExp based string replacer with Unicode support. 🍁

<br>
<br>

<div align="center">
	<blockquote>
		<h4>💖 Support further development</h4>
		<span>I work hard for every project, including this one and your support means a lot to me!
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
	</blockquote>
</div>

<br>

## 🕵🏼 Usage

Install it by executing:

```shell
npm i "@igor.dvlpr/mapped-replacer"
```

<br>

## 🤹🏼 API

#### addRule(key: string, value: string): boolean

_Adds a new rule or updates the existing rule for character replacing._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule(':smile:', '😀')

console.log(mapper.replace('Hello world :smile:')) // outputs 'Hello world 😀'
```

<br>

#### addRules(rules: Object): boolean

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

#### removeRule(key: string): boolean

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

#### rulesCount(): number

_Gets the number of rules for character replacing._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')

console.log(mapper.rulesCount()) // outputs 1
```

<br>

#### clearRules(): void

_Clears all the rules._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('𝕋', '&#120139;')
mapper.clearRules()

console.log(mapper.rulesCount()) // outputs 0
```

<br>

#### replace(input: string): string

_Replaces the values in the input that match the keys in the Map object._

```ts
import { MappedReplacer } from '@igor.dvlpr/mapped-replacer'

const mapper: MappedReplacer = new MappedReplacer()

mapper.addRule('→', '&#8594;')

console.log(mapper.replace('a → b')) // outputs 'a &#8594; b'
```

---

## 🪪 License

Licensed under the MIT license which is available here, [MIT license](https://github.com/igorskyflyer/npm-mapped-replacer/blob/main/LICENSE).

---

## 🧬 Related

[@igor.dvlpr/zep](https://www.npmjs.com/package/@igor.dvlpr/zep)

> _🧠 Zep is a zero-dependency, efficient debounce module. ⏰_

[@igor.dvlpr/hybridize](https://www.npmjs.com/package/@igor.dvlpr/hybridize)

> _🧬 Hybridize is a simple CLI that I use internally as a part of my Modern Module repository and Robby - another CLI tool. ⚡_

[@igor.dvlpr/registry-apppaths](https://www.npmjs.com/package/@igor.dvlpr/registry-apppaths)

> _🪀 A Node.js module for reading the AppPaths registry key on Windows. Useful for retrieving applications that can be launched from the command prompt. 🗃_

[@igor.dvlpr/adblock-filter-counter](https://www.npmjs.com/package/@igor.dvlpr/adblock-filter-counter)

> _🐲 A dead simple npm module that counts Adblock filter rules.🦘_

[@igor.dvlpr/unc-path](https://www.npmjs.com/package/@igor.dvlpr/unc-path)

> _🥽 Provides ways of parsing UNC paths and checking whether they are valid. 🎱_

<br>
<br>

>
> Provided by **Igor Dimitrijević** ([*@igorskyflyer*](https://github.com/igorskyflyer/)).
>
