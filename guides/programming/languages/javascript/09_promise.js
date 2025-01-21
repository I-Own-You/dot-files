// Promise - object wrapper for async code

// it has states,
// 1. 'pending'
// 2. 'fulfilled' for successfully executed
// 3. 'rejected' for executed but with errors:
function request(url) {
  return new Promise(function (resolve, reject) {
    let responseFromServer
    /*...*/
    resolve(responseFromServer)
  })
}
request('/api/users/1')
  // you can actually return a simple value, and not a promise,
  // it will autoconver into a promise and will send itself to the next promise
  .then((user) => user.id)
  .then((user) => request(`/api/photos/${user.id}/`))
  .then((photo) => request(`/api/crop/${photo.id}/`))
  .then((response) => console.log(response))
  // you can catch here the error from the promise chain, so if an error occurs,
  // the programm wont stop, and you will catch it
  .catch((error) => console.error(error))

// 'pending' state can be changed only once into 'fulfilled' or 'rejected':
const myPromise = new Promise(function (resolve, reject) {
  const data = getData() // make an async request
  resolve(data) // transfer the promise state into fullfilled, the return value will be data
})
const errorPromise = new Promise(function (resolve, reject) {
  // transfer the state of the promise into rejected, return will be the error object
  reject(new Error('error'))
})

// .catch() - will catch every then before it,
// if after catch is .then(), errors wont be catched

// if you need to create a promise from a known data, you can use Promise.resolve():
const happyDog = Promise.resolve('🐶')
happyDog.then(function (dog) {
  console.log(dog) // 🐶
})

// if you need .catch() on a well known data, then Promise.reject():
const sadDog = Promise.reject('🐶')
sadDog.catch(function (dog) {
  console.log(dog) // 🐶
})

// this way you can create a promise:
function earnAllMoney() {
  return new Promise(function (resolve, reject) {
    const result = tryEarnAllMoney() // async operation
    if (result.ok) {
      resolve(result) // success, transfer into fulfilled and return
    } else {
      reject(new Error(result)) // error, transfer promise into rejected
    }
  })
}

// if some async funciton works by callbacks, it will be better to wrap it into a promise:
function getData(onSuccess, onError) {
  setTimeout(function () {
    const result = Math.random()
    if (result > 0.5) {
      onSuccess(result)
    } else {
      onError(new Error('some erros'))
    }
  }, 1000)
}
//into this
function promisifiedGetData() {
  return new Promise(function (resolve, reject) {
    const result = getData(
      function (result) {
        resolve(result)
      },
      function (error) {
        reject(error)
      }
    )
  })
}
// now we can use it
promisifiedGetData()
  .then(function () {
    console.log('success')
  })
  .catch(function (err) {
    console.error(err.message)
  })

// promises can be joined together with this technique:
const promise = Promise.resolve(Promise.resolve(Promise.resolve('🐶'))) // Promise {<fulfilled>: '🐶'}
promise.then(console.log) // 🐶

// .then() - method used on promise that changed its state
// takes 2 callback function:
// onFullfill() - will be executed if state of the promise will be fullfilled,
//                it has 1 parameter that is the returned value
// onReject() - will be executed if the promise state will be rejected,
//              also takes a callback function and 1 parameter that is the info about the error
//
// the reject part isnt used often, only the first part, the errors are more catched in .catch()
getPasswords().then(
  function (result) {
    console.log('Все пароли:' + result)
  },
  function (err) {
    console.error(err.message)
  }
)
// another example
fetch('https://www.anapioficeandfire.com/api/houses')
  .then(function (response) {
    // will run when the response from the api is given
    // start the json parsing
    return response.json() // return the parsed json when its ready
  })
  .then(function (houses) {
    // will run when the json is parsed from above and returned
    return fetch(houses[0].overlord) // request some data
  })
  .then(function (response) {
    // will run when the fetched data is returned
    return response.json()
  })
  .then(function (overlord) {
    console.log(overlord.name)
  })

// .then() always return a promise

// .catch() - method to process the errors from promises:
// takes a callbacck with 1 parameter:
// onReject(), will be triggered if the promise state will be rejected:
getPasswords()
  .then(function (result) {})
  .catch(function (err) {
    alert(err.message)
  })
// a tricky example
const throwInSecond = new Promise(function (resolve, reject) {
  setTimeout(function () {
    throw new Error('time has passed')
  }, 1000)
})
throwInSecond.catch(function (err) {
  console.error(err.message)
  // 'time has passed'
})
// here,
// .catch() actually has .then(undefined, onReject) -> .catch(),
// this is because .then() is the head of the chain of this promise processing,

// always .catch() errors from promises, because if some got errors,
// and they are not catched, then an error is thrown and they stop working

// .finally() - will be called when a promise is either fullfilled or rejected
// takes a callback function(onDone) that will be triggered:
getPasswords().finally(function () {
  console.log('hehe')
})
// under the hood, .finally() is just a .then() where paramters are (onDone, onDone)
// like .then(onDone, onDone), just like .catch() is a .then() with (undefined, onReject)

// Promise.all() - a static method of Promise object that runs in parallel some promises and
// wait till they all are done,
//
// takes an iterable collection of promises(like promies in array) and
// returns a new promise in an iterable-like argument or rejected if at least 1 promise failed.
//
// it doesnt run promises in order, but returns values in order.
//
// if you pass an empty array of promises, the Promise.all() will be executed instantly
const myPromise1 = new Promise((resolve) => setTimeout(() => resolve(1), 5000))
const myPromise2 = new Promise((resolve) => setTimeout(() => resolve(2), 2000))
const myPromise3 = new Promise((resolve) => setTimeout(() => resolve(3), 1000))
Promise.all([myPromise1, myPromise2, myPromise3]).then(
  ([response1, response2, response3]) => {
    console.log(response1) // 1
    console.log(response2) // 2
    console.log(response3) // 3
  }
)

// if you pass not a promise into the array, it will anyway be executed with Promise.resolve():
const promise1 = new Promise((resolve) => setTimeout(() => resolve(1), 5000))
const number = 2
const obj = { key: 'value' }
Promise.all([promise1, number, obj]).then(
  ([response1, response2, response3]) => {
    console.log(response1) // 1
    console.log(response2) // 2
    console.log(response3.key) // 'value'
  }
)

// Promise.allSettled() - a static method of Promise object that runs in parallel some promises and
// wait till they all are done no matter of success or error status:
//
// takes an iterable collection of promises(like promies in array) and
// returns a new promise in an iterable-like argument
//
// doesnt run promises in order, but returns the value in order
const promises = [
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve, reject) => setTimeout(() => reject('error'), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]
Promise.allSettled(promises).then(([response1, response2, response3]) => {
  console.log(response1) // { status: 'fulfilled', value: 3 }
  console.log(response2) // { status: 'rejected', reason: 'error' }
  console.log(response3) // { status: 'fulfilled', value: 1 }
})

// Promise.any() - a static method of Promise object
//
// runs in parallel some promises and // wait till one of them is done, and returns it.
// if no one successed, then the error occurs.
// no matter how many will fail, it will wait just for at least one to success and returns it.
//
// takes an iterable collection of promises(like promies in array) and
// returns a new promise with first promise that succeded
//
// an empty array of promises will result in error

// Promise.race() - a static method of Promise object
//
// runs in parallel some promises and wait till one of them is done,
// no matter of success or failure, and returns it
//
// takes an iterable collection of promises(like promies in array) and
// returns a new promise with first promise that was faster

// an empty array of promises will result in state being in 'pending' state
