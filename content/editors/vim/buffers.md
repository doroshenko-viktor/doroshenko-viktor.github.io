---
title: Vim Buffers
date: "2022-11-22T22:12:03.284Z"
description: "Vim buffers overview and usefult tips"
---

## Buffer Commands

- `:ls` or `:files` or `:buffers` - list active buffers
  `%` - Buffer which is in the current window
  `#` - Alternate buffer (the last file which was most recently edited in the current window)
  `a` - Active buffer (the file which is being edited in the current window)
  `h` - Hidden buffer (buffer with unsaved modifications but is not being displayed in any window)
  `u` - Unlisted buffer (files that are not open in Vim but are present in the current working directory; use :ls! to view this)
  `-` - Buffer with 'modifiable' set to off
  `=` - A read-only buffer
  `+` - A modified buffer (buffer with changes that are not written to disk)
  `x` - A buffer that has read errors
- `:bdelete <buffer id>` or `:bd <buffer id>` deltes buffer.
  If `buffer id` is not specified, will be removed current buffer.
  It is also possible to delete range of buffers: `:2,3bd`
- `:buffer <buffer id>` or `:b <buffer id>` used to switch between buffers.
- `:bnext` or `:bn` switches to the next buffer.
- `:bprevious` or `:bp` switches to the previous buffer.
- `:bfirst` and `:blast` move to the first or the last buffer respectively.
- 