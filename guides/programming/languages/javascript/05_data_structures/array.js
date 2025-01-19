// arrays:
const arrayName = []
const naotherArray = [2, 23, 23, 23, 23]

// length of array
console.log(arrayName.length)

// .length can be resized and the array will be changed.
// if you increase the size,
// the right part of the array will be increased with empty cells(undefined).
// if you decrease the size then the right part of the array will remove the elements of decreased size.
// also if you traverse the array with for methods and not standart for,
// then elements wont be traversed and skipped.

// accessing index that is not in the array wont cause an IndexOutOfRange,
// and the returned value will be undefined

// defining an index out of the array will create that index and assign a value in the array,
// but the gap between array.length and array[newindex] will be populated with undefined values

// destructurizing an array into variables:
const catProfile = [
  'Maru',
  'Scottish Fold',
  true,
  'https://youtu.be/ChignoxJHXc',
]
const catName = catProfile[0] // old way
const catBreed = catProfile[1] // old way
const [name, breed] = catProfile // modern way

// skipping elements:
const destrA = [, 2, 3] // [undefined, 2, 3]
const [desrB, destrC] = destrA // b - undefined, c - 2
const [desrBB, ...destrCC] = destrA // b - undefined, c - [2, 3]

// forEach() - apply a callback function to all elements of an array without changing the array:
const myNumb = [1, 2, 3, 4] // you could call it here, anyway, but forEach returns nothing, so
myNumb.forEach((num, index, array) => {
  const square = num * num
  console.log('a ' + square)
})

// break, return, continue - dont work in forEach()

// forEach() - doesnt return anything, but you can return if you want:
const empty = []
const someNums = [1, 2, 3]
function pushElements(nr) {
  empty.push(nr)
}
someNums.forEach((item) => {
  // return wont break forEach
  return pushElements(item)
})
console.log(empty)

// map() - returns new array, you can modify it if you want as below
// if you dont return the element, undefined will be returned as a value instead
const mapNums = [1, 2, 3, 4, 5]
const transformedNums = mapNums.map(function (num, index, array) {
  if (num <= 3) {
    return 'less'
  }
  // no return
})
console.log(transformedNums) // ['less', 'less', 'less', undefined, undefined]

// map() also has second parameter, the context, (forEach also has it)
const mapThisNums = [1, 2, 3]
const otherData = { delta: 5 }
const transformedThisNums = mapThisNums.map(function (num) {
  return num + this.delta // otherData.delta
}, otherData)
console.log(transformedThisNums) // [ 6, 7, 8 ]

// arrow functions still dont get the context, even if you pass the context for the map

// reduce() convert an array into a value, (check the signature for more info)
const reduceSomenUms = [1, 2, 3, 4, 5, 6, 7, 8]
function findAverage(acc, item, index, arr) {
  const sum = acc + item
  if (index === arr.length - 1) {
    return sum / arr.length
  }
  return sum
}
const average = reduceSomenUms.reduce(findAverage, 0) // 4.5

// filter() - returns a new array
const filterArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
filterArray.filter((value, index, array) => {
  if (value % 2 == 0) {
    return true // means the element will be included, you must return boolean for filter()
  } else {
    return false
  }
})

// find() - finds the first occurent of the value and returns it
const findArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
findArray.find(2)
// here, find was given a custom function that will handler the find logic
findArray.find((val, index, array) => {
  if (val % 4 == 0) {
    return true
  }
  return false
})

// findIndex() - return the index of the first occurence of an element, -1 if not found
const findIndexArr = [2, 4, 5, 6, 7]
findIndexArr.findIndex(6) // 3
// here, findIndex was given a custom function that will handler the find logic
findArray.find((val, index, array) => {
  if (val == 2) {
    return true
  }
  return false
}) // 2

// flat() returns new array with 1 nested array less inside the main array:
const nestedArr = [
  'первый уровень',
  'первый уровень',
  ['второй уровень', 'второй уровень', ['третий уровень', 'третий уровень']],
]
// the default depth for removing nesting is 1, Infinity - for all
const nestedArrFlat = nestedArr.flat()
console.log(nestedArrFlat)[
  // result
  ('первый уровень',
  'первый уровень',
  'второй уровень',
  'второй уровень',
  ['третий уровень', 'третий уровень'])
]

// flatMap() will flat the map element automatically without using .flat() on .map():
const orders = [
  {
    id: 1,
    products: [
      { name: 'Чизкейк', price: 1.99 },
      { name: 'Бисквит', price: 4.99 },
    ],
  },
  {
    id: 2,
    products: [
      { name: 'Шоколад', price: 5.59 },
      { name: 'Зефир', price: 8.99 },
    ],
  },
]
orders.map((order) => order.products.map((product) => product.name)) // [['Чизкейк', 'Бисквит'], ['Шоколад', 'Зефир']]
orders.map((order) => order.products.map((product) => product.name)).flat() // ['Чизкейк', 'Бисквит', 'Шоколад', 'Зефир']
orders.flatMap((order) => order.products.map((product) => product.name)) // ['Чизкейк', 'Бисквит', 'Шоколад', 'Зефир']

// some other methods, there are more
//
// every() returns boolena value if all elements convert to true based on the callback function logic
// every() method on an empty array will always return true
//
// some() returns boolean value if atleast 1 element convert to true based on the callback function logic
// some() method on an empty array will always return false
//
// reverse() changes the array by reversing it, returning memmory address to the array
//
// includes() checks if an element is within an array, returing true if yes, false otherwise.
// for string, checks if a substring is within the string
//
// indexOf() returns the index of an element
//
// lastIndexOf() returns the index of an element, starting from the end of an array,
// like reversed, also takes second parameter to start from which index

// Array.from() returns a new array from the object we pass.
// the object must be array-like object, like a string, arguments from functions, Set or Map
//
// Array.from() takes 3 parameters,
// the object itself,
// callback function that will do something with each element from first paramter and return it,
// third paramter will be 'this' context for the callback funciton we specify as 2 parameter of Array.froom()
const arrFrom = Array.from('abcd')
console.log(arrFrom) // ['a', 'b', 'c', 'd']
//
const uniqueNumbers = new Set()
uniqueNumbers.add(1)
uniqueNumbers.add(2)
uniqueNumbers.add(3)
const arr = Array.from(uniqueNumbers) // [1, 2, 3]
//
const linkElements = document.getElementsByTagName('a')
const arrLinks = Array.from(linkElements, function (a) {
  return a.href
})

// array-like object is the object that has .length attribute and
// can access its elements by index:
// string, arguments param func, NodeList, HTMLCollection, objects that realize Iterable interface(Set, Map)

// Array.from() makes a shallow copy so if the object contains some other objects,
// they wont be copied, but memmory address will be,
// so changes to the newly created array to the objects within will affect these objects,
// in other places aswell.

// also you can create arrays with this quirk:
const nums = Array.from({ length: 4 }, function (value, index) {
  return index * 2 // value will be undefined because we use an ojbect syntax to create an array
})
console.log(nums) // [0, 2, 4, 6]

// Array.of() static method that returns an array from all the arguments passed
Array.of('🐱', 0b001, document.createElement('div')) // ['🐱', 1, div]
Array.of(3) // [3]

// Array() works the same except that if you pass only one argument and its a number,
// then it will return an array with that length of empty values

// Array.isArray() return true if the element is an array,
// no matter how it was created(a lot of ways with [] and Array),
// but not array-like objects and also typed arrays like Uint8Array() .etc
