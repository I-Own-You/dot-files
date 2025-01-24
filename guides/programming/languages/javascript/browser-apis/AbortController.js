// AbortController is a global class in JavaScript that you can use to abort any async operation.
const controller = new AbortController()
// the signal property, which is an instance of AbortSignal.
// this is a pluggable part you can provide to any API to react to an abort event,
// and implement it accordingly.
controller.signal
// the .abort() method that, when called, triggers the abort event on the signal.
// it also updates the signal to be marked as aborted.
controller.abort()
// the abort handling comes down to listening to the abort event and implementing the abort.
controller.signal.addEventListener('abort', () => {
  // Implement the abort logic.
})

// event listeners
//
// you can provide an abort signal when adding an event listener for it to be
// automatically removed once the abort happens.
const myController = new AbortController()
window.addEventListener('resize', listener, { signal: controller.signal })
// calling controller.abort() removes the resize listener from the window.
myController.abort()
//
// const listener = () => {}
// window.addEventListener('resize', listener)
// window.removeEventListener('resize', listener)
//
const elController = new AbortController()
window.addEventListener('resize', () => {}, { signal: controller.signal })
elController.abort()
//
// you can pass controller anywhere taht is responsible for aborting.
//
// you can use a single signal to remove multiple event listeners:
useEffect(() => {
  const controller = new AbortController()

  window.addEventListener('resize', handleResize, {
    signal: controller.signal,
  })
  window.addEventListener('hashchange', handleHashChange, {
    signal: controller.signal,
  })
  window.addEventListener('storage', handleStorageChange, {
    signal: controller.signal,
  })

  return () => {
    // Calling `.abort()` removes ALL event listeners
    // associated with `controller.signal`. Gone!
    controller.abort()
  }
}, [])

// fetch requests
//
// once the abort event on the signal is emitted,
// the request promise returned from the fetch() function will reject, aborting the pending request.
function uploadFile(file: File) {
  const controller = new AbortController()
  const response = fetch('/upload', {
    method: 'POST',
    body: file,
    // Provide the abort signal to this fetch request
    // so it can be aborted anytime be calling `controller.abort()`.
    signal: controller.signal,
  })

  // the returned controller can be used to abort the response, for example with a button,
  // click or whatever.
  return { response, controller }
}

// node http requests supports AbortController as well.

// AbortSignal class has some helpful static methods:
// 1. AbortSignal.timeout(ms)
//    when certain amount of milliseconds pass, the signal gets aborted, thus,
//    cancelating the process, no need for AbortCtronller instance.
fetch(url, {
  signal: AbortSignal.timeout(3000),
})
// 2.  AbortSignal.any()
//     giving more than 1 controllers, it waits untill first aborts, any other aborts are ignored.
const publicController = new AbortController()
const internalController = new AbortController()
channel.addEventListener('message', handleMessage, {
  signal: AbortSignal.any([publicController.signal, internalController.signal]),
})

// Streams
const stream = new WritableStream({
  // controler here is the same AbortSignal
  write(chunk, controller) {
    controller.signal.addEventListener('abort', () => {
      // Handle stream abort here.
    })
  },
})
const writer = stream.getWriter()
// when calling this, the controller in write() will call controller.signal.abort event
await writer.abort()

// anything can be abortable
import { TransactionRollbackError } from 'drizzle-orm'
function makeCancelableTransaction(db) {
  return (callback, options = {}) => {
    return db.transaction((tx) => {
      return new Promise((resolve, reject) => {
        // if signal passed as options{}, is aborted, this event is fired
        options.signal?.addEventListener('abort', async () => {
          reject(new TransactionRollbackError())
        })
        return Promise.resolve(callback.call(this, tx)).then(resolve, reject)
      })
    })
  }
}
const db = drizzle(options)
const dbController = new AbortController()
const transaction = makeCancelableTransaction(db)
await transaction(
  async (tx) => {
    await tx
      .update(accounts)
      .set({ balance: sql`${accounts.balance} - 100.00` })
      .where(eq(users.name, 'Dan'))
    await tx
      .update(accounts)
      .set({ balance: sql`${accounts.balance} + 100.00` })
      .where(eq(users.name, 'Andrew'))
  },
  // this goes to the transaction callback as options{}
  { signal: dbController.signal }
)

// you can pass the reason of abort
const reasonController = new AbortController()
reasonController.signal.addEventListener('abort', () => {
  console.log(controller.signal.reason) // "user cancellation"
})
// here, you can pass any values, strings, errors, objects, .etc
reasonController.abort('user cancellation')

// you can check if a signal is aborted
console.log(reasonController.signal.aborted === true)

// you can thow an error explicitly if a signal was aborted
reasonController.signal.throwIfAborted()
