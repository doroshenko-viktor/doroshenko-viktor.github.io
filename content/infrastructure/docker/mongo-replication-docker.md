---
title: Mongo Replication In Docker
date: "2022-05-31"
description: "Running Mongo replica set using Docker locally"
---

Mongo replication allows to build more scalable and fault tolerant systems. But using `MongoDb`
locally usually we use single instance versions. This is fine for many development usecases. But
some features, for example Mongo transactions are available only with replication.

We will set up docker compose configuration, which will allow to run several `MongoDb` containers,
able to communicate in mutual network. All these containers will be accessible also from local machine.

To create  local instance of `MongoDb` in cluster but only with single node:

```yml
version: "3.8"
services:
  mongodb:
    image : mongo
    container_name: mongodb
    hostname: mongodb
    restart: on-failure
    environment:
      - PUID=1000
      - PGID=1000
      - MONGO_INITDB_ROOT_USERNAME=guest
      - MONGO_INITDB_ROOT_PASSWORD=guest
      - MONGO_INITDB_DATABASE=my-service
      - MONGO_REPLICA_SET_NAME=rs0
    volumes:
      - mongodb4_data:/data/db
      - ./:/opt/keyfile/
    ports:
      - 27017:27017
    healthcheck:
      test: test $$(echo "rs.initiate().ok || rs.status().ok" | mongo -u $${MONGO_INITDB_ROOT_USERNAME} -p $${MONGO_INITDB_ROOT_PASSWORD} --quiet) -eq 1
      interval: 10s
      start_period: 30s
    command: "--bind_ip_all --keyFile /opt/keyfile/keyfile --replSet rs0"
volumes:
  mongodb4_data:
```


## Resources

- [Creating a MongoDB Replica Set Using Docker](https://www.sohamkamani.com/docker/mongo-replica-set/)
- [](https://blog.devgenius.io/how-to-deploy-a-mongodb-replicaset-using-docker-compose-a538100db471)
https://stackoverflow.com/questions/61486024/mongo-container-with-a-replica-set-with-only-one-node-in-docker-compose
https://blog.tericcabrel.com/mongodb-replica-set-docker-compose/