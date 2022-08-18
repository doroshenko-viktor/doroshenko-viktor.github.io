---
title: Kafka Basics
date: "2022-08-18"
description: "Kafka basic terminology and usage"
---

`Kafka` is an open source event streaming software, which allows to build event-driven applications.

## Basic Terminology

- `Kafka broker`  —  one or more servers running Kafka nodes. Single `Kafka Cluster` is made of `brokers`.
- `Event` - is a message, which contains some information or simply alerts, that something happened.
  Each event contains `key`, `value`, timestamp and some not mandatory metadata.
- `Topic`  - stream or category to which event are published and organized.
- `Partition` - `topics` are divided into partitions, which may be spread across different `buckets`
  on different brokers. Events with the same `key` will always be published to the same partition
  ensuring with guarantee of event order in this partition.
- `Producer` - application, which emits new events to Kafka instance.
- `Consumer` - application, which consumes and handles events from Kafka.
- `Consumer group` - group of consumers united by single `consumer id`. These consumers have same `offset`.
- `Offset` - number, used to persist current position in the topic or partition.

To operate `Kafka` requires `Zookeeper` application, which allows `Kafka cluster` to track nodes status,
maintain list of topics and event messages.

Each `topic` may have many `producers` and many `consumers`. Topics may be replicated across multiple brokers.
Event are not deleted after consumer consumption.
