---
title: Using Rust Axum With Sqlx
date: "2022-03-03"
description: "Basic example of using Axum with Sqlx and migrations"
---

## State

### FromRef

```rust
use axum::{
    extract::{State, FromRef},
    routing::get,
    Router,
};

// Our top level state that contains an `HttpClient` and a `Database`
//
// `#[derive(FromRef)]` makes them sub states so they can be extracted
// independently
#[derive(Clone, FromRef)]
struct AppState {
    client: HttpClient,
    database: Database,
}

#[derive(Clone)]
struct HttpClient {}

#[derive(Clone)]
struct Database {}

let state = AppState {
    client: HttpClient {},
    database: Database {},
};

let app = Router::new()
    .route("/", get(handler))
    .with_state(state);

async fn handler(
    // We can extract both `State<HttpClient>` and `State<Database>`
    State(client): State<HttpClient>,
    State(database): State<Database>,
) {}
```


## Migrations

Install `sqlx cli`:

```bash
cargo install sqlx-cli
```

This command accepts some additional arguments, which define features related to different database engines, ssl e.t.c.
To check what you may need use [this doc](https://lib.rs/crates/sqlx-cli)

To connect to the database cli requires to specify connection string. This may be done with `--database-url` argument
and also using `.env` file with `DATABASE_URL` value. For example:

```txt
DATABASE_URL=postgres://postgres@localhost/my_database
```

To initialize database run: `sqlx database create`, to remove created database `sqlx database drop`

Create migration file: `sqlx migrate add <name>`. By default this creates not reversible migration. I you need this migration
to be reversible add `-r` argument to the previous command. *Note: all migrations should be of the same type.*
Fill created files with `sql` code. 
To apply created migration run: `sqlx migrate run`. To revert migration run `sqlx migrate revert`

## Offline mode for `query!()` 
// todo:
