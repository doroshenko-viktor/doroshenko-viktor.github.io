---
title: Kubernetes Installation
date: "2022-12-26"
description: "Installation of Kubernetes cluster in some environments"
---

## Debian

### Kubectl

First install `Docker` with:

```bash
sudo apt install docker.io
```

Then enable it, so `docker` will autostart on the machine startup:

```bash
systemctl enable docker
```
Add user to the `docker` user group:

```bash
sudo usermod -aG docker $USER
```

Download `kubectl`:

```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/<arch>/kubectl"
```

where `<arch>` is your architecture, e.g. `arm64` or `amd64`

Then install downloaded `kubectl`:

```bash
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

Check if installation completed successfully:

```bash
kubectl version --client
# or
kubectl version --client --output=yaml
```

### Minikube

Download `minikube` with:

```bash
wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-<arch>64
```

Like with installation of `kubectl` `<arch>` defines your desired architecture, e.g. `arm64` or `amd64`.

Copy downloaded minikube binary to the binaries folder:

```bash
sudo cp minikube-linux-<arch>64 /usr/local/bin/minikube
```

Give permission to execute this binary:

```bash
sudo chmod +x /usr/local/bin/minikube
```

Run `minikube`:

```bash
minikube start
```


## References

- [https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)
