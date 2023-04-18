---
title: Setting Up GRUB
date: "2023-04-08"
description: "Setting up Linux bootloading with GRUB"
---

To edit GRUB configuration open config file located at `/etc/default/grub`

`/etc/default/grub` is a configuration file used by the GRUB bootloader on Linux systems. It contains various settings that can 
be used to customize the way the bootloader behaves.

`GRUB_DEFAULT` is a setting that determines the default operating system that will be booted by GRUB if the user doesn't make a 
selection during the boot process. This setting can be set to a number of different values, depending on how the operating 
systems are listed in the GRUB boot menu. For example, if the first operating system listed in the boot menu is the one you want 
to boot by default, you can set GRUB_DEFAULT=0. If the second operating system listed is the one you want to boot by default, 
you can set `GRUB_DEFAULT=1`, and so on.

`GRUB_TIMEOUT` is setting that determines how long GRUB will wait for the user to make a selection during the boot process 
before it automatically boots the default operating system. This setting is specified in seconds. For example, if you set 
`GRUB_TIMEOUT=5`, GRUB will wait for 5 seconds for the user to make a selection before automatically booting the default 
operating system. If you set `GRUB_TIMEOUT=0`, GRUB will not wait at all and will immediately boot the default operating system.
