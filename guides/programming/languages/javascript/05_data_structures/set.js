// Set - collection of unique data.

// you cant access data through index
//  the collection can be iterated

// Set methods (the most used ones):
// add() — adds element, and returns the new collection
// delete() — removes an element,
//            and returns true if an element has been found and deleted, false - if not
// has() — checks if an element is in Set, returns true or false
// clear() — remove all elements from Set, returns undefined
// forEach() — do something with each element of Set, like array style,
//             but the 2 paramter of callback function isnt an index,
//             but a value like 1 parameter, for copatibiliy mode
// size - attriubte, like length on array
// values() - method that return an iterator which you can use in for..of or
//            transform in array with [...iterator_name],
//            it is not used because Set can be iterated with for..of, .etc
// keys() - method which returns an iterator to iterate through keys,
//          but Set doesnt have keys, so for compatibility mode it returns iterator of values,
//          better use values(), its more logic related
// entries() - method which returns an iterator of [key, value] pairs,
//             but Set doesnt have key, so for compatibility mode returns [value, value],
//             not recommended

const uniqueIds = new Set()
uniqueIds.add(123)
uniqueIds.add(456)
uniqueIds.add(111)
uniqueIds.add(123)
console.log(uniqueIds.size) // 3
console.log(uniqueIds.has(111)) // true
uniqueIds.delete(111)
console.log(uniqueIds.size) // 2
uniqueIds.clear()
console.log(uniqueIds.size) // 0

// 11.2 you can predefine data in Set with an iterable, array for example:
const filled = new Set([1, 2, 3, 3, 3, 'hello'])
console.log(filled.size) // 4

// when you iterate a Set, the data will appear in order that items were added or predefined

// one way to  create an array from Set:
const nonUnique = [1, 2, 3, 4, 5, 4, 5, 1, 1]
const uniqueValuesArr = [...new Set(nonUnique)]
console.log(uniqueValuesArr) // [1, 2, 3, 4, 5]
