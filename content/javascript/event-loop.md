---
title: JavaScript Event Loop
date: "2022-06-18"
description: "In depth overview of JS event loop"
---

`JavaScript` is a generally single threaded programming language. It is possible to achieve some level 
of concurrency with working threads. But anyway, to run them whole new runtime will be risen.
This way any long processing will block execution of whole program. But some long running tasks do not
require CPU computation. In their count for example `IO` operations and timeouts or handling events. 
While waiting for a database response, program could continue some of it's processes.

Event loop in `JS` allows to perform such operations asynchronously. In simple words program can start
such long running task, which does not require CPU computation give it to the environment and immediately
continue to work on further instructions not waiting for completion of this task. Environment takes care of
completing task and once it happened return the result to main program through event loop. Tasks taken by 
environment are executed in separate threads, but outside of main program runtime. This way program single threaded runtime called `main thread`.

`JS environment` may differ from the context of execution. It may be a browser api for the frontend or 
`libuv` in `node.js`.

## How It Works In Details

Simplest example:

```js
console.log('1');

setTimeout(() => {
    console.log('2');
}, 0);

console.log('3');
```

Here `console.log('1');` is a synchronous function call, which will be executed immediately and print `1`
into the console. Next instruction `setTimeout` is asynchronous function call. It will create a task
in the environment, which should wait for a given period of time(in this case 0 seconds) and run code inside
of a given callback function.

As `setTimeout` is an `async` function, it's only job is to create a task in the `JS` environment. Our program
will do only this on it's way and will go to the next instruction.

*And it does not matter that, timeout is 0, the way is always the same - create task and go further.*

Next instruction is `console.log('3');`, which is also synchronous and will print `3` to the console.

Now we have following output in our console:

```txt
1
3
```

But program didn't finish it's execution. We still have task, created by `setTimeout`. It is running in
parallel to the main program inside of `JS` environment. And while timeout was 0 it is already completed.
But to print `2` to the console it should go through couple of steps in event loop.

Event loop is kind of a `FIFO queue`. When `async` task is finished, environment places result callback to 
the end of the event loop. When current call stack is empty, our program checks, if something appeared in 
the event loop. If it is not empty first or in another words oldest item will be taken and placed to the 
call stack.

On this step, when two `console.log` instructions have already been executed and printed `1` and `3`,
call stack of our program is empty. So it checks if there is something in the event loop. And luckily
there is a task to call function:

```js
() => {
    console.log('2');
}
```

Which was provided to `setTimeout` when main program executed it and then, after async task has been 
completed placed to the event loop by the environment. Now main program moves it to the stack and executes
`console.log('2');` instruction, which will print `2` to the console.

## Events

When some events happening, they don't go directly to call stack. Same as with async tasks all events go
through event loop queue. For example, if `onclick` event risen after button click it is queued in event
loop. Which means that it will be handled only after current call stack will be cleared. This may be a
reason of delays of event handling if we are blocking main thread.

## Browser Rendering

Browser renders displaying picture also as a part of an event loop. 

Same as for events applies to rendering. There are several steps browser makes to render a picture on a
display. But these steps are also a part of the event loop. So if we run blocking code in the stack, rendering
also could stuck.

Rendering steps are:
- `style` - calculate colors, sizes, fonts and other `css` and assign them to elements
- `layout` - apply position to all elements
- `paint` - using graphics library, create precise image

Result of these steps is `Frame` - array of pixels, which will be directly displayed on the user screen. 
If the `DOM` has been changed, browser has to execute all 3 steps and regenerate `Frame`.

But while rendering steps are part of event loop, they have higher priority than other tasks. Event if event
queue already contains some scheduled events, rendering steps will be performed before them.

Ideally when there is no blocking tasks, render steps are executed 60 times per second.

### requestAnimationFrame

If you need to make a changes related to rendering to the display it there is a special method for this - 
`requestAnimationFrame`. It is called immediately before rendering steps. The reason, why it is better to
use this method, instead of queuing a task - it is predictable. It runs regularly with target to create
60 frames per second. Task can be executed in event loop in any time causing uncontrollable behavior of a
picture. Tasks may cause rerendering with a random frame rate.

For example, using `setTimeout` for animation we may schedule several update per single frame, which is a
waste of a computational power. Moreover, as this is not designed for animation event if we trying to
schedule tasks to recalculate picture once per frame, there still could be some misses, e.g. garbage 
collection started and such task will not hit necessary frame, but on the next frame we will have two 
calculations.

## References

- https://www.youtube.com/watch?v=8aGhZQkoFbQ
- https://www.youtube.com/watch?v=cCOL7MC4Pl0
- https://javascript.info/event-loop