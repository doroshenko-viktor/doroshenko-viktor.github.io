---
title: Dockerfile Syntax Reference
date: "2023-01-09"
description: "Dockerfil syntax"
---

- `RUN` is an image build step, the state of the container after a RUN command will be committed to the container image. 
A `Dockerfile` can have many `RUN` steps that layer on top of one another to build the image.

- `CMD` is the command the container executes by default when you launch the built image. A `Dockerfile` will only use the 
final `CMD` defined. The `CMD` can be overridden when starting a container with `docker run $image $other_command`.

- `ENTRYPOINT` is also closely related to `CMD` and can modify the way a container is started from an image.
