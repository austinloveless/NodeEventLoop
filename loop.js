//node myFile.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

//New timers, tasks, operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: Any pending OS tasks? (Like server listening to port)
  // Check three: Any pending long running operations? (Like fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

//Entire body executes in one "tick"
while (shouldContinue()) {
  // 1) Node looks at pendingTimers(setTimeout, setInterval) and sees if any functions
  // are ready to be called.
  // 2) Node looks at pendingOSTasks and pendingOperations(Like server listening to port, or Like fs module)
  // and calls relevant callbacks
  // 3) Node pauses execution. Continues whenever a new event occurs...
  // - a new pendingOSTasks is done
  // - a new pendingOperation is done
  // - a timer is about to complete
  // 4) Node looks at pendingTimers. Calls any setImmediate
  // 5) Handle any 'close' events
}

//exit back to terminal
