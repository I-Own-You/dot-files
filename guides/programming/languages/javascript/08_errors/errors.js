// error handling:
try {
  someFunction()
  anotherFunction()
} catch (err) {
  console.log('Поймали ошибку! Вот она: ', err.message)
}

// you can always execute some code no matter of try and catch code with finally:
try {
  webSocket.connect('ws://....')
  callMayThrowError()
} catch (err) {
  // catch error
  doSomeWithError(err)
} finally {
  // will execute no matter what
  // always executes
  webSocket.disconnect('ws://....')
}

try {
  webSocket.connect('ws://....')
  callMayThrowError()
} finally {
  // can be used without catch block
  // always executes
  webSocket.disconnect('ws://....')
}

// you can also throw errors by yourself:
class ParsingError extends Error {
  //
}
function parse(data) {
  try {
    parseData(data)
  } catch (err) {
    if (err.name !== 'ParsingError') {
      // another type of error so we rethrow
      throw err // throw error, and the outside catch will take it, if an outside catch exists
    }
    logError(err)
  }
}

// works in synchronic way,
// so you cant catch async code, untill try catch is itself in sync function like async/await:
try {
  // no errors
  Promise.reject('err')
} catch (e) {
  // the errro wont be catched
  console.log('Ошибка', e)
}
try {
  // no errors
  setTimeout(() => {
    throw Error('ошибка')
  }, 1000)
} catch (e) {
  // error from setTimeout wont be catched here
  console.log('Ошибка', e)
}
//
async function handlePromise() {
  try {
    // promise will return error
    await Promise.reject('err')
  } catch (e) {
    // the error will be catched
    console.log('error:', e) // err
  }
}
handlePromise()

// Error - common error constructor, returns an object with 2 attributes:
// message - human readable error info
// name - the class error name
const commonError = new Error('my error')
console.log(commonError.message) // 'my error'
console.log(commonError.name) // 'Error'

// buitin errors: (there are more)
// SyntaxError, ReferenceError, TypeError, RangeError, URIError,
// EvalError(deprecated, compatibility mode), InternalError(its a engine js error, not used by programmers)

// you can create your own errors:
class WrongDataTypeForSumError extends Error {
  constructor(message) {
    super(message)
    this.name = 'WrongDataTypeForSumError'
  }
}
const myCustomError = new WrongDataTypeForSumError('my error')
//throw created error:
function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new WrongDataTypeForSumError('my error')
  }
  return a + b
}
console.log(sum('1', 2))
// VM840:3 Uncaught WrongDataTypeForSumError: my error
// at sum (<anonymous>:3:11)
// at <anonymous>:9:13
// WrongDataTypeForSumError @ VM830:3
// sum @ VM840:3
// (anonymous) @ VM840:9
