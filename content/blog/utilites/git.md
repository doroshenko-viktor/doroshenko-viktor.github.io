---
title: Git Cheatsheet
date: "2022-03-13"
description: "Basic GIT usage"
---

## Merge Branches

**Merge with autmatical accept of all incoming changes:**

If you need to merge some branch into yours and you know that there will be merge conflicts, but
you want to accept all incoming changes autmatically:

```bash
git merge <branch name> --strategy-option <strategy option value>
```

where:

- `branch name` is name of the branch you want to merge into current
- `strategy option value` - `ours` to ovveride all conflicts with values from current branch and
  `theirs` to override all conflicts with values from incoming branch

