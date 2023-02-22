---
title: Filebeat
date: "2023-02-17T22:12:03.284Z"
description: "Elastic Filebeat"
---

## Reading Docker Logs

Docker stores container logs in files inside of docker logs directory `/var/lib/docker/containers/*/*.log`

## Common Problems

`Filebeat` does not display any error when it does not have an access rights to reading files. If no logs sent
check if there are correct access right set up.
