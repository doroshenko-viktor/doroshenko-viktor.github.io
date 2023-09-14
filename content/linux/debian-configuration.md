---
title: Setup Debian Initial Configuration
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

## Firewall

Install `ufw`:

```bash
sudo apt isntall ufw
```

Ensure that `/etc/default/ufw` contains:

```txt
IPV6=yes
IPV4=yes
```

Than enable firewall:

```bash
sudo ufw allow 22/ssh
sudo ufw enable
```

## Grub Configuration

To reduce time while `Grub` menu is open on startup open `Grub` configuration file:

```bash
vim /etc/default/grub
```

And change the line `GRUB_TIMEOUT` to the number of seconds you need.

After that run:

```bash
sudo update-grub
```

## Parallels

Installing Debian as VM in Parallels there will be a problem installing parallels tools. 
To solve it need to remount Parallels drive:

```bash
sudo mount -oro,exec,remount /media/cdrom
sudo /media/cdrom/install # then run installer
```
