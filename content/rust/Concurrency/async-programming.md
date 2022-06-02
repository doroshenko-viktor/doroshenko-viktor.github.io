---
title: Rust Async Programming
date: "2022-06-02"
description: "Asynchronous programming in Rust"
---

`Asynchronous programming` is a concurrency model, which allows to multiple independent tasks to
operate on base of smaller number of OS threads. It allows to greatly reduce workload in some
scenarios, like with heavy usage of `IO` operations. In this case if we use OS threads, means that
on each `IO` operation, thread will simply wait for it's completion, while in `async` model it can
resume it's work on another task. That allows smaller number of OS threads to do the same work,
saving a lot of performance on context switching.

Particularly in Rust it is worth to always keep in mind, that:

- `Futures` (also known as `Tasks` in C# or `Promises` in JS languages) start doing their action
  only whence actively triggered and they stop execution, when go out of scope and dropped.
- Unlike other languages, Rust does not provide a runtime for `async` operations for performance 
  reasons. Custom `async` runtimes are provided by community. They can be single-threaded, like `V8`
  in JS world or multithreaded.

Rust natively provides `Future` trait and `async/await` keywords, some utility types in `futures`
crate. Other functionality can be used added by third party modules.

## Async / Await

`async/await` syntax allows to some blocks of code to return control on the thread instead of blocking.

`async` may be used on functions and blocks:

```rust
async fn some_function() -> i32 { 
    // ...
}
```

or

```rust
async {
    // ...
}
```

`async` block or function return `Future`, which will not run on fact of creation, it must be 
triggered. To do so we can use `.await` method. After call of `.await` future is trying to complete
it's instructions, but if at some point it will be blocked, it will return control on thread it's
operating on. After blocking code will be ready, execution environment will return control on some
thread to the `Future` allowing to finish it's execution.

If the `Future` accepts some parameters with non `'static` lifetime, it will be bound to their lifetime.

To transform `Future` with custom lifetime reference to a `'static` lifetime there are some ways.

Using `async` blocks:

```rust
fn bad() -> impl Future<Output = u8> {
    let x = 5;
    borrow_x(&x) // ERROR: `x` does not live long enough
}

fn good() -> impl Future<Output = u8> {
    async {
        let x = 5;
        borrow_x(&x).await
    }
}
```

Using `move` it is possible to give an ownership on some variables to the `Future` allowing them to
live more that outer context:

```rust
async fn blocks() {
    let my_string = "foo".to_string();

    let future_one = async {
        // ...
        println!("{my_string}");
    };

    let future_two = async {
        // ...
        println!("{my_string}");
    };

    // Run both futures to completion, printing "foo" twice:
    let ((), ()) = futures::join!(future_one, future_two);
}

fn move_block() -> impl Future<Output = ()> {
    let my_string = "foo".to_string();
    async move {
        // ...
        println!("{my_string}");
    }
}
```

## Stream

`Stream` trait allows to emit multiple values before completion. It is like a combination of `Future`
and `Iterator`. For example `Receiver` for the channel type from the futures crate. It will yield `Some(val)` every time a value is sent from the `Sender` end, and will yield `None` once the `Sender` has been dropped and all pending messages have been received:

```rust
async fn send_recv() {
    const BUFFER_SIZE: usize = 10;
    let (mut tx, mut rx) = mpsc::channel::<i32>(BUFFER_SIZE);

    tx.send(1).await.unwrap();
    tx.send(2).await.unwrap();
    drop(tx);

    assert_eq!(Some(1), rx.next().await);
    assert_eq!(Some(2), rx.next().await);
    assert_eq!(None, rx.next().await);
}
```
 
It is possible to iterate on `Stream` like on `Iterator` with `map`, `filter`, `fold`, `try_map`, `try_filter` and `try_fold` as well as with `while let` loop. But it is not possible to use `for`
loop with a `Stream`.

```rust
async fn sum_with_next(mut stream: Pin<&mut dyn Stream<Item = i32>>) -> i32 {
    use futures::stream::StreamExt; // for `next`
    let mut sum = 0;
    while let Some(item) = stream.next().await {
        sum += item;
    }
    sum
}

async fn sum_with_try_next(
    mut stream: Pin<&mut dyn Stream<Item = Result<i32, io::Error>>>,
) -> Result<i32, io::Error> {
    use futures::stream::TryStreamExt; // for `try_next`
    let mut sum = 0;
    while let Some(item) = stream.try_next().await? {
        sum += item;
    }
    Ok(sum)
}
```

To iterate concurrently:

```rust
async fn jump_around(
    mut stream: Pin<&mut dyn Stream<Item = Result<u8, io::Error>>>,
) -> Result<(), io::Error> {
    use futures::stream::TryStreamExt; // for `try_for_each_concurrent`
    const MAX_CONCURRENT_JUMPERS: usize = 100;

    stream.try_for_each_concurrent(MAX_CONCURRENT_JUMPERS, |num| async move {
        jump_n_times(num).await?;
        report_n_jumps(num).await?;
        Ok(())
    }).await?;

    Ok(())
}
```

## Joining `Futures`

Unlike other languages, where it is possible to run several async tasks and after that await for
them all, in Rust this is not possible, because `Future` does not start to execute upon creation.
But if we will try to create several `Futures` one after another and await them they will execute 
sequentially and not concurrently.

When we run multiple `Futures` concurrently and need to wait until each of them will be completed,
we can use `futures::join` macro.

```rust
use futures::join;

async fn get_book_and_music() -> (Book, Music) {
    let book_fut = get_book();
    let music_fut = get_music();
    join!(book_fut, music_fut)
}
```

This allows for two `Futures` to be executed in parallel. `join` returns tuple with results of
all `Futures` passed into it.

If concurrent `Futures` return `Result<T>` it may be useful to use `try_join`. It will stop execution,
if some of the futures returned an error result.

All futures must have the same error type. To achieve this `.map_err(|e| ...)` and `.err_into()` functions from `futures::future::TryFutureExt` would be useful.

## Select

When running multiple `Futures` concurrently we need to wait only for the first completed of them,
we can use [`futures::select`](https://rust-lang.github.io/async-book/06_multiple_futures/03_select.html) macro:

```rust
use futures::{
    future::FutureExt, // for `.fuse()`
    pin_mut,
    select,
};

async fn task_one() { /* ... */ }
async fn task_two() { /* ... */ }

async fn race_tasks() {
    let t1 = task_one().fuse();
    let t2 = task_two().fuse();

    pin_mut!(t1, t2);

    select! {
        () = t1 => println!("task one completed first"),
        () = t2 => println!("task two completed first"),
    }
}
```

When first `Future` completes, all other stop their execution.

The basic syntax for `select` is `<pattern> = <expression> => <code>,`