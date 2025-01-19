// functions can be created in different ways:
// 1. function declaration: (this way the function is hoisted and we can use it above its initialization)
helloFuncDeclr('a') // ok
function helloFuncDeclr(name) {
  console.log(`hello ${name} 😊`)
}
// 2. function expression: (this way we would get an error if we used it above its initialization)
helloFuncExpr('a') // error
const helloFuncExpr = function (name) {
  console.log(`hello ${name} 😊`)
}
// 3. anonymous function:
// harder to debug because they dont have name, and only numbers of lines will be displayed
// function() {}

// 4. arrow functions: (they do not have function context)
const dividerAnonFunc1 = (number) => number / 2 // you can get rid of paranthesis of argument if its one
const dividerAnonFunc2 = (number) => {
  const someNumber = 2
  return number / 2 + someNumber
}

// 5. IIFE (immediately invoked function expression),
// they have its own scope, so no conflicts can be made:
;(function () {
  let name = 'a'
  console.log(name)
})()
let resultiife = (function () {
  // the return value is assigned and not the function, so the function is executed right away
  let name = 'a'
  return name
})()

// to return an object you must put it in (), if arrow function is without { }
const arrowFuncWithCurrly = () => ({ cat: 'alo' })

// you can also pass functions as arguments in other functions:
function makeCouple(recipe) {
  const gree = 'green '
  const re = 'red'
  return recipe(gree, re)
}
const result = makeCouple(function (one, two) {
  return one + two
})
console.log(result) // green red

// a variable that is assigned with a function that returns nothing is undefined,
// because a function that has no return, returns undefined implicitly
function A() {}
let a = A() // a = undefined

// functions are (first class object/citizen)
// because it can be passed as argument to a function,
// it can be assigned to a variable and returned within a function

// function arguments are also passed by reference if its an object

// functions crete their own scopes, if a function inside another function will create a variable,
// we cant access it from outside:
function outer() {
  // {} - creats a block scope
  function inner() {
    const a = 42
  }
  console.log(a) // error
}

// closure:
// (we can hide values and operate with it from functions, because we can access it.
// also we can assign return result to multiple variables so they will have all copies of the closure,
// and the value of functions will be separate for all variables)
function counter() {
  let state = 0
  function increase() {
    state++
  }
  function decrease() {
    state--
  }
  function valueOf() {
    console.log(state)
  }

  return {
    increase,
    decrease,
    valueOf,
  }
}
const tick1 = counter()
const tick2 = counter()
tick1.valueOf() // 0
tick2.valueOf() // 0
tick1.increase()
tick1.valueOf() // 1
tick2.valueOf() // 0
tick1.increase()
tick1.valueOf() // 2
tick2.valueOf() // 0
tick2.increase()
tick1.valueOf() // 2
tick2.valueOf() // 1
tick2.decrease()
tick1.valueOf() // 2
tick2.valueOf() // 0

// if you dont specify an argument for a parameter in a function, it will work,
// but the type of the argument will be nothing

// arguments - a way to achieve all the parameters when they were passed as an array,
// it is used only in es5 or older:
function joinStrings() {
  const strings = []
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      strings.push(arguments[i])
    }
  }
  return strings.join(' ')
}
const argResult = joinStrings('hello', 12, 'world', false, null)
console.log(argResult) // hello world

// you can call a function without parameters,
// but pass arguments to it and call them with arguments keyword

// arrow funcitons dont have arguments keyword passed into them

// arguments is an array like object, it has .length method, you can access its elements by index also

// also you can destructurize an array like this:
function myHandler(...[, second, third]) {
  console.log(`number = ${second}`)
  console.log(`number = ${third}`)
}
myHandler(1, 2, 3)
// number 2
// number 3
