---
title: Visual Studio Code Snippets
date: "2022-07-06"
description: "Creation and usage of code snippets in Visual Studio Code"
---

Code snippet is a relatively standard piece of code - template, which can be easily inserted at the
particular place of the code. Optionally it can be modified to be more precise. Or it could be generated 
from the existing part of code.

Usage of snippets aims to increase productivity by simplification of writing recurring parts of code.

## Editor Settings

Snippets are normally displayed in the quick suggestions menu accessible with `Ctrl+Space`.

To set up their position add following line into settings file: `"editor.quickSuggestions"` where 
value may be `on`, `off`, `onlySnippets`.

`editor.tabCompletion` allows to sort snippets in suggestion menu with options `top`, `bottom`, 
`inline` - this is default and `none`.



## References

- https://www.freecodecamp.org/news/definitive-guide-to-snippets-visual-studio-code/