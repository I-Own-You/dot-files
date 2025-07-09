// variables can be  created with: var, let, const
let exampleA = 1,
    exampleB,
    exampleC
let anotherExampleA
let anotherExampleB = 2
const anotherExampleC = 2
let cExample = exampleA + exampleB

// all variables are initialized by default and put at the start of the file,
// its called variable hoisting.
// So if you have 3 vars declared, they are created at the top of the file,
// so they will have a temporary value in chorme/safari undefined,
// and in firefox unitialized.
// When the script arrives at the lines where variables are given a value,
// then the value of the variable changes from undefnied/unitialized to the given value.

// let and const has TDZ(temporary dead zone),
// it means that you cannot access them above their initialization
// untill you use them inside some code that will be run after the intialization of let and const:
function foo() {
    console.log('from foo', tdzA) // used before intialization
}
let tdzA = 10
foo() // ok because the code is running after intialization

// Clsses also have TDZ(even thought they are functions under the hood):
console.log(Foo) // error
class Foo {
    constructor(bar) {
        this.bar = bar
    }
}

// simple functions do not have TDZ, so you can use them above their intialization:
console.log(Foo) // ok, it will be executed
function Foo() {
    this.bar = 1
}

// let and const have block scope, so you cannot accesss them in the outer scope:
if (true) {
    let scopeA = 5
    const scopeB = 10
    console.log(scopeA) // ok, since its in the scope
    console.log(scopeB) // ok, since its in the scope
}
console.log(scopeA) // error, not defined
console.log(scopeB) // error, not defined

// variables of the same name can be defined while they are in different block scope

// let variables can be assigned new values

// const variables cant be reassigned with new values

// const objects can be mutated since the changes wont affect the memmory address that const points to

// var variabless are undefined if no values are given

// var variables have function scope so if it is defined in fuctions, you cant use them outside:
if (true) {
    var varA = 5
}
function foo() {
    var varB = 10
}
console.log(varA) // ok since var a is in if block, and not functin block scope
console.log(varB) // error because var b is defined in function scope

// var variables can be accessed with window.var_name if it is global scope defined, and not in function

// var variables can be accessed before their initialization but they will be undefined anyway

// var variables can be reassigned with var_name = value or var var_name = value

// var variables without var keyword are hoistd even though their scope is functional
function showHoist() {
    hoistA = 2
}
showHoist()
console.log(hoistA)

// also, you can craete variables with destructuizing notation:
let [a, b, c] = [1, 2, 3]
console.log(a) // 1
console.log(b) // 2
console.log(c) // 3
//
let [a1, , c1] = [1, 2, 3] // here you skip the second variable
console.log(a) // 1
console.log(c) // 3
//
let [myName = prompt('name?'), mySurname = prompt('surname?')] = ['Julius']
alert(myName) // Julius
alert(mySurname) // result from prompt, = propmt() is like a default value
//
let myOptions = {
    myTitleTitle: 'Menu',
    myTitleWidth: 100,
    myTitleHeight: 200,
}
// variable names must be identic to object properties
let { myTitleTitle, myTitleWidth, myTitleHeight } = myOptions
alert(title) // Menu
alert(width) // 100
alert(height) // 200
//
// the order doesnt matter
let { anotherMyHeight, anotherMyWidth, anotherMyTitle } = {
    anotherMyTitle: 'Menu',
    anotherMyHeight: 200,
    anotherMyWidth: 100,
}
// change the name of vars
let { width: changedWidth, height: changedHeight } = myOptions
// width -> changedWidth
// height -> changedHeight
// title -> remains the same, since we dont use it
alert(changedWidth) // 100
alert(changedHeight) // 200
//default values
let someOtherOptions = {
    someOtherTitle: 'Menu',
    someOtherWidth: 200,
    someOtherHeight: 300,
}
let {
    someOtherWidth = 100,
    someOtherHeight = 200,
    someOtherTitle,
} = someOtherOptions
alert(someOtherTitle) // Menu
alert(someOtherHeight) // 300
alert(someOtherWidth) // 200

// change name and give default values
let {
    myTitleHeight: h = 100,
    myTitleWidth: w = 200,
    myTitleTitle: t,
} = myOptions
alert(t) // Menu
alert(w) // 100
alert(h) // 200

// you can also take 1 attribute and other attributes will form another object
let { myTitleHeight: kek, ...rest } = myOptions
alert(rest.height) // 200
alert(rest.width) // 100

// if you destructurize below the let/const, then you need () to put,
// because of the {} executing apart
let myA, myB, myC
;({ myA, myB, myC } = { myA: 'Menu', myB: 200, myC: 100 })

// you can construct more complex one, with nested objects
let nestedObjects = {
    size: {
        width: 100,
        height: 200,
    },
    items: ['Cake', 'Donut'],
    extra: true,
}
//
let {
    size: { width, height },
    items: [item1, item2],
    title = 'Menu',
} = nestedObjects

// you can also destructurize variable in a function signature,
// so you could call the variable name in the function call
// (the nested objects can be here as well):
function showMenu({
    title = 'Untitled',
    width = 200,
    height = 100,
    items = [],
}) {
    console.log(title, width, height, items)
}
showMenu({ width: 'a' })
