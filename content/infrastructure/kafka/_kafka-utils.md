## Console Kafka Utils

**Create topics:**

```bash
kafka-topics.sh --create --bootstrap-server <kafka url> --replication-factor 1 --partitions 1 --topic <topic name>
```

**Consumer:**

```bash
./kafka-console-consumer --bootstrap-server <kafka url> --topic <topic name>
```

**Producer:**

```bash
kafka-console-producer.sh --broker-list <kafka url> --topic <topic name>
```
