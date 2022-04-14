---
title: Git Cheatsheet
date: "2022-03-13"
description: "Basic GIT usage"
---

## Configuration

Configuration levels - local, global
configuration file

<!-- To set up git TODO: -->

To configure user email `git config user.email <email>`

## Committing

### Commit Options

**Verbose mode:**

`git commit -v` allows to see all the changes, made on commit in opened default editor.

_This option is incompatible with `-m` option_

**Commit with specified message:**

`git commit -m "<commit message>"` - create a commit with specified message without opening a default editor

**Commit all:**

`git commit -a` - stage all modified files and commit them.
_This will not stage new files_

**Add new changes to last commit:**

If you have some changes in the repository and want add them to the last commit, use `-a` flag.
`git commit --amend`
_Note, that this command will require commit message change_

To not change last commit's message add `--no-edit` flag

`amend` also allows to change author of commit: `git commit --amend --author="Author Name <email>"`

## Checkout

`git checkout` allows to switch between branches, commits or files.

**Switch branches:**

Switch branches: `git checkout <branch-name>` - switch to given branch by it's name.

To create a new branch use `-b` flag: `git checkout -b <new-branch-name>`.

`-f` or `--force` flag allows to change branches if there are conflicting changes exist.

**Checkout on particular commit:**

`git checkout <commit-id>` switches to some commit by it's given commit id.

**Resetting changes:**

To reset uncommitted changes you can use: `git checkout -- <file-name>` to reset specific file
and `git checkout .` to reset all uncommitted changes.

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

## Stash

`stash` in `git` is a special area, where some uncommitted changes may be temporary stored.
Stashed changes are available to all branches in the repository.

To add current uncommitted changes to stash run: `git stash save "<message>"`

To display available data in stash: `git stash list`.
To check changes inside of a particular stash: `git stash show <stash-name>`.
`-p` flag enables display of diff-like changes.

To apply stash data and also keep this data in stash: `git stash apply <stash-name>`
To apply stash and remove this data from stash: `git stash pop <stash-name>`

To remove stash: `git stash drop <stash-name>`
and to clear all stashes `git stash clear`.

## Log

To display list of commits there is a `git log` command, which opens view on last commits.
It is possible to use basic Vim commands to navigate this view if you need to see some earlier commits.

**Display specific commit:**

To show information about some particular commit there is a `git log <commit id>` command.
It will display list of commits starting and earlier than specified.

**Simple view:**

By default `log` displays all commit information including `SHA`, author, date and message.
If you don't need all the additional information, displayed by default, you can use `git log --oneline`.
It will display shortened commit id and commit message.

**Commit graph:**

Sometimes it is useful to see which branches became sources for our commit history. To see it use `git log --graph`.

**Commit statistics:**

`git log --stat` will display, which files were modified in the commit, how many lines were modified.

`git log --patch` of equivalent `git log -p` will display changes, that were made in the commits.

## References

- [Git log command](https://www.freecodecamp.org/news/git-log-command/)
- [Git Commit Command Explained](https://www.freecodecamp.org/news/git-commit-command-explained/)
- [Git Stash Explained: How to Temporarily Store Local Changes in Git](https://www.freecodecamp.org/news/git-stash-explained/)