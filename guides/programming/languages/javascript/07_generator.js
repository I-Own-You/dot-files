// generators - a way to generate and return values one by one, rather than all ot once:
function* generateSequence() {
  yield 1
  yield 2
  return 3
}
// generator - becomes an object of generator with 2 attributes { value: any, done: booleans}
let myGenerator = generateSequence()
let one = myGenerator.next() // {value: 1, done: false}

// function* a() is the same as function *a(), but the first variant is better

// make an generator from an iterator:
let myRange = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() {
    // [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value
    }
  },
}
alert([...myRange]) // 1,2,3,4,5

// you can use for..of for to get all the items, becaue generator is an iterable as well:
function* generateSequence() {
  yield 1
  yield 2
  return 3
}
let yetAnotherGenerator = generateSequence()
for (let value of yetAnotherGenerator) {
  alert(value) // 1, 2, but not 3,
  //               because return 3 has already done: true,
  //               so you need to change from return to yield 3 to work
}

// you can also have a composition of generators,
// basically waitning for a generator to finish execuiton inside a generator:
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i
}
function* generatePasswordCodes() {
  yield* generateSequence(48, 57) // 0..9
  yield* generateSequence(65, 90) // A..Z
  yield* generateSequence(97, 122) // a..z
  // same as
  // for (let i = 48; i <= 57; i++) yield i;
  // for (let i = 65; i <= 90; i++) yield i;
  // for (let i = 97; i <= 122; i++) yield i;
}
let str = ''
for (let code of generatePasswordCodes()) {
  str += String.fromCharCode(code)
}
alert(str) // 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz

// we can also pass arguments to our generators, and to do something with it within:
function* gen() {
  let result = yield '2 + 2 = ?' // (*)
  alert(result)
}
let otherGenerator = gen()
let myQuestion = otherGenerator.next().value // "2 + 2 = ?"
// here wont be something, but in the generator will be alert(4), because the result = yield 4
otherGenerator.next(4)

// another one, more complex
function* gen() {
  let ask1 = yield '2 + 2 = ?'
  alert(ask1) // 4
  let ask2 = yield '3 * 3 = ?'
  alert(ask2) // 9
}
let anotherMyGenerator = gen()
alert(anotherMyGenerator.next().value) // "2 + 2 = ?"
alert(anotherMyGenerator.next(4).value) // "3 * 3 = ?"
alert(anotherMyGenerator.next(9).done) // true

// you can also throw errors into generators like values:
function* gen() {
  try {
    let result = yield '2 + 2 = ?' // (1)
    alert(
      'the code wont reach here because the error will be\
           passed above to yield, so it goes to catch section'
    )
  } catch (e) {
    alert(e) // will execute
  }
}
let generator = gen()
let question = generator.next().value
generator.throw(new Error('Ответ не найден в моей базе данных')) // (2)

// asynchronous generators:
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    yield i
  }
}
;(async () => {
  let generator = generateSequence(1, 5)
  for await (let value of generator) {
    alert(value)
  }
})()
// also generator.next() now is async,
// so we need await for it,like: const result = await generator.next()

// async generator from iterator:
let range = {
  from: 1,
  to: 5,
  async *[Symbol.asyncIterator]() {
    // samae as [Symbol.asyncIterator]: async function*()
    for (let value = this.from; value <= this.to; value++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      yield value
    }
  },
}
;(async () => {
  for await (let value of range) {
    alert(value) // 1, потом 2, потом 3, потом 4, потом 5
  }
})()
