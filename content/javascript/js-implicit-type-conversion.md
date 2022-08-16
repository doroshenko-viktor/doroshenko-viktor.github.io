---
title: JavaScript Type Conversions
date: "2022-08-03"
description: "JS Implicit Type Conversions"
---

## Conversion Of Different Types

### To String

For primitive types conversion to `string` is obvious. This way `number` `1` will be converted to `string` `"1"`,
`boolean` `true` will be converted as `"true"` and `false` as `"false"`, `null` becomes `"null"`.

But in case of `object` types, things may become more complex. Each `js` object has `toString(): string` method. Every time
we want to get string representation of an `object` runtime will call this method. In case of primitive values, to reach
this runtime creates object wrapper on primitive. For example with `number` primitive `Number` object will be created.
`Number` already has correct implementation of `toString`. But in case of custom objects, we need to override `toString`.
Not doing so will result to call for a default implementation of `Object.prototype.toString`, which will return `"[object Object]"`
value.

### To Number

Usually we need to convert value to `number` from a `string`, e.g. after user input. If such string contains valid number, we
can use `parseInt(source): number`, which will convert to integer number or `parseFloat(source): number`, which will convert to
floating point number. Moreover, source string may contain number of different bases of numerical systems.

In case if source string contains not a valid numerical value `NaN` value will be returned.

Values like `null` and `undefined` on numerical conversion will result in `NaN`.

Boolean `true` will be converted into `1` and `false` to `0`.

## To Boolean

Number `0`, string `""`, `null`, `undefined`, `NaN` converts to `false`. And other values become `true`.

## Implicit Conversion

`JavaScript` may implicitly convert variable types to perform some operations. Implicit conversion happen in several cases:

### With arithmetic operations

With `+`, `-`, `*`, `/`:

- With unary `+` tries to convert to number;

```js
+x;
+1; // 1
+"1"; // 1
+true; // 1
+new Date(); // (a numeric value)
```

- With two operands:

```js
a + b;
{
}
+{}; // '[object object][object object]'
[] + []; // ''
[] + new Date(); // (A date string)
```

- If operation is `+` and one operand is a `string`, converse the other to a `string`

```js
1 + ""; // '1'
"" + 1; // '1'
"" + true; // 'true'
```

- In other cases it tries to convert both to numbers:

```js
1 + true; // 2
true + true; // 2
```

- Converse value or values to number:

```js
-"1"; // -1
[] - 1; // -1
[] - {}; // NaN
```

### In Not Strict Comparisons

Like `==`, `!=`, `>`, `>=`, `<`, `<=`:

- **Null And Undefined:**

If one of the comparing values is `null` and the other is `undefined`, they are equal in case of
not strict conversion:

```js
null == undefined; // true
```

**String And Number**

If one operand is a `number` and the other is a `string`, convert the `string` to a `number` to compare:

```js
1 == "1"; // true
```

**With Boolean**

If either is boolean, convert it to a number

```js
true == 1; // true
false == 0; // true
```

If one is an `object`, and the other is a `number` or a `string`, convert the `object` to a primitive:

```bash
[1] == 1 // true
['1'] == '1' // true
```

If either is an `object`, convert it to a primitive:

```js
[2] > 1; // true
```

If both are `strings`, compare them using alphabetical order:

```js
"b" > "a"; // true
```

If either is a `number`, convert one or two not `number` to a `number`:

```js
"2" > 1; // true
```

### With `in` Operator

If left operand isn't a `string`, convert it to a `string`:

```js
"1" in { 1: "" }; // true
1 in { 1: "a" }; // true
1 in ["a", "b"]; // true
```

### Logic Operators

`&&`, `||`, `!`

If either isn't `boolean`, convert it to a `boolean` value:

```js
Boolean(null || undefined || 0 || -0 || NaN || ""); // false
Boolean(1 && "a" && {} && [] && [0] && function () {}); // true
```

## References

- [Master JavaScript Implicit Type Conversion](https://itnext.io/master-javascript-implicit-type-conversion-573d0c90a3bf)
