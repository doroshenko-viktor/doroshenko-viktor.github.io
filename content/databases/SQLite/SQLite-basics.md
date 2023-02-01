---
title: SQLite Basics
date: "2022-12-30"
description: "Basic topics of SQLite"
---

## Create Database

To create new database run:

```bash
sqlite3 <new db name>
```

## SQLite Shell Commands

### Dump

To export database content in `sql` file:

```txt
$sqlite3 testDB.db .dump > testDB.sql
```

To perform opposite operation and restore database from `sql` dump file:

```txt
$sqlite3 testDB.db < testDB.sql
```
