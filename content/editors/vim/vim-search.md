---
title: Vim Search
date: "2022-11-23T22:12:03.284Z"
description: "Search and replace in Vim"
---

## Search

To open search bar in menu type `/` character. This will open search field which allows to search in the
top to bottom direction. `?` opens search field, which will perform search in opposite direction.
You can type plain text in the search area to find it's occurances in the currently open document.

When the result is found you can use `n` to move to the next result or `N` to move to the previous result.

## Replace

The pattern for replace command is as follows:

```txt
:[range]s/{pattern}/{string}/[flags] [count]
```

Here `range` specifies range, where replace will be executed in document.
For example `s` for only first occurance, `%s` for all occurances. 
When no `range` and `count` provided replace will take place only in the
current line with the cursor.
To replace between particular lines e.g. between lines 3 and 10, specify range like `3:10s`.
`:.,$s/{pattern}/{string}` - means replace between current line and last line.
`:.,+5s/{pattern}/{string}` - replace between current line and next 5 lines.

`pattern` is a regular expression, matching the text, which will be replaced.

`string` is a replacement text.

`flags` are additional arguments for the command, e.g. `g` - apply replace for all matches,
`c` - require confirmation for each replace, `i` - ignore case,

## References

- [Find and Replace in Vim / Vi](https://linuxize.com/post/vim-find-replace/)
