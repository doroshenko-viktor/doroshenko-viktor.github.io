---
title: Git Cheatsheet
date: "2022-03-13"
description: "Basic GIT usage"
---

## Configuration

Configuration levels - local, global
configuration file

<!-- To set up git TODO: -->

To configure user email `git config user.email `

## Merge Branches

**Merge with automatic accept of all incoming changes:**

If you need to merge some branch into yours and you know that there will be merge conflicts, but
you want to accept all incoming changes automatically:

```bash
git merge <branch name> --strategy-option <strategy option value>
```

where:

- `branch name` is name of the branch you want to merge into current
- `strategy option value` - `ours` to ovveride all conflicts with values from current branch and
  `theirs` to override all conflicts with values from incoming branch

## Observing Changes

## Log

To display list of commits there is a `git log` command, which opens view on last commits.
It is possible to use basic Vim commands to navigate this view.

If you don't need all the additional information, displayed by default, you can use `git log --oneline`.
It will display shortened commit id and commit message.

**Commit graph:**

Sometimes it is useful to see which branches became sources for our commit history. To see it use `git log --graph`.
