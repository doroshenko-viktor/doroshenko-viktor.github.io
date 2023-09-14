---
title: Synchronization Of Date In Debian With NTP server
date: "2023-03-06"
description: ""
---

To setup `Debian Linux` to synchronize its date and time with an `NTP (Network Time Protocol)` server, follow these steps:

```bash
sudo apt install ntp
```

This will install the `ntp` package, which includes the `ntp daemon (ntpd)`.

Configure the `ntp` daemon. Open `/etc/ntp.conf` file with root privileges:

```bash
sudo nano /etc/ntp.conf
```

In the file, find the lines that specify the `ntp` servers to use. You can uncomment these lines and replace the default servers 
with the ones you want to use. For example:

```bash
server time.google.com
```

Save and close the file.

Restart the `ntp` daemon:

```bash
systemctl restart ntp
```

To verify that your Debian Linux system is synchronizing its date and time with the `ntp` server, you can run the following command:

```bash
timedatectl status
```

