---
title: Neovim
date: "2022-02-17T22:12:03.284Z"
description: "NeoVim basic setup"
---


## Neovim

`Neovim` config location: `~/.local/share/nvim`

## Setting Up NeoVim With Python

Vim plugins are able to execute Python code when Vim is compiled with Python support.

The main advantages of using Python in plugins is that it enables plugins to have access to network sockets, and perform long-running or expensive operations in the background without freezing the Vim UI. This is the reason it is commonly used with completion plugins.

Install neovim python package:

```bash
pip install neovim
```

After that `:checkhealth` command in `NeoVim` should show that python is correctly set up.

## Package Manager

[Packer](https://github.com/wbthomason/packer.nvim)

Follow quick start instruction.

Make a simple configuration in `$XDG_CONFIG_HOME/nvim/lua/<yourconfig>/packer.lua`

```lua
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
    -- Packer can manage itself
    use 'wbthomason/packer.nvim'
    use 'folke/tokyonight.nvim'
end)
```

To install packages run `:PackerSync`



## References

[Setting up Python for Neovim](https://github.com/deoplete-plugins/deoplete-jedi/wiki/Setting-up-Python-for-Neovim)
[How to get a build of Neovim with python3 support for windows?](https://stackoverflow.com/questions/40900829/how-to-get-a-build-of-neovim-with-python3-support-for-windows)
