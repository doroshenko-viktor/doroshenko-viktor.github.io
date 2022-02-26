---
title: Rust Smart Pointers
date: "2022-02-26"
description: "Rust smart pointers definition, kinds and usecases."
---

`Smart pointers` are data structures that not only act like a pointer but also have additional 
metadata and capabilities.

e.g. `String` and `Vec<T>` are smart pointers. They own some memory and allow to manipulate it. 
They also have metadata (such as their capacity) and extra capabilities or guarantees (such as 
with `String` ensuring its data will always be valid `UTF-8`).

Smart pointers are usually implemented using structs. The characteristic that distinguishes a 
smart pointer from an ordinary struct is that smart pointers implement the `Deref` and `Drop` traits. 
The `Deref` trait allows an instance of the smart pointer struct to behave like a reference so 
you can write code that works with either references or smart pointers. The `Drop` trait allows 
you to customize the code that is run when an instance of the smart pointer goes out of scope.

Examples from standard library:

- `Box<T>` for allocating values on the heap
- `Rc<T>`, a reference counting type that enables multiple ownership
- `Ref<T>` and `RefMut<T>`, accessed through `RefCell<T>`, a type that enforces the borrowing 
  rules at runtime instead of compile time

## Box<T>

Boxes allow you to store data on the heap rather than the stack. What remains on the stack is the 
pointer to the heap data.

They are used mostly for:

- When you have a type whose size can’t be known at compile time and you want to use a value of 
  that type in a context that requires an exact size
- When you have a large amount of data and you want to transfer ownership but ensure the data 
  won’t be copied when you do so
- When you want to own a value and you care only that it’s a type that implements a particular 
  trait rather than being of a specific type

```rust
fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
}
```

At compile time, Rust needs to know how much space a type takes up. One type whose size can’t be 
known at compile time is a recursive type, where a value can have as part of itself another value 
of the same type. Because this nesting of values could theoretically continue infinitely, Rust 
doesn’t know how much space a value of a recursive type needs. However, boxes have a known size, 
so by inserting a box in a recursive type definition, you can have recursive types.

## Linked List

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));
}
```

## Deref Trait

Implementing the `Deref` trait allows to customize the behavior of the dereference operator `*`.

A regular reference is a type of pointer, and one way to think of a pointer is as an arrow to a 
value stored somewhere else.

```rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

The variable `x` holds an `i32` value, `5`. We set `y` equal to a reference to `x`. We can assert 
that `x` is equal to `5`. However, if we want to make an assertion about the value in `y`, we have 
to use `*y` to follow the reference to the value it’s pointing to (hence dereference). Once we 
dereference `y`, we have access to the integer value `y` is pointing to that we can compare with `5`.

Comparing a number and a reference to a number isn’t allowed because they’re different types. We must use the dereference operator to follow the reference to the value it’s pointing to.

It is possible to rewrite this code with `Box<T>`:

```rust
fn main() {
    let x = 5;
    let y = Box::new(x);

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

## Custom Smart Pointers

```rust
use std::ops::Deref;

struct MyBox<T>(T);

impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}

impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
```

Rust substitutes the `*` operator with a call to the `deref` method and then a plain dereference 
so we don’t have to think about whether or not we need to call the deref method.

Deref coercion is a convenience that Rust performs on arguments to functions and methods. 
Deref coercion works only on types that implement the Deref trait. Deref coercion converts such 
a type into a reference to another type. For example, deref coercion can convert `&String` to `&str` 
because `String` implements the `Deref` trait such that it returns `&str`. Deref coercion happens 
automatically when we pass a reference to a particular type’s value as an argument to a function 
or method that doesn’t match the parameter type in the function or method definition. A sequence 
of calls to the deref method converts the type we provided into the type the parameter needs.

Example of deref coercion:

```rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}

fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&m);
}
```

Similar to immutable references, you can use the `DerefMut` trait to override the `*` operator 
on mutable references.

Rust does deref coercion when it finds types and trait implementations in three cases:

- From `&T` to `&U` when `T: Deref<Target=U>`
- From `&mut T` to `&mut U` when `T: DerefMut<Target=U>`
- From `&mut T` to `&U` when `T: Deref<Target=U>`

The first two cases are the same except for mutability. The first case states that if you have a 
`&T`, and `T` implements `Deref` to some type `U`, you can get a `&U` transparently. The second 
case states that the same deref coercion happens for mutable references.

## Drop

`Drop`, which lets you customize what happens when a value is about to go out of scope. You can 
provide an implementation for the Drop trait on any type, and the code you specify can be used to 
release resources like files or network connections. For example, when a `Box<T>` is dropped it 
will deallocate the space on the heap that the box points to.

```rust
struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created.");
}
```

this will print:

```log
CustomSmartPointers created.
Dropping CustomSmartPointer with data `other stuff`!
Dropping CustomSmartPointer with data `my stuff`!
```

Variables are dropped in the reverse order of their creation, so `d` was dropped before `c`.

## Reference Counted Smart Pointers

`Rc<T>` - reference counted smart pointer allows to have multiple ownership on same entity.
The `Rc<T>` type keeps track of the number of references to a value to determine whether or not 
the value is still in use. If there are zero references to a value, the value can be cleaned up 
without any references becoming invalid.

**`Rc<T>` is only for single threaded usecase**

Example of the problem:

```rust
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List::{Cons, Nil};

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a));
    let c = Cons(4, Box::new(a));
}
```

This code will not compile, because here multiple ownership of `a` occures, which is not allowed.

Fix it with `Rc<T>`:

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}
```

Every time we call `Rc::clone`, the reference count to the data within the `Rc<List>` will 
increase, and the data won’t be cleaned up unless there are zero references to it.

The call to `Rc::clone` only increments the reference count, which doesn’t take much time. Deep 
copies of data can take a lot of time. By using `Rc::clone` for reference counting, we can visually 
distinguish between the deep-copy kinds of clones and the kinds of clones that increase the 
reference count.

```rust
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

This will result in:

```rust
count after creating a = 1
count after creating b = 2
count after creating c = 3
count after c goes out of scope = 2
```


