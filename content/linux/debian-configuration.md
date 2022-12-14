---
title: Setup Debian Linux From 0
date: "2022-12-17"
description: "Step by step setup for clean Debian Linux installation"
---

Before all let's update the installation:

```bash
sudo apt clean
sudo apt update
sudo apt upgrade -y
sudo apt dist-upgrade -y
sudo apt install linux-headers-$(uname -r) make gcc  dkms kpartx
```

## Window Server

To have a graphical interface we need to install window server. In particular case it will be `xorg`:

```bash
sudo apt install xorg
```

## Window Manager

As a window manager we will use `i3`. To install it, run:

```bash
sudo apt install apt-transport-https --yes
sudo apt install i3
```

Now run `startx` command to start a window server. If everything installed correctly, `i3` session will appear.
Following steps, displayed by `i3`, should be created configuration file in `~/.config/i3/config`.

To start GUI automatically on login, you may add `startx` to the `~/.bashrc` or similar.
