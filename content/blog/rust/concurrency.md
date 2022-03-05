---
title: Rust Concurrency
date: "2022-03-05"
description: "Rust concurrency model and message passing"
---

Modern operating systems manage programms execution with `processes`.

`Process` - is a basic unit of work to be implemented in a operatin system.

The OS takes a program as a set of instructions and run all it's instructions in context of some
process. Each process has it's own `stack` and `heap`.

Within one `process` program can run multiple threads.

`Thread` - is a smallest sequence of instructions, that can be managed independently by OS scheduler.

Multiple thread of one process share this process's heap.

Multithreaded execution may have several problems:

- `Race conditions`, where threads are accessing data or resources in an inconsistent order
- `Deadlocks`, where two threads are waiting for each other to finish using a resource the other 
  thread has, preventing both threads from continuing
- Bugs that happen only in certain situations and are hard to reproduce and fix reliably

Usually OS gives an public interface to create new threads. Usin it called `1:1` - one program 
thread for one OS thread. Some languages have their own implementation of threads, where it is not 
necessary one to one relationship between language and OS threads amount. Such threads called 
`grean threads`. It is `M:N` model, where `M` is amount of green threads and `N` is an amount of
OS threads.

Rust standard library provides only `1:1` model in order to have smaller runtime.

## Creating Threads

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
```

*all started threads will be eventually stopped or when they will execute all their instructions or when main thread will be stopped*

To ensure all threads finished correctly, use `join`:

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}
```

Calling `handle.join()` blocks main thread's execution until this `handle` thread will be finished.

### Outer Context

Rust can not infer, how long thread will live, so following will not work:

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(|| {
        println!("Here's a vector: {:?}", v);
    });

    drop(v); // oh no!

    handle.join().unwrap();
}
```

This can be solved my moving ownership to the thread context with `move` closure:

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

But in this case after thread has started, we don't have access to `v` vector, because it has 
already been moved.


## Synchronization

### Message Passing

`Message passing` - threads or actors communicate by sending each other messages containing data.
As an implementation of this concept Rust uses `channels`.

Channel consists of two parts:

- `transmitter` - is an upstream where source data is sent.
- `receiver` - is a target location of data.

Channel is closing when closing either `transmitter` or `receiver`.

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

`mpsc` stands for multiple producer, single consumer. Channel can have multiple sending ends that 
produce values but only one receiving end that consumes those values. The `mpsc::channel` function 
returns a tuple, the first element of which is the sending end and the second element is the 
receiving end. The abbreviations `tx` and `rx` are traditionally used in many fields for 
transmitter and receiver respectively, so we name our variables as such to indicate each end.

We move transmitter to the new thread and send a value into it from this thread. The spawned thread 
needs to own the transmitting end of the channel to be able to send messages through the channel.
The send method returns a `Result<T, E>` type, so if the receiving end has already been dropped 
and there’s nowhere to send a value, the send operation will return an error.

Then we are able to receive sent value in the main thread with receiver instance.

`recv`, short for receive, which will block the main thread’s execution and wait until a value is 
sent down the channel. Once a value is sent, recv will return it in a `Result<T, E>`. When the 
sending end of the channel closes, recv will return an error to signal that no more values will be 
coming.

The `try_recv` method doesn’t block, but will instead return a `Result<T, E>` immediately: an `Ok` 
value holding a message if one is available and an `Err` value if there aren’t any messages this 
time. Using `try_recv` is useful if this thread has other work to do while waiting for messages: 
we could write a loop that calls `try_recv` every so often, handles a message if one is available, 
and otherwise does other work for a little while until checking again.

## References

- [Using Threads to Run Code Simultaneously](https://doc.rust-lang.org/stable/book/ch16-01-threads.html)
- [Operating System - Processes](https://www.tutorialspoint.com/operating_system/os_processes.html)
- [Using Message Passing to Transfer Data Between Threads](https://doc.rust-lang.org/stable/book/ch16-02-message-passing.html)
