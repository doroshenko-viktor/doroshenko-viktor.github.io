---
title: Rust Basics
date: "2022-10-17"
description: "Rust closures and scope capturing"
---

`Closure` in Rust is a function which is able to capture vairable from context, which is global to it.

For example:

```rust
const x: u8 = 10u8;
const closure: fn(u8) -> u8 = |y: u8| -> u8 x * y;

fn func() -> u8 {
    closure(5u8)
}
```

It is allowed in Rust to not put type annotations in closure definition. This way types will be infered from the context.

```rust
let closure = |y| x * y;
```

By default Rust compiler takes least possible ownership on enclosed variables. To force closure to take ownership on
enclosed scope you can use `move` keyword:

```rust
fn with_moving_ownership() {
    let x = 5u8;

    let closure = move || {
        println!("{}", x)
    }

    // here x is not available
}
```

## Passing Closure As A Parameter

But when passing a reference to the closure, definition of it's signature is mandatory. To desribe closure there are exist
several traits:

- `Fn` - this means, that captured values will be reference with `&`
- `FnOnce` - closure takes full ownership on the captured values
- `FnMut` - closure has mutable reference on the captures values with `&mut`

But these traits define a maximum restriction possible for access to closed scope. But it does not mean that this borrowing
will actually happen. If compiler will see that it can use less restrictive borrowing rule it will use it.

Any regular function, which satisfies to the required function trait may be passed as a parameter instead of closure.

## Returning A Closure From Function

It is possible to return closure from function. But it is associated with additional restrictions. Returned closure must
own all it's enclosed variables. To do this, use `move` keyword. Also we have to use `impl` keyword for returned closure type, e.g:

```rust
fn create_sum() -> impl Fn(u8) -> u8 {
    let x1 = 5u8;

    move |y| y + x1
}
```

Or return pointer to function:

```rust
fn create_sum_box() -> Box<dyn Fn(u8) -> u8> {
    let x1 = 5u8;

    Box::new(move |y| y * x1)
}
```
