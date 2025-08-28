# 📒 Changelog

### of [@igorskyflyer/mapped-replacer](https://github.com/igorskyflyer/npm-mapped-replacer)

<br>

## v3.0.0 (*28-Aug-2025*)

- **✨ feat**: add `longestMatchFirst` prop
- **✨ feat**: respect all Unicode characters when replacing
- **✨ feat**: add `updateRule` method
- **✅ fix**: fix how `addRule` handles rules overwriting
- **💻 dev**: refactor RegExp used for escaping
- **💻 dev**: simplify alternations generating
- **💻 dev**: refactor branching in multiple places

<br>

## v2.2.0 (*28-Jul-2024*)

- **✨ feat**: add [`hasRule()`](./README.md#hasrule) method

<br>

## v2.1.1 (*28-Jul-2024*)

- **✅ fix**: fix strict mode edge-case

<br>

## v2.1.0 (*28-Jul-2024*)

- **✨ feat**: add strict mode, only replace whole matches

<br>

## v2.0.1 (*28-Jul-2024*)

- **✅ fix**: remove string testing before replacement

<br>

## v2.0.0 (*28-Jul-2024*)

- **❌ BREAKING**: change method signature of [`addRule()`](./README.md#addrule)
- **❌ BREAKING**: change method signature of [`addRules()`](./README.md#addrules)

<br>

- **✨ feat**: add options to constructor
- **✨ feat**: add case-sensitivity option
- **✨ feat**: add `value -> string[]` mapping to [`addRule()`](./README.md#addrule) to allow mapping a single replacement value to multiple replace subjects
- **✨ feat**: add `value -> string[]` mapping to [`addRules()`](./README.md#addrules) to allow mapping a single replacement value to multiple replace subjects

<br>

- **💻 dev**: upgrade devDependencies

<br>

## v1.0.0 (*29-Jun-2024*)

- **🚀 launch**: initial release 🎉
