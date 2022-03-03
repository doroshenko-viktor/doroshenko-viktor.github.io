# Rust Concurrency

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


## References

- [Using Threads to Run Code Simultaneously](https://doc.rust-lang.org/stable/book/ch16-01-threads.html)
- [Operating System - Processes](https://www.tutorialspoint.com/operating_system/os_processes.html)
