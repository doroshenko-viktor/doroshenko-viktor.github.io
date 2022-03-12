---
title: JS - Iterables And Collections
date: "2022-03-12"
description: "Working with Javascript iterables and collections"
---

## Iterables

In `JS` iterables are objects, which implement `iterable` protocol and have `@@iterator` method.
Those are arrays, linked lists, maps, sets, strings and so on.

There are also `array-like objects` - objects, that have a length and possibility to acces it's
elements by index.

## Array

To create an array in `JS` there are many possible ways:

```js
const a1 = ['elem'];
const a2 = Array('elem');
const a3 = new Array('elem');
const a4 = Array.of('elem');
const a5 = Array.from('elem');
```

*Note: `new Array(5)` or `Array(5)` will create new empty array with given length of 5*

`Array.from(iterable)` - this method is meant to convert an array-like object or iterable to an
actual array.

e.g.

```js
const arr = Array.from('string');
// will contain ['s', 't','r', 'i', 'n', 'g'];
```

## Looping Over Iterable

To loop over an iterable object we can use `for .. of ..` loop:

```js
for (const data of iterable) {}
```

## Methods On Collections

To add an element to the end of the collection use `push` method:

```js
const elems = [1, 2, 3];
elems.push(4);
// will contain [1,2,3,4]
```

To add an element to the beginning of the collection use `unshift` method:

```js
const elems = [1, 2, 3];
elems.unshift(0);
console.log(elems);
// will contain [0,1,2,3]
```

`pop` method removes last element of a collection and returns it:

```js
const lastElem = elems.pop();
```

Method `shift` removes one element from the beginning of a collection:

```js
const firstElem = elems.shift();
```


