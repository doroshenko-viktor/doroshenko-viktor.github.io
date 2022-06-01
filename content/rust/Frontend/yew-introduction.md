---
title: Yew Introduction
date: "2022-05-31"
description: "Basics of Yew Rust framework"
---

To get started with Rust frontend we need some tooling. 

First install `Trunk` - bundler for `Wasm` assets:

```bash
cargo install trunk
# or
brew install trunk # for Mac
```

Also we need make Rust able to compile to `WASM`:

```bash
rustup target add wasm32-unknown-unknown
cargo install --locked wasm-bindgen-cli
```

Now create new project:

```rust
cargo new <project-name>
```

To install `yew` as a dependency add following to the `[dependencies]` section of `Cargo.toml`:

```toml
yew = "0.19"
```

