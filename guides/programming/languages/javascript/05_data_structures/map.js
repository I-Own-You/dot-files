// Map - a collection of keys, value pairs,
// keys and values can be anything(NaN, undefined, null, .etc),
// also key values are not type checked, so 1 is not '1')

// 27.1 some useful methods:
// set(key, value) // sets a key, value pair
// get(key) // gets value
// has(key) // check for key, returns true or false
// values() // returns an iterator of all elements in the collection
// keys() // returns an iterator of all keys in the collection
// entries() // returns an iterator of key,value pair
// delete(key) // deletes a key, and its value also, returns true or false
// clear() // clears the collection
// forEach(callback) — iterates through key,value pairs, callback(value, key, map)

const someData = new Map()
someData.set('1', '1')
someData.set(1, 1)
someData.set(true, 'fds')
console.log(someData.size) // 3
console.log(someData.get(1)) // 1
console.log(someData.get('1')) // '1'
console.log(someData.has(true)) // true
someData.clear()
console.log(someData.size) // 0

// you can predefined data in Map also:
const map = new Map([
  ['js', 'JavaScript'],
  ['css', 'Cascading Style Sheets'],
])
console.log(map.size) // 2
console.log(map.get('js')) // JavaScript
