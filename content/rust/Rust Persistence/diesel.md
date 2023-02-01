---
title: Diesel - Rust ORM
date: "2022-12-31"
description: "Working on Rust with SQL databases with Diesel ORM"
---

##

`DATABASE_URL=<database_url>`

## Diesel CLI

### Install Diesel CLI

To install `diesel cli` run:

```bash
cargo install diesel_cli --no-default-features --features <feature>
```

Where `<feature>` is a required database lib, e.g. `postgres` or `sqlite`. It is possible to install `diesel` with several
features with `--features postgres,sqlite`

To install `diesel cli` with `postgres` feature you need to have `libpq` installed on your machine.
On macos it may be installed with `brew install libpq`.

Then you need to inform `cargo` about `libpq` location. It may be done either by providing environment variable:

```bash
RUSTFLAGS='-L /opt/homebrew/opt/libpq/lib'
```

Or with `cargo` config file, located in `~/.cargo/config.toml`. Add following to this file:

```txt
[target.aarch64-apple-darwin]
rustflags = '-L /opt/homebrew/opt/libpq/lib -L /opt/homebrew/lib'
```

### Commands

Initialize `diesel` project:

```bash
diesel setup
```

This command will create migrations folder and generate `diesel.toml` file.

To create new migration execute:

```bash
diesel migration generate <migration_name>
```

After this in migration folder will be created new migration with name, consisting of current timestamp and `migration_name`.
In the folder of created migration there will be two files - `up.sql`, which is used to run code of migration and `down.sql`,
which is used to revert this migration.

To execute migration code in the database run:

```bash
diesel migration run
```

To revert executed migration:

```bash
diesel migration redo
```


