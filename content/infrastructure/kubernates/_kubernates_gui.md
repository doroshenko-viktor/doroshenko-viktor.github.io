---
title: Kubernetes GUI app
date: "2022-10-25"
description: "GUI client for Kubernetes"
---


To install dashboard run new pod:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

Next we need to create user. To do that create two configuration files:

```yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
```

```yml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: admin-user
    namespace: kubernetes-dashboard
```

And apply them with `kubectl apply`

Following command will create access token:

```bash
kubectl -n kubernetes-dashboard create token admin-user
```

Dashboard access dashboard need to create proxy:

```bash
kubectl proxy
```

Dashboard address is `http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/`
