# @3imed-jaberi/deepfreeze

[![Build Status][travis-img]][travis-url]
[![Coverage Status][coverage-img]][coverage-url]
[![NPM version][npm-badge]][npm-url]
[![License][license-badge]][license-url]
![Code Size][code-size-badge]

<!-- ***************** -->

[travis-img]: https://travis-ci.com/3imed-jaberi/deepfreeze.svg?branch=master
[travis-url]: https://travis-ci.com/3imed-jaberi/deepfreeze
[coverage-img]: https://coveralls.io/repos/github/3imed-jaberi/deepfreeze/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/3imed-jaberi/deepfreeze?branch=master
[npm-badge]: https://img.shields.io/npm/v/@3imed-jaberi/deepfreeze.svg?style=flat
[npm-url]: https://www.npmjs.com/package/@3imed-jaberi/deepfreeze
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: https://github.com/3imed-jaberi/deepfreeze/blob/master/LICENSE
[code-size-badge]: https://img.shields.io/github/languages/code-size/3imed-jaberi/deepfreeze

<!-- ***************** -->

### The modern and amiable deep freeze, works with Map and Set 🥶

## `Features`

- 💅🏻 Inspired by many solutions in a modern way.
- 🌪 Recursively `Object.freeze()` for objects, functions and arrays.
- 🥞 Support for `Map` and `Set`.
- 💉 Add `.isDeepFrozen()` method for each frozen object.
- 🎯 Support Pure Deep Freeze through deep clone.
- 🧊 Handle primitives types natively.

## `Installation`

```bash
# npm
$ npm install @3imed-jaberi/deepfreeze
# yarn
$ yarn add @3imed-jaberi/deepfreeze
```

## `Usage`

This is a practical example of how to use.

```javascript
"use strict";

const deepfreeze = require("@3imed-jaberi/deepfreeze");

const object = {
  someBoolean: true,
  someNumber: 10,
  someString: "hello!",
  someObject: { foo: "bar", someNestedObject: { nested: "inObject" } },
  someArray: [false, 20, "bye!", { nested: "inArray" }],
  someMap: new Map(["item1", "item2"]),
  someSet: new Set(["item1", "item2"]),
};

const frozenObject = deepfreeze(object);

Object.isFrozen(frozenObject); // true
Object.isFrozen(frozenObject.someBoolean); // true
Object.isFrozen(frozenObject.someNumber); // true
Object.isFrozen(frozenObject.someString); // true
Object.isFrozen(frozenObject.someObject); // true
Object.isFrozen(frozenObject.someObject.foo); // true
Object.isFrozen(frozenObject.someObject.someNestedObject); // true
Object.isFrozen(frozenObject.someObject.someNestedObject.nested); // true
Object.isFrozen(frozenObject.someArray); // true
frozenObject.someArray.forEach((value) => {
  Object.isFrozen(value); // true
});
frozenObject.someMap.clear(); // Error: Map is read-only.
frozenObject.someSet.clear(); // Error: Set is read-only.
```

## `API`

You can pass some arguments to the freeze method;

- `object` &mdash; (Object) object to deep freeze.
- `options.isProd` &mdash; (Boolean) ignore freezing in production (for better performance) (`default to false`).
- `options.pureFreeze` &mdash; (Boolean) use `lodash.cloneDeep` to create a copy and use it dealing the freezing process (`default to false`).

If the passed object handled by our method, a method called `isDeepFrozen` will be inserted as property to the object.

#### License

---

[MIT](LICENSE) &copy; [Imed Jaberi](https://github.com/3imed-jaberi)
