// iterator - an object that can access a collection element one time,
// and it also remembers its place in that collection

// returns an iterator, which can access .next() method which will return the next element

// .next() method also has 2 attributes,
// value - the current element returning,
// done - boolean value meaning if all elements were returned
function makeIterator(array) {
    let nextIndex = 0
    return {
        next: function () {
            if (nextIndex < array.length) {
                const result = { value: array[nextIndex], done: false }
                nextIndex++
                return result
            } else {
                return { done: true }
            }
        },
    }
}
let iterator = makeIterator(['Hello', 'world'])
console.log(iterator.next().value) // 'Hello'
console.log(iterator.next().value) // 'world'
console.log(iterator.next().done) // true

// for an object to be iterable,
// it must implement @@iterator method,
// it means that object itself or an object through prototype chain must have Symbol.iterator attribute
const person = {
    name: 'Mark',
    age: 30,
    gender: 'male',
    interests: ['music', 'fishing'],
}
person[Symbol.iterator] = function () {
    const properties = Object.keys(this)
    let count = 0
    return {
        next() {
            if (count < properties.length) {
                const key = properties[count]
                let result = { done: false, value: person[key] }
                count++
                return result
            } else {
                return { done: true }
            }
        },
    }
}
for (let x of person) {
    // we can use now person with for..of because its iterable now
    console.log(x) // Mark, 30, male, ['music', 'fishing']
}

// where it is used ?
// 1. when destructurizing an array into variables, iterator is used to access the elements from array.
// 2. Array.from() uses it to get elements from an iterable and construct an array.
// 3. spread operator also uses iterator
// 4. Map/Set

// asynchronous iterators:
let asyncRange = {
    from: 1,
    to: 5,
    // for await..of executes one time this method
    [Symbol.asyncIterator]() {
        // (1)
        // returns an iterable object
        // then for..of works with this object, requestin the next value with next()
        return {
            current: this.from,
            last: this.to,

            // next() is called on each iteration of for..of
            async next() {
                // (2)
                // must return value like {done:.., value :...}
                // (it converts into a promise automatically because of the async,
                // so we dont need to return a promise by ourself)
                // we can use await because of the async
                await new Promise((resolve) => setTimeout(resolve, 1000)) // (3)
                if (this.current <= this.last) {
                    return { done: false, value: this.current++ }
                } else {
                    return { done: true }
                }
            },
        }
    },
}

;(async () => {
    for await (let value of asyncRange) {
        // (4)
        alert(value) // 1,2,3,4,5
    }
})()
// we dont need async/await,
// its just easier because it converts the next() method into a promise automatically,
// and we can use await, you dont need async/await or promise eiter
