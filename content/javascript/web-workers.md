---
title: JavaScript Web Workers
date: "2022-06-03"
description: "JS concurrency model"
---

`Web worker` is a separate JS thread, working in parallel with the main thread and communicating with
it using messaging system.

In browser to create web worker, we need to have two separate JS files. For example `app.js` and 
`worker.js`. This is required, because these files will be executed in separate threads. And also
worker js file will be required to create worker object.

To to that, add following code to the `app.js` file:

```js
let worker = new Worker('./worker.js');

worker.addEventListener('message', (event) => {
    console.log(`Worker said: ${event.data}`);
})

console.log('Saying "Hi" to worker');
worker.postMessage('Hi, worker!');

setTimeout(() => {
    console.log('Requesting worker\'s status');
    worker.postMessage('Hey, worker, how\'s it going?');

    setTimeout(() => {
        console.log('Signalling about end of workday');
        worker.postMessage('Work day is over');
    }, 100);
}, 100);
```

and to the `worker.js`:

```js
addEventListener('message', (event) => {
    if (isWorkOver(event.data)) {
        postMessage('Bie, until tomorrow!');
        return close();
    }

    var response = getResponse(event.data);
    postMessage(response);
});

function isWorkOver(message) {
    return message === 'Work day is over';
}

function getResponse(message) {
    if (message === 'Hi, worker!') {
        return 'Hi, main!';
    } else {
        return 'I\'m working...';
    }
}
```

Here main thread sends to worker different messages and has an event listener for worker's messages.

Important to note, that workers have separate call stack and heap, so passing messages send a copy
of data. It is not possible to share data by reference.

To test it locally better to use some server, because it is not possible to run workers from local
file system by security concerns. At least in Chrome.

