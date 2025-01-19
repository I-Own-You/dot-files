// object - a set of attribues with its values,
// attribute can be number, string, symbol,
// value can be whatever
const anObject = {}
const bookObject = {
  title: 'heelo',
  kittens: ['Беляш', 'Михаил', 'Чарли'],
  favoriteToy: {
    name: 'мячик',
    size: 'маленький',
    meow: function () {
      console.log('мяу мяу')
    },
  },
}

// you can add object attributes and after initialization of the object:
const someCat = {}
someCat.name = 'Simon'
someCat.gender = 'male'
someCat.color = 'brown'
someCat.age = 2
someCat.adorable = true

// you can create an object with new Object():
const anotherBookObj = new Object({ title: 'a', author: 'b' })

// you can access the object attribute by a dot '.' or by ['attribute-name']:
const showObjAttr = { hellen: 2 }
showObjAttr.hellen
showObjAttr['hellen']

// if you have a number as the attribute, you can access it only with ['attribute_name']

// accessing an attribute that object doesnt contain will restult in undefined

// adding/updating the object attribute value is the same
// if attribute exists, it will be updated, if not, created

// removing an attribute involves delete keyword:
const removeBookObj = { title: 'a', author: 'b' }
delete removeBookObj.title
console.log(removeBookObj.title) // undefined
// deleting an attribute is not common, so the main approach is to set the attribute as undefined

// if the attribute of the object isnt a string or symbol,
// then toString() is called on the attribute and converted to string representation:
const obj = {}
const key = {}
obj[key] = 'value for the object key'
console.log(obj) // { '[object Object]': 'value for the object key' }

// if the attribute of an object has space character, then [''] notation must be used to access it

// comparing 2 objects will result in comparing objects memmory address,
// so it will always be false, untill we compare 2 variables that point to the same object

// the new way of declaring a function that belongs to the object(in fact method):
const showCatObj = {
  name: 'Том',
  meow() {
    // without the function keyword
    console.log('a')
  },
}

// the new way of declaring attributes as variable names that exists in the program:
const oldFirstName = 'a'
const oldUsername = 'b'
const oldUser = {
  oldFirstName: oldFirstName, // old way
  oldUsername: oldUsername, // old way
}
console.log(oldUser) // { firstName: 'a', username: 'b' }
//
const newFirstName = 'a'
const newUsername = 'b'
const newUser = {
  newFirstName, // new way
  newUsername, // new way
}
console.log(newUser) // { firstName: 'a', username: 'b' }

// if an attribute is contained inside a variable, you can use [''] notation no access the attribute
const attrUser = {
  firstName: 'a',
  username: 'a',
}
const propAttr = 'firstName'
console.log(user[propAttr]) // a

// to check if an attribute is in object, use in keyword:
const user = {
  firstName: 'a',
  username: 'b',
}
console.log('firstName' in user) // true
console.log('age' in user) // false
// to check all the attributes, use for in method

// toString() method returns the string notation of the object we used on,
// most of the time it will be like [object Object],
// Object - is the actual type, it can be redefined so it will show something else
class Book {
  title = ''
  author = ''
  constructor(title, author) {
    this.title = title
    this.author = author
  }
  toString() {
    // redefining
    return `hello`
  }
}
const myBook = new Book('Палата №6', 'А. П. Чехов')
console.log(`hey ${myBook}`) // hey hello
// toString() is called automatically in code where an object must be shown as string,
// like console.log(array)

// you can also redefine this method if you use function constructors, with prototype attribute:
function Book(title, author) {
  this.title = title
  this.author = author
}
Book.prototype.toString = function () {
  return `hey`
}
const book = new Book('a')
console.log(`hey ${book}`) // hey hey
// prototype way is the same as class way, behind the scenes class is made with prototypes anyway

// you can create attributes(properties also called) on an object with
// Ojbect.defineProperty() which takes 3 parameters,
// 1. the object on which we will create the attribute on,
// 2. the name of the attribute,
// 3. an object which defines also 4 attributes:
//    3.1 value of the attribute, and the remainig 3 are descriptors:
const laptop = {}
Object.defineProperty(laptop, 'os', {
  value: 'MacOS', //value
  writable: false, // modifiable or not
  enumerable: true, // can be seen in array, etc.
  configurable: true, // can be reconfigured with Object.defineProperty()
})

// the default creation of objects sets descriptors to true by defualt

// to reconfigure the descriptors you can use Object.defineProperty() again,
// if configurable = true and also if its only a decriptor of data or descriptor of access

// if you dont write some descriptor explicitly, it will be set to false

// data descriptor - if only value and writable attributes are specified.

// if you try to update the data of an attribute which descriptor = false,
// the data will simply not be updated,
// this wont cause an error thought, but not in 'use strict' case, there, the error will be thrown

// access descriptr - defines the attribute through get() and set() functions:
const animal = { _hiddenName: 'a' }
Object.defineProperty(animal, 'name', {
  // here is a problem thought,
  // even though we defined the get() function,
  // the set() function isnt defined,
  // so its set false as default, so we cant updaate the attribute value, its imposiblle for now
  get: function () {
    return this._hiddenName
  },
})
const animal2 = {
  name: 'b',
}
console.log(animal.name) // a
console.log(animal2.name) // b

const animal = { _hiddenName: 'a' }
Object.defineProperty(animal, 'name', {
  get: function () {
    return this._hiddenName
  },
  set: function (value) {
    this._hiddenName = value
  }, // now, we can update the value of the attribute
})
animal.name = 'b'
console.log(animal.name) // b
// as get() and set() is a common way to write, a special syntax for them was created:
const animal = {
  get name() {
    return this._name
  },
  set name(value) {
    this._name = value
  },
}
console.log(animal.name) // undefined
animal.name = 'a'
console.log(animal.name) // a

// if you set configurable to false,
// you cant set it to true after, its impossible.
// also if configurable = false, you cant set writable to false, if it was true, but not otherwise

// you also cant delete the attribute which has configurable = false,
// it wont cause an error, but the attribute wont be deleted

// to check the objects descriptors for an attribute,
// you can use Object.getOwnPropertyDescriptor(object_name, attribute_name)

// you can prevent access to an object with writable/configurable attributes from Object.defineProperty(),
// Object.preventExtensions(), Object.seal(), Object.freeze() // ways to achive object immutability

// Object.preventExtensions() restricts adding new attributes to an object but
// doesnt affect current attributes of the object, in 'use strict' it will cause an error though:
const laptop = {
  displaySize: 15,
}
Object.preventExtensions(laptop)
laptop.storage = 256
console.log(laptop.storage) // undefined

// Object.seal() locks the objects so that you cant add new attributes to it and
// you cant configure the current ones of the object but values can be changed,
// so its like Object.preventExtensions() but also configurable=false:

// Object.freeze() freezes the object so that you cant add new attributes and
// cant change the values of the current attributes,
// so like Object.preventExtensions() and writable=false for current values

// if freezed object had an object inside, then it can be still mutated,
// so you might need deepFreeze() method to freeze all objects inside as well
// but you cant make immutable Date, Map, Set

// Object.seal(), Object.freeze(), Object.preventExtensions()
// return the memmory address of the object they were passed into them:
const foo = {}
const bar = Object.freeze(foo)
foo === bar // true

// to defined more than one attribute with descriptors
// you must use the static method Object.defineProperties():
const laptop = {}
Object.defineProperties(laptop, {
  os: {
    value: 'MacOS',
    enumerable: true,
  },
  age: {
    value: 10,
    enumerable: false,
  },
})
const result = Object.keys(laptop)
console.log(result) // ['os']

// to get descriptors for all attributes of an object you can use Object.getOwnPropertyDescriptors()

// if Object.getOwnPropertyDescriptor/s() was passed an empty object, the return value will be {}

// Object.isFrozen() checks if an object was freezed,
// returns true if adding/updating attributes is restricted and configurable=false,
// wirtable=false is set for the current attributes

// everything in javascript is an object, except for primitive values,
// that means they extend Object, and they have methods from Object

// console.dir() will show you a tree view of the object with its relations

// function are also objects, so you can assign attribute to it as well:
function sum(a, b) {
  return a + b
}
sum.arguments // можно вызвать свойство функции
sum.someField = 'value' // можно присвоить значение в поле
console.dir(sum) // [Function: sum] { someField: 'value' }

// when you declare a primitive value, // it is autoboxed into its constructor type by default,
// like String, Number, Boolean, but this way, they dont become objects
// (so setting attributes to it will restult in nothing, but not error),
// they just have some methods to operate on them for convenience

// new String/Number/Boolean/etc() will result in an object,
// because its an explicit way of defining an object with [new] keyword

// you can access methods of constructors that autoboxes the value of a variable on the value itself,
// mostly on all of them:
true.toString()
Infinity.toString()
'hello world'.toString()
Symbol('tag').toString()
9007199254740991n.toString()
// 32.2.toString() // will cause an error because '.' is part of a number syntax
;(32)
  .toString(
    // good
    32
  )
  .toString() // good
Number(32).toString() // good

// null and undefined cant call constructor methods because
// they are not wrapped by such constructors that will give them methods

// copying an object has 2 ways:
let someObject = Object.assign({}, object_name)
// ... is spread operator, copies all properties of someObject and assigns them to anotherObject
let anotherObject = { ...someObject }
let sampleObject = {}

// copying occure only on the first lvl, if you have objects lower than first level,
// then they will be copied by reference, and not value
const original = {
  b: {
    c: 1,
  },
}
const copy = { ...original }
copy.b.c = 2
console.log(original) // { b: { c: 2 }}

// you can make changes when copying an object:
const cat = {
  name: 'felix',
  color: 'blac',
  isHomeless: false,
}
const catInBoots = {
  ...cat,
  // name, hasBoots will rewrite any name properties from cat object that has same name properties
  name: 'kekl',
  hasBoots: true,
  // this will overwrite any properties above if property name is the same
  ...cat,
}
console.log(catInBoots) // {name: 'kekl', color: 'blac', isHomeless: false, hasBoots: true }
const redCat = Object.assign(cat, { color: 'red', name: 'iara' })
console.log(redCat) // {name: 'iara', color: 'red', isHomeless: false }

// mutation of the objects that share common memory address will
// add/change/delete in all shared objects

// objects are passed by and compared by reference

// objects are compared by the memmory address they poses
// (objects, functions, arrays, classes - are objects)

// toString() methods is implicilty used on objects when printing them,
// but you can call them on primitives too.
const objectA = {}
console.log(objectA) // a.toString()

// this - reference to an object.
//
// inside a function declaration this would be the
//  global object(main object of the program, in broweser it is window, in node js it is global)
//  or undefined in 'use strict'

// in anonymous function this is also global object

// method of an object:
const someUser = {
  name: 'Alex',
  // greet becomes a method of the object someUser
  greet() {
    // this.name becomes the object in this case 'Alex'
    console.log(`Hello, my name is ${this.name}`)
  },
}
someUser.greet() // Hello, my name is Alex
const greetFunc = someUser.greet
greetFunc() // this becomes global, so this.name refers to window/global.name
const greetVar = someUser
// will print as usual, greetVar now has the reference of the original object,
//  and this.name now works
greetVar.greet()

// constructor - a function that helps creating new objects
function User() {
  // function constructor
  // this = {}
  this.name = 'Alex' // this becomes the User object
  // return this
}
// User { name: 'Alex'}, new keyword is responsible for creating
const firstObjUser = new User()
// undefined, different from new User(),
// now secondNotObjUser is window global object and the fields of User() became the window fields
const secondNotObjUser = User()
firstObjUser.name === 'Alex'
firstObjUser instanceof User // true, checks if firstObjUser was instaniated by User
// variant 1, check if it was constructed with new keyword
function User() {
  if (!(this instanceof User)) {
    throw Error('Error: Incorrect invocation!')
  }
  this.name = 'Alex'
}
//variant 2
function User() {
  if (!new.target) {
    throw Error('Error: Incorrect invocation!')
  }
  this.name = 'Alex'
}
const secondUser = User() // Error: Incorrect invocation!

// indirect call with call() and apply(),
// their first argument is this(so they can setup the context outside explicitly):
function greetSome() {
  console.log(`Hello, ${this.name}`)
}
const userOne = { name: 'Alex' }
const userTwo = { name: 'Ivan' }
greetSome.call(userOne) // Hello, Alex
greetSome.call(userTwo) // Hello, Ivan
greetSome.apply(userOne) // Hello, Alex
greetSome.apply(userTwo) // Hello, Ivan
// difference between call() and apply() is that
// call() takes arguments as a list with commas,
// apply() takes an array of arguments:
function greetSomeSome(greetWord, emoticon) {
  console.log(`${greetWord} ${this.name} ${emoticon}`)
}
const userOneOne = { name: 'Alex' }
const userTwoTwo = { name: 'Ivan' }
greetSomeSome.call(userOneOne, 'Hello,', ':-)') // Hello, Alex :-)
greetSomeSome.call(userTwoTwo, 'Good morning,', ':-D') // Good morning, Ivan :-D
greetSomeSome.apply(userOneOne, ['Hello,', ':-)']) // Hello, Alex :-)
greetSomeSome.apply(userTwoTwo, ['Good morning,', ':-D']) // Good morning, Ivan :-D

// tie forever a context with bind() method:
function greetBind() {
  console.log(`Hello, ${this.name}`)
}
const userBind = { name: 'Alex' }
// returns the function with the userBind context,
// so this will work, even though greetBindAlex is a simple function here
const greetBindAlex = greetBind.bind(userBind)
greetBindAlex() // Hello, Alex
// another example
function getAge() {
  console.log(this.age)
}
const howOldAmI = getAge.bind({ age: 20 }).bind({ age: 30 })
howOldAmI() //20, because the first bind was {age: 20}, so its impossible to chain rebind

// arrow functions dont have context so they look for near context in the hierarchy:
function greetWaitAndAgain() {
  console.log(`Hello, ${this.name}!`)
  setTimeout(() => {
    console.log(`Hello again, ${this.name}!`)
  })
}
const userContext = { name: 'Alex' }
userContext.greetWaitAndAgain = greetWaitAndAgain
userContext.greetWaitAndAgain() // Hello, Alex! \n Hello again, Alex!

// return with primitive value in funciton constructor is ignored, and this will be returned instead.

// return with an object in function constructor will return
// the object and not this of the current function constructor

// __proto__ - deprecated thing, but used to set/get things:
let animal = {
  eats: true,
}
let rabbit = {
  jumps: true,
}
rabbit.__proto__ = animal
alert(rabbit.eats) // true
alert(rabbit.jumps) // true
//
let animal = {
  eats: true,
  walk() {
    alert('Animal walk')
  },
}
let rabbit = {
  jumps: true,
  __proto__: animal,
}
rabbit.walk() // Animal walk
//
let animal = {
  eats: true,
  walk() {
    alert('Animal walk')
  },
}
let rabbit = {
  jumps: true,
  __proto__: animal,
}
let longEar = {
  earLength: 10,
  __proto__: rabbit,
}
longEar.walk() // Animal walk
alert(longEar.jumps) // true
//
let animal = {
  eats: true,
  walk() {
    /*   */
  },
}
let rabbit = {
  __proto__: animal,
}
rabbit.walk = function () {
  alert('Rabbit! Bounce-bounce!')
}
rabbit.walk() // Rabbit! Bounce-bounce!
//
let protUer = {
  name: 'John',
  surname: 'Smith',
  set fullName(value) {
    ;[this.name, this.surname] = value.split(' ')
  },
  get fullName() {
    return `${this.name} ${this.surname}`
  },
}
let admin = {
  __proto__: protUer,
}
alert(admin.fullName) // John Smith (*)
admin.fullName = 'Alice Cooper' // (**)
alert(admin.name) // Alice
alert(admin.surname) // Cooper
//
let animal = {
  walk() {
    if (!this.isSleeping) {
      alert(`I walk`)
    }
  },
  sleep() {
    this.isSleeping = true
  },
}
let rabbit = {
  name: 'whhite Rabbit',
  __proto__: animal,
}
rabbit.sleep()
alert(rabbit.isSleeping) // true
alert(animal.isSleeping) // undefined
//
let animal = {
  eats: true,
}
let rabbit = {
  jumps: true,
  __proto__: animal,
}
alert(Object.keys(rabbit)) // jumps
for (let prop in rabbit) alert(prop) // jumps, eats
//
let animal = {
  eats: true,
}
let rabbit = {
  jumps: true,
  __proto__: animal,
}
for (let prop in rabbit) {
  let isOwn = rabbit.hasOwnProperty(prop)
  if (isOwn) {
    alert(`Our: ${prop}`) // Our: jumps
  } else {
    alert(`Inherited: ${prop}`) // Inherited: eats
  }
}

// prototype - method to work with objects(used in past)
let animal = {
  eats: true,
}
function Rabbit(name) {
  this.name = name
}
Rabbit.prototype = animal
let rabbit = new Rabbit('Whhite Rabbit') //  rabbit.__proto__ == animal
alert(rabbit.eats) // true

// if .prototype changes, then the new object will have the new object from it,
// the old ones will still be with the old object
function Rabbit() {} // Rabbit.prototype = { constructor: Rabbit }
alert(Rabbit.prototype.constructor == Rabbit) // true
//
function Rabbit() {} // Rabbit.prototype = { constructor: Rabbit }
let rabbit = new Rabbit()
alert(rabbit.constructor == Rabbit) // true
//
function Rabbit(name) {
  this.name = name
  alert(name)
}
let rabbit = new Rabbit('White Rabbit')
let rabbit2 = new rabbit.constructor('Black Rabbit')
//
function Rabbit() {}
Rabbit.prototype = {
  jumps: true,
}
let rabbit = new Rabbit()
// false (constructor doesnt always guarantee the owner, so look below)
alert(rabbit.constructor === Rabbit)

function Rabbit() {}
Rabbit.prototype.jumps = true

Rabbit.prototype = {
  jumps: true,
  constructor: Rabbit,
}

// obj = {} same as new Object(), obj.__proto__ === Obj.prototype
let arr = [1, 2, 3]
alert(arr.__proto__ === Array.prototype) // true
alert(arr.__proto__.__proto__ === Object.prototype) // true
alert(arr.__proto__.__proto__.__proto__) // null

// you can also define new methods/attributes for major constructors:
String.prototype.show = function () {
  alert(this)
}
'BOOM!'.show() // BOOM!

// we can also mix mehtods/attributes (like sharing):
let obj = {
  0: 'Hello',
  1: 'world!',
  length: 2,
}
// (we could make obj.__proto__ = Array.prototype, and obj would have everything form Array)
obj.join = Array.prototype.join
alert(obj.join(',')) // Hello,world!

// the new approach for __proto__ is Object.create(), Object.getPrototypeOf(), Object.setPrototypeOf():
let animal = {
  eats: true,
}
let rabbit = Object.create(animal)
alert(rabbit.eats) // true
alert(Object.getPrototypeOf(rabbit) === animal)
Object.setPrototypeOf(rabbit, {}) // new prototype
//
let animal = {
  eats: true,
}
let rabbit = Object.create(animal, {
  jumps: {
    value: true,
  },
})
alert(rabbit.jumps) // true
// cloning the object
let clone = Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)

// changing prototypes and setting them is very cost time, so be aware

// creating an object without prototype - let obj = Object.create(null);

// Proxy - a way to wrap the object and maniupalte its state thorugh the proxy:
//
// get trap for exaple:
let someProxyNumber = [0, 1, 2]
// new Proxy created a new variable, it must be used everywhere instead of the original one,
// no one needs to point to the original object because it will be very confusing
someProxyNumber = new Proxy(someProxyNumber, {
  get(target, prop) {
    if (prop in target) {
      return target[prop]
    } else {
      return 0 // default value
    }
  },
})
alert(someProxyNumber[1]) // 1
alert(someProxyNumber[123]) // 0
//
// set trap for example:
let numbers = []
numbers = new Proxy(numbers, {
  // (*)
  set(target, prop, val) {
    if (typeof val == 'number') {
      target[prop] = val
      return true
    } else {
      return false
    }
  },
})
numbers.push(1)
numbers.push(2)
alert('length: ' + numbers.length) // 2
numbers.push('тест') // TypeError

// Reflect - an object wrapper that can make proxy easier by accessign the modifiers not from proxy,
// but outside, but form proxy as well, the reflect will work on the object itself,
// while proxy not(its a transition)
let reflectUser = {
  name: 'a',
}
reflectUser = new Proxy(reflectUser, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`)
    return Reflect.get(target, prop, receiver) // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`)
    // currying - a technique to execute
    return Reflect.set(target, prop, val, receiver) // (2)
  },
})
let reflectName = user.name // "GET name"
user.name = 'Петя' // "SET name=a"
