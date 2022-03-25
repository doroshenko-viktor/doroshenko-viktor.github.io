---
title: JS - DOM
date: "2022-03-24"
description: "Browser Document Object Model and manipulating it with JavaScript"
---

`element nodes` are an objects which in assembly compose `Document Object Model` or `DOM`.

`html` elements are element nodes, simple text is a `text node`. `html attributes` also create
attribute nodes.

Element nodes contain properties and methods, which may be interacted with JavaScript.

## Querying DOM Elements

The most basic and generic way to get `DOM` element from `html` page is `querySelector(<query>)`,
which returns single element and `querySelectorAll(<query>)` which returns collection of elements.

`<query>` has a special syntax, similar to `css` elements syntax:

- To get element by it's class name `.class-name`
- To get element by it's id `#element-id-name`
- To get element by it's tag `tag-name`

But this is not limited to simple tag/class/id, actually `querySelector` may receive more complex
css element queries, like:

```js
const $firstListElem = document.querySelector("ul li:first-child")
```

These `querySelectorAll` method, which returns collection of `DOM` nodes return [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), which is a data structure, similar to array, but it is not an actual array.

There are more specific method for retrieving elements.

To get elements by it's `id` there is `getElementById()`, which returns single element.

It is also possible to get group of elements by their `tag` name - `getElementsByTagName(<tag_nam>)`

`getElementsByClassName(<class-name>)` - returns collection of nodes, found by given class name.

## Traversing DOM

To traverse the `DOM` there are a bunch of methods on node:

- `parentNode` - get parent of current node.
- `nextSibling` - get next sibling on the same level.
- `previousSibling` - get previous sibling on the same level.
- `firstChild` - get first child of this element.
- `lastChild` - get last child of this element.
- `childNodes` - get collection of all element's children including text nodes.
- `children` - get children element nodes without text nodes

## Modification Of DOM Elements

- `element.innerHTML` - allows to get or set inner content of current element

  ```html
  <ul>
    <li>li - 1</li>
    <li>li - 2</li>
    <li>li - 3</li>
  </ul>
  ```

  ```js
  const $list = document.querySelector("ul")
  console.log($list.innerHTML)
  // <li>li - 1</li>
  // <li>li - 2</li>
  // <li>li - 3</li>
  ```

- `element.innerText` - allows to get or set internal text content of given element and all it's children:

  ```html
  <ul>
    <li>li - 1</li>
    <li>li - 2</li>
    <li>li - 3</li>
  </ul>
  ```

  ```js
  const $list = document.querySelector("ul")
  console.log($list.innerText)
  // li - 1
  // li - 2
  // li - 3
  ```

- `element.style` - object, which contains style css properties, assigned to this element.
  _Important to notice: name of style attribute in js will be transformed to camel case, e.g. `background-color` -> `backgroundColor`_
- `element.getAttribute(<attribute-name>)` - allows to get html attribute value
- `element.setAttribute(<attribute-name>, <value>)` - allows to change node attribute value

  ```js
  const $input = document.getElementById("text-input")
  const inputValue = $input.getAttribute("value")
  $input.setAttribute("value", "new text")
  ```

- `element.removeAttribute(<attribute-name>)` - remove node attribute
- `document.createElement(<tag-name>)` - creates new element node of given html tag
- `element.appendChild(<child>)` - insert given element to target element children
- `element.insertBefore(<element>)` - insert given element before target element as a sibling
- `element.replaceChild(newElement, oldElement)` - insert `newElement` instead of `oldElement`
- `element.remove()` - removes element from DOM
