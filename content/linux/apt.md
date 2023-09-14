---
title: Debian APT
date: "2023-04-09"
description: "Working with Debian package manager"
---

## Repositories

Debian provides a number of source code repositories for various components of the operating system. Here are the main ones:

- `Main repository`: This repository contains the core Debian packages that are officially supported by the Debian project.
- `Contrib repository`: This repository contains packages that are not officially supported by the Debian project, but are 
  still free and open source software.
- `Non-free` repository: This repository contains packages that are not free and open source software, but are still 
  redistributable under certain conditions.
- `Backports` repository: This repository contains packages that have been backported from newer versions of Debian to older 
  releases.
- `Security updates repository`: This repository contains security updates for Debian packages.
- `Proposed-updates repository`: This repository contains packages that have been tested and are ready to be released as updates.
- `Experimental repository`: This repository contains packages that are not yet stable enough to be included in the official 
  Debian repositories, but may be useful for testing or development purposes.

In sources files the `deb` lines are used for installing packages, while the `deb-src` lines are used for downloading source 
code for packages.

**Adding new repositories:**

To add a repository to `APT` on Debian-based systems, you can follow these steps:
Identify the repository you want to add.
Open the `sources.list` file in a text editor with administrative privileges. The file is located in the `/etc/apt/` directory.
Add the repository to the `sources.list` file by appending the repository URL to the end of the file. For example, to add the 
official Ubuntu Universe repository, you would add the following line:

```
deb http://archive.ubuntu.com/ubuntu/ bionic universe
```

Here, `deb` indicates that this is a repository containing binary packages, and `http://archive.ubuntu.com/ubuntu/` is the URL 
for the repository. `bionic` is the code name of the Debian/Ubuntu release, and `universe` is the name of the repository.
Save the `sources.list` file and exit the text editor. Update `APT` to refresh its package lists with the new repository:

Example of `sources.list` for Debian:

```
deb http://deb.debian.org/debian/ bullseye main contrib non-free
deb-src http://deb.debian.org/debian/ bullseye main contrib non-free

deb http://security.debian.org/debian-security bullseye-security main
deb-src http://security.debian.org/debian-security bullseye-security main

deb http://deb.debian.org/debian/ bullseye-updates main
deb-src http://deb.debian.org/debian/ bullseye-updates main

deb http://deb.debian.org/debian/ testing main
```

Update `apt` cache:

```bash
sudo apt update
```

This will download the package lists from all the repositories listed in `sources.list`. You should now be able to install 
packages from the new repository using APT. Note that adding repositories can introduce security risks and conflicts between 
different packages, so it's important to only add repositories from trusted sources and to carefully manage any conflicts that may arise.

To install package from specific repository:

```bash
sudo apt-get -t testing install firefox
```

**Preferences:**

```
Package: *
Pin: release a=stable
Pin-Priority: 900

Package: *
Pin: release a=main
Pin-Priority: 800

Package: *
Pin: release a=contrib
Pin-Priority: 700

Package: *
Pin: release a=non-free
Pin-Priority: 600

Package: *
Pin: release a=testing
Pin-Priority: -1
```

To check what repository will be used by default to get package use `apt-cache policy <package-name>`
