---
title: Rust Basics
date: "2022-03-03"
description: "Rust basic concepts and operators"
---

## Installation

Install `rustup` first. It may be done with standard package manager or any other way.
`rustup` will install `rustc` rust compiler, `cargo` and other required tools.

The run `rustup component add rust-analyzer` to install rust `LSP` server.
And install `cargo-nextext` - test runner.

Install `code-lldb` - the debugger for rust.

## Never Type

`!` is an empty type in Rust, which can never be instanciated. It usually used to indicate that
function or expression never returns value:

```rust
fn func() -> ! {
}
```

Also it used in `match` expressions, when `continue`, `panic` or similar operation executed in
some arm. `!` useful here, because all arms should return value of same type and `never type` helps
in this scenario.

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};
```

