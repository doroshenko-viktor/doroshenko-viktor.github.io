---
title: Kafka Basics
date: "2022-08-18"
description: "Kafka basic terminology and usage"
---

`Kafka` is an open source event streaming software, which allows to build event-driven applications.

## Install On MacOs

To run `Kafka` you need to have `Java Runtime Environment`.

```bash
brew cask install java
brew install kafka
```

First need to run `Zookeeper`:

```bash
zookeeper-server-start /usr/local/etc/kafka/zookeeper.properties
```

Then start `Kafka`:

```bash
kafka-server-start /usr/local/etc/kafka/server.properties
```

## Install On Debian

Install JDK:

```bash
sudo apt install openjdk-17-jdk
```

Download kafka:

```bash
wget https://downloads.apache.org/kafka/<version>/kafka_2.13-<version>.tgz
```

Unpack downloaded Kafka archive and move it to the installation directory:

```bash
tar -xzf kafka_2.13-3.4.0.tgz
sudo mv kafka_2.13-3.4.0 /usr/local/kafka
```

Create `systemctl` config for `zookeeper`:

```bash
sudo vim /etc/systemd/system/zookeeper.service
```

And fill it with:

```
[Unit]
Description=Apache Zookeeper server
Documentation=http://zookeeper.apache.org
Requires=network.target remote-fs.target
After=network.target remote-fs.target

[Service]
Type=simple
ExecStart=/usr/local/kafka/bin/zookeeper-server-start.sh /usr/local/kafka/config/zookeeper.properties
ExecStop=/usr/local/kafka/bin/zookeeper-server-stop.sh
Restart=on-abnormal

[Install]
WantedBy=multi-user.target
```

Next create `systemctl` config for `Kafka`:

```bash
sudo vim /etc/systemd/system/kafka.service
```

And fill it with:

```
[Unit]
Description=Apache Kafka Server
Documentation=http://kafka.apache.org/documentation.html
Requires=zookeeper.service

[Service]
Type=simple
Environment="JAVA_HOME=<insert path to java here>"
ExecStart=/usr/local/kafka/bin/kafka-server-start.sh /usr/local/kafka/config/server.properties
ExecStop=/usr/local/kafka/bin/kafka-server-stop.sh

[Install]
WantedBy=multi-user.target
```

Reload `systemctl` daemon:

```bash
systemctl daemon-reload
```

and start services for `Zookeeper` and `Kafka`:

```bash
sudo systemctl start zookeeper
sudo systemctl start kafka
```

To check it's status run:

```bash
sudo systemctl status kafka
```

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

## References

- https://medium.com/@Ankitthakur/apache-kafka-installation-on-mac-using-homebrew-a367cdefd273
- https://tecadmin.net/install-apache-kafka-debian/
