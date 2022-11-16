---
title: Rust - Testing Code
date: "2022-03-02"
description: "Rust basic test creation and running concepts"
---

# Rust Testing

## Cargo Test

To run single specified test case:

```bash
cargo test <test_case_name>
```

To run only tests from particular test file:

```bash
cargo test --test integration_test
```

Test with logs printed:

```bash
cargo test -- --nocapture
```

## Unit Tests

In Rust unit tests may be written alongside to the code under test.

To create test function you need to mark it with `#[test]` macro:

```rust
#[test]
pub fn test_1() {
    // ... test code
}
```

Also several test cases could be organized into test module with `#[cfg(test)]`:

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn test_1() {
        // ... test code
    }

    #[test]
    fn test_2() {
        // ... test code
    }
}
```

`#[cfg(test)]` macro tells Rust compiler to build this module only when
`cargo test` command is executed.

Using test modules like that also allows to test private function, which are
external to it. For example:

```rust
fn private_function() {
    // some code
}

mod tests {
    use super::private_function;

    #[test]
    fn test_1() {
        // test private_function here
    }
}
```

## Integration Tests

In Rust concept of `integration testing` means such kind of tests, which test behavior
of our library from position of external user. Integration tests are checking correctness
of the public API and all classes and functions working together.

To create integration tests need to create `tests` directory in the root of the project:

```text
our_crate
├── Cargo.lock
├── Cargo.toml
├── src
│   └── lib.rs
└── tests
    └── integration_test.rs
```

Then we can create test in this folder and these tests may import `our_crate` as it will
do it's final user:

```rust
use our_crate;

#[test]
fn test_1() {
    // test some functionality from `our_crate`
}
```

## References

- [Rust testing documentation](https://doc.rust-lang.org/book/ch11-03-test-organization.html)
