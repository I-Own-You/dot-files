// all primitive types are actually wrapped by its classes objects, Number(), String(), .etc,
// so it means you can wrap primitives with its classed and have methods on it,
// variables that containt primitives also have some methods, but limited amount.
const exampleA = 2 // same as Number(2), but not const a1 = Number(2), in this case its an object of Number class

// == - used to check values, === - used to check values and types also
console.log(2 == '2') // true
console.log(2 === '2') // false

// statements can be split with ;, actually every line must have ;, but times changed,
// and now js code can be handled without them

// expressions can be split with ','(comma operator, it evaluates all the statements on one line):
function x() {
  return 1
}
function z() {
  return 2
}
x(), z() // 2
// x() and z() will execute form left to right but only the last will return the result

// primitive values are compared by its values
const primitiveA = 2
const primitiveB = '2'
// true, but they differ right ? this is why you must always use ===(triple equal),
// it checks for both value and type
console.log(primitiveA == primitiveB)

// window - a global object in browser, you can think of a browser itself as window, or global in nodejs
// you can access variables defnied with var like this: var a = 1,
// window.a, but you cant access let and const like this
var myWindowVar = 1
console.log(window.myWindowVar)

// 'use strict' - turns on the strict mode so that javascript gets less error prone and less confuse.
// it must be put on the first line of the file, cant be turned off after it.
// can be put also in functions, or other blocks to turn it on on specific scope.
// in strict mode you cant:
//    1. declare a variable without let, const, var
//    2. delete an attribute of an object, if it doesnt exist
//    3. reassign a value to an attribute of an object if it has writable=false descriptor
//    4. cant use the same name for paramteres in functions
//    5. [this] is no longer attached to global/window object
//    6. cant use some reserved keys like: import, yield, let, .etc
// you can use 'use strict' after some code, but it wont turn on the strict mode.
// above 'use strict' can be placed only comments.

// spread syntax ... - used to make an array in function parameters,
// copy objects inside another, copy an array, destructurizing an array
function multiplyThreeNumbers1(a, b, c) {
  return a * b * c
}
const multipleNums = [1, 2, 3]
console.log(multiplyThreeNumbers1(...multipleNums)) // 6
//
const donor = ['a', 'b', 'c']
const newArray = [...donor, 'd', 'e', 'f']
console.log(newArray) // ['a', 'b', 'c', 'd', 'e', 'f']
//
const persona = { name: 'a', lastName: 'b' }
const userData = { ...persona, username: 'killer3000' }
//
console.log(userData)
// {
//    name: 'a',
//    lastName: 'b',
//    username: 'killer3000'
// }

// javascript copies elements only on one level(shallow copy), it doesnt have tools to deep copy
//
// one way to deep copy in nodejs is structuredClone(items):
const deepExample = structuredClone(itemsInCart)
console.log(itemsInCart[1] === deepExample[1]) // false
// another way to deep copy is lodash library:
import cloneDeep from 'lodash.clonedeep'
const lodashDeep = cloneDeep(itemsInCart)
console.log(itemsInCart[1] === lodashDeep[1]) // false
// another way is making a json format and then parse it,
// but it has some restrictions like(undefined, funciton, Symbol cant be jsoned.
// for arrays, the values will become null, for objects values wont be at all,
// and if a key is [symbol] type, it will be ignored)
const deep = JSON.parse(JSON.stringify(itemsInCart))
console.log(itemsInCart[1] === deep[1]) // false

// (?., ?.(), ?.[]) optional checking and returning undefined if the left part doesnt exist:
let optUser = {}
alert(optUser?.address?.street) // undefined
//
let anotherOptUser = null
let x = 0
anotherOptUser?.sayHi(x++) // no executing because user is null, wihtout ? would throw an error
alert(x) // 0
//
let userAdmin = {
  admin() {
    alert('Я админ')
  },
}
//
let userGuest = {}
userAdmin.admin?.() // will work
userGuest.admin?.() // wont work,  this method doesnt exist, as object as well
//
let key = 'firstName'
let user1 = {
  firstName: 'John',
}
let user2 = null
alert(user1?.[key]) // John
alert(user2?.[key]) // undefined
//
delete someUser?.name // will delete the attribute if user object exist

// get a type from a variable/value
// typeof [variable/value] === '[type]' -- return true/false
// [variable/value] instanceof [type] -- return true/false
const checkTypeOfVar = 'a'
if (typeof checkTypeOfVar == 'string') console.log(true)
if (typeof 'a' == 'string') console.log(true)
class Ala {}
const alaObj = new Ala()
if (alaObj instanceof Ala) console.log(true)
