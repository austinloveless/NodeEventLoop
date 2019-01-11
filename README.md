# NodeEventLoop

In this repository, I have 4 files laid out to display different examples
of what/how the NodeEventLoop works.

1.  The loop.js file mocks the event loop with a while loop, and
    has comments to tell you what is going on.

2.  The threads.js file is used to display how some modules in Node are not
    single threaded commands. Node is not entirely single threaded. If you
    run the code you can see that by default 4 of the Crypto commands run at the same time. By default the ThreadPool is 4, but can be increased with process.env.UV_THREADPOOL_SIZE.

3.  The async.js file shows that HTTPS requests don't use the ThreadPool at all. HTTPS goes directly to the OS, and is finished very rapidly.

4.  The multitask.js file is a trickier one. It shows a combination of the threads.js file and async.js file together, and how those functions respond. The HTTPS call finishes first, because it goes straight to the OS. Then the FS and Crypto calls all go into the ThreadPool. The response back is one Crypto call then the FS then the rest of the Crypto calls. This is because the FS goes into the ThreadPool with the rest of the calls, and has to hit the HD. Due to the FS hitting the HD the threads decided to finish the Crypto calls, and once one of those calls is complete then that thread picks back up the FS and finishes that call. Then the rest of the Crypto calls complete.
