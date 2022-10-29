---
title: kubernetes Basics
date: "2022-10-23"
description: "Basic terms of kubernetes"
---

`kubernetes` allows to run variety of different containers on multiple machines.

`Claster` is a combination of a `master` and one or many `nodes` which run containers. Each node may be a
different machine.

## Node

`Node` is a machine, running containers. It may be physical or virtual machine. Each cluster can have one or more
nodes. Nodes are managed by Kubernetes master node.

Node runs at minimum process allowing master to manage that node - `kubelet` and container runtime(Docker in most cases).

## Pod

Minimal unit of deployment in kubernetes is `pod`. Pod contains one or more containers and some shared resources,
which must be deployed together or grouped by some other criteria. One pod's containers are deployed within single
node. If node failse same pod will be scheduled on a different node.

## Service

`Services` make it possible to discover and reach nodes. Nodes may be created, removed, updated. This may lead to
change of node's IP address. That is why it is not recommended to expose node to outside world directly, but using
service instead. Usually service is connected to necessary nodes with system of labels.

**Service Types:**

- `ClusterIP` Exposes the Service on an internal IP in the cluster. This type makes the Service only reachable from within the cluster. Used by default.
- `NodePort` Exposes the Service on the same port of each selected Node in the cluster using NAT. Makes a Service accessible from outside the cluster using <NodeIP>:<NodePort>. Superset of ClusterIP.
- `LoadBalancer` Creates an external load balancer in the current cloud (if supported) and assigns a fixed, external IP to the Service. Superset of NodePort.
- `ExternalName` Maps the Service to the contents of the `externalName` field (e.g. `foo.bar.example.com`), by returning a `CNAME` record with its value. No proxying of any kind is set up. 
- `Ingress`


## Deployments

`Deployment` is a configuration, which instructs Kubernetes master how to allocate instances of our application.
User defines desired state of running pods and deployment will make according changes.

To get all running deployments info, run:

```bash
kubectl get deployments
```

To get replica sets, created by the deployment:

```bash
kubectl get rs
```

## Basic configuration

For local development it is recommended to use `minikube` as a Kuberantes cluster. To install it on Linux:

```bash
wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-<your architecture code>
```

Architecture code may be for example `amd64`, `arm64`, e.t.c

Copy it to executables directory:

```bash
sudo cp minikube-linux-<architecture code> /usr/local/bin/minikube
```

And make it executable:

```bash
sudo chmod 755 /usr/local/bin/minikube
```

To check that everything is installed run `minikube version`

To start cluster run:

```bash
minikube start
```

**TODO: configure kubectl to connect a cluster**

To check cluster status run:

```bash
kubectl cluster-info
```

## Running Configurations

To feed kubernetes configurations to cluster run:

```bash
kubectl apply -f <filename>
```

To check status of execution:

```bash
kubectl get pods
```

Running pods could be accessible by cluster IP, which could be discovered with

```bash
kubectl get nodes -o wide
```

or

```bash
minikube ip
```

To get detailed information about Kubernetes object run:

```bash
kubectl describe <object type> [object name]
```

If `object name` is omitted, all object of given type will be described.
