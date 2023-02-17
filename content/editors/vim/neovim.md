---
title: Neovim
date: "2022-02-17T22:12:03.284Z"
description: "NeoVim basic setup"
---


## Neovim

### Installation

To install `neovim` from source first install the dependencies:

```bash
sudo apt install ninja-build gettext libtool libtool-bin autoconf automake cmake g++ pkg-config unzip
```

Clone the `Neovim` repository:

```bash
git clone https://github.com/neovim/neovim.git
```

Go to the `Neovim` directory:

```bash
cd neovim
```

Build and install `Neovim`:

```bash
make CMAKE_BUILD_TYPE=RelWithDebInfo
sudo make install
```

This will build and install `Neovim` with debugging symbols. If you don't want debugging symbols, use make 
`CMAKE_BUILD_TYPE=Release` instead.

Verify the installation by checking the version number:

```bash
nvim --version
```

This should output the version number of `Neovim` that was installed.


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

## Language Servers

To list all capabilities of specified language server:

```lua
:lua print(vim.inspect(vim.lsp.buf_get_clients()[1].resolved_capabilities))
```



## References

[Setting up Python for Neovim](https://github.com/deoplete-plugins/deoplete-jedi/wiki/Setting-up-Python-for-Neovim)
[How to get a build of Neovim with python3 support for windows?](https://stackoverflow.com/questions/40900829/how-to-get-a-build-of-neovim-with-python3-support-for-windows)

