// class:
class MyClass {
  constructor() {}
  method1() {}
  method2() {}
  method3() {}
}
class User {
  constructor(name) {
    this.name = name
  }
  sayHi() {
    alert(this.name)
  }
}
let userUsr = new User('Иван')
userUsr.sayHi()

// code inside class is automatically 'use strict' mode

// methods of the class have enumerable = false so you cant see them in for..in

// class expression, same as function expression, it can have a name that is only seen inside the class:
let User = class {
  sayHi() {
    alert('Привет')
  }
}
let User = class MyClass {
  sayHi() {
    alert(MyClass) // will work, its inside the class
  }
}
new User().sayHi()
alert(MyClass) // wont work

// you can also create classes dynamically:
function makeClass(phrase) {
  return class {
    sayHi() {
      alert(phrase)
    }
  }
}
let User = makeClass('a')
new User().sayHi() // a

// getter/setter:
class User {
  constructor(name) {
    // calls setter
    this.name = name
  }
  get name() {
    return this._name
  }
  set name(value) {
    if (value.length < 4) {
      alert('Имя слишком короткое.')
      return
    }
    this._name = value
  }
}
let user = new User('Иван')
alert(user.name) // Иван
user = new User('') // wont work
// under the hood this is happening:
Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    },
  },
})

// a trick with string as a name for the method:
class User {
  ['say' + 'Hi']() {
    alert('Привет')
  }
}
new User().sayHi()

// classes can have attributes also, they are created before the constructor is called,
// so its an attribute on the object
class User {
  name = 'anonym'
  sayHi() {
    alert(`hi, ${this.name}!`)
  }
}
new User().sayHi()

// so class basically is a function constructor, the methods and get/set are created on its prototype

// classes can extend another classes(only one at the time):
class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }
  run(speed) {
    this.speed = speed
    alert(`${this.name}${this.speed}.`)
  }
  stop() {
    this.speed = 0
    alert(`${this.name} `)
  }
}
let someAnimal = new Animal('a')
class Rabbit extends Animal {
  // extends - the keyword with which you can extend another class
  hide() {
    alert(`${this.name}!`)
  }
}
let someRabbit = new Rabbit('Белый кролик')
someRabbit.run(5)
someRabbit.hide()

// you can write any expression after [extends] keyword:
function f(phrase) {
  return class {
    sayHi() {
      alert(phrase)
    }
  }
}
class User extends f('hi') {}
new User().sayHi() // hi

// we can call methods from clases that we extended with [super] keyword:
class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }
  run(speed) {
    this.speed = speed
    alert(`${this.name}${this.speed}.`)
  }
  stop() {
    this.speed = 0
    alert(`${this.name}`)
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name}`)
  }
  stop() {
    super.stop() // call .stop() method from the parent class
    this.hide() // now do something else
  }
}
let anotherRabbit = new Rabbit('a')
anotherRabbit.run(5)
anotherRabbit.stop()

// arrow funcitons dont have super(), so they take it from outside scope
class Rabbit extends Animal {
  stop() {
    setTimeout(() => super.stop(), 1000) //will work
    setTimeout(function () {
      super.stop()
    }, 1000) //wont work
  }
}

// if a class doesnt have its constructor but it extends from another class,
// automatically is inherited the parent constructor class:
class Rabbit extends Animal {
  constructor(...args) {
    super(...args)
  }
}

// you must call super() if you extend a class,
// also if you dont put super() the object isnt created for [this]:
class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }
}
class Rabbit extends Animal {
  constructor(name, earLength) {
    this.speed = 0
    this.name = name // here we need to call the super(name)
    this.earLength = earLength
  }
}
let yetAnotherRabbit = new Rabbit('a', 10) // Error: this is not defined.
//
class Animal {
  constructor(name) {
    this.speed = 0
    this.name = name
  }
}
class Rabbit extends Animal {
  constructor(name, earLength) {
    super(name) // now works
    this.earLength = earLength
  }
}
let stillAnotherRabbit = new Rabbit('a', 10)
alert(stillAnotherRabbit.name) // a
alert(stillAnotherRabbit.earLength) // 10

// when it comes to attributes,
// they are created before class constructors for the parent class,and after super() for the childs:
class Animal {
  name = 'animal'
  constructor() {
    alert(this.name) //
  }
}
class Rabbit extends Animal {
  name = 'rabbit'
}
new Animal() // animal
new Rabbit() // animal

// for objects,
// to make super() work and to create [HomeObject] you need method() and not name: method_name():
let animal = {
  eat: function () {
    // ...
  },
}
let againAnimal = {
  __proto__: animal,
  eat: function () {
    super.eat()
  },
}
againAnimal.eat() // error

// the super keyword works with [HomeObject] and not with this.__proto__
// (this doesnt work, becaue all the calling will be with the first object used,
// and the method isnt tied to its object)

// you can define static methods:
class User {
  static staticMethod() {
    alert(this === User)
  }
}
User.staticMethod() // true
//its roughly the same as:
class User {}
User.staticMethod = function () {
  alert(this === User)
}

// the static method is a method for class, and not objects(for example)
class Article {
  constructor(title, date) {
    this.title = title
    this.date = date
  }
  static compare(articleA, articleB) {
    return articleA.date - articleB.date
  }
}
let articles = [
  new Article('HTML', new Date(2019, 1, 1)),
  new Article('CSS', new Date(2019, 0, 1)),
  new Article('JavaScript', new Date(2019, 11, 1)),
]
articles.sort(Article.compare)

// static methods cant be accessed by objects

// you can also cretat static attribute of class:
class Article {
  static publisher = 'a'
}
alert(Article.publisher) // a

// static attriubtes/methods are also inherited:
class Animal {
  constructor(name, speed) {
    this.speed = speed
    this.name = name
  }
  run(speed = 0) {
    this.speed += speed
    alert(`${this.name}${this.speed}.`)
  }
  static compare(animalA, animalB) {
    return animalA.speed - animalB.speed
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name}!`)
  }
}
let rabbits = [new Rabbit('a', 10), new Rabbit('b', 5)]
rabbits.sort(Rabbit.compare) //yes you can call just he function signature
rabbits[0].run()

// there is a convention between programmers so that _var-name becomes protected,
// and it should not be accessed outside the class(but it can be accessed in a child class)

// there are times when you want to set a value and never change it:
class CoffeeMachine {
  constructor(power) {
    // this._power is another variable here, so if we dont have a getter,
    // then it would not have put the value with new CoffeeMachine(100)
    this._power = power
  }
  get power() {
    return this._power
  }
}
let coffeeMachine = new CoffeeMachine(100)
alert(`power: ${coffeeMachine.power}W`) // power: 100W
coffeeMachine.power = 25 // Error (no setter)

// a private attribute/method would require '#' before its name:
class CoffeeMachine {
  #waterLimit = 200
  #checkWater(value) {
    if (value < 0) throw new Error('Отрицательный уровень воды')
    if (value > this.#waterLimit) throw new Error('Слишком много воды')
  }
}
let coffeeMachine = new CoffeeMachine()
coffeeMachine.#checkWater() // Error
coffeeMachine.#waterLimit = 1000 // Error

// we can also have a public and a private variable wiht same name, they dont conflict:
class CoffeeMachine {
  #waterAmount = 0
  get waterAmount() {
    return this.#waterAmount
  }
  set waterAmount(value) {
    if (value < 0) throw new Error('a')
    this.#waterAmount = value
  }
}
let machine = new CoffeeMachine()
machine.waterAmount = 100
alert(machine.#waterAmount) // Error
// you can also extend builtin classes:
class PowerArray extends Array {
  isEmpty() {
    return this.length === 0
  }
}
// arr here will be PowerArray type,
// so that why you can continue to use methods on it, like .filter/map() on it
let anotherArr = new PowerArray(1, 2, 5, 10, 50)
alert(anotherArr.isEmpty()) // false
let filteredArr = anotherArr.filter((item) => item >= 10)
alert(filteredArr) // 10, 50
alert(filteredArr.isEmpty()) // false
//
// if we put this in the class,
// the result of the above arr would be an Array, and the methods of our class would stop working
// static get [Symbol.species]() {
//   return Array;
// }

// builtin classes dont inherit static methods/attributese

// instanceof can help us to check if a certain object pretends to be some class type:
let arr = [1, 2, 3]
alert(arr instanceof Array) // true

// we can also manually remake the functionality:
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) return true
  }
}
let obj = { canEat: true }
alert(obj instanceof Animal) // true: Animal[Symbol.hasInstance](obj)

// this is how checking works:
class Animal {}
class Rabbit extends Animal {}
let rabbit = new Rabbit()
alert(rabbit instanceof Animal) // true
// rabbit.__proto__ === Animal.prototype // no matching
// rabbit.__proto__.__proto__ === Animal.prototype // matched!

// mixins:
let anotherSayHiMixin = {
  sayHi() {
    alert(`Привет, ${this.name}`)
  },
  sayBye() {
    alert(`Пока, ${this.name}`)
  },
}
class User {
  constructor(name) {
    this.name = name
  }
}
Object.assign(User.prototype, anotherSayHiMixin) // copied all the methods
new User('Вася').sayHi() // Привет, Вася!

// mixins can also have their prototypes hierarchy:
let sayMixin = {
  say(phrase) {
    alert(phrase)
  },
}
let sayHiMixin = {
  __proto__: sayMixin,
  sayHi() {
    super.say(`Привет, ${this.name}`) // (*)
  },
  sayBye() {
    super.say(`Пока, ${this.name}`) // (*)
  },
}
class A {
  a = 2
}
class User extends A {
  // so we extend and also have the mixins methods as we copy them below
  constructor(name) {
    this.name = name
  }
}
Object.assign(User.prototype, sayHiMixin)
new User('Вася').sayHi() // Привет, Вася!

// EventMixins - a way to control browser events:
let eventMixin = {
  /**
   * menu.on('select', function(item) { ... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {}
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = []
    }
    this._eventHandlers[eventName].push(handler)
  },
  /**
   * menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName]
    if (!handlers) return
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1)
      }
    }
  },
  /**
   * this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return // обработчиков для этого события нет
    }
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    )
  },
}
//
class Menu {
  choose(value) {
    this.trigger('select', value)
  }
}
Object.assign(Menu.prototype, eventMixin)
let menu = new Menu()
menu.on('select', (value) => alert(`Выбранное значение: ${value}`))
menu.choose('123') // Выбранное значение: 123
