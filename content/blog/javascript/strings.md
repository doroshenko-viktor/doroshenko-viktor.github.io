---
title: JS - Strings
date: "2022-03-12"
description: "Working with Javascript strings"
---

## String Methods

**split:**

To split given string by specified character use `String.split(<divisior>, <limit>)` method on this 
string, where `divisior` should also be some string pattern on which original string will be divided:

```js
const str = "val1;;val2;;val3";
const parts = str1.split(";;");
// parts: ['val1', 'val2', 'val3']
```

**join:**

`join` is an array method, but it returns a string of all elements of this array, combined into a
single string with specified divisior:

```js
const parts = ["first", "second", "third"];
const str = parts.join("; ");
// str: "first; second; third"
```

If divisior is not specified, default divisior will be `,`.
