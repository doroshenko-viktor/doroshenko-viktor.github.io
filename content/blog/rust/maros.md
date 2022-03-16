---
title: Rust - Macros
date: "2022-03-16"
description: "Creation and working with macroses in Rust"
---

`Macros` is a Rust way of `metaprogramming` - writing a code that creates another code.

`println!` and `vec!` are examples of macroses. Internally they execute more code, that has to be
written manually. e.g. with `vec!` it is possible to create an instance of `Vec<T>` and add some
values inside of it during single statement.

Macros are similar to functions, but the bigges difference between them in moment of execution - 
`function` is executed in runtime, whereas `macros` is executed during compile time. That quality
allows for example implement trait for some type inside of a `macros`.

The main con for `macros` is higher complexity to write and read. Also macros have to be defined
strictly before place, where it is used.

**Macros types in Rust:**

- declarative - declared with `macro_rules!`
- procedural:
  - Custom `#[derive]` macros that specify code added with the derive attribute used on structs 
    and enums
  - `Attribute-like` macros that define custom attributes usable on any item
  - `Function-like` macros that look like function calls but operate on the tokens specified as 
    their argument 


