## Installation 

First install required libraries:

```bash
sudo apt install apt-transport-https
```

Add tor repository. Create file `/etc/apt/sources.list.d/tor.list` with content:

```
deb     [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <DISTRIBUTION> main
deb-src [signed-by=/usr/share/keyrings/tor-archive-keyring.gpg] https://deb.torproject.org/torproject.org <DISTRIBUTION> main
```

Where `<DISTRIBUTION>` is a name of your system distribution. It could be obtained by:

```bash
lsb_release -c
```

Add gpg keys. As system root user run:

```bash
wget -qO- https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --dearmor | tee /usr/share/keyrings/tor-archive-keyring.gpg >/dev/null
```

Then update repositories cache and install tor:

```bash
sudo apt update
sudo apt install tor deb.torproject.org-keyring
```

You can check tor daemon status via:

```bash
systemctl status tor.service
systemctl status tor@default
```

To use tor in Firefox configure `socks5` with host `127.0.0.1:9050`
and check status on `https://check.torproject.org`
