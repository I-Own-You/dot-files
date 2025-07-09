// Symbol - unique primitive data, can be used as object attribute
const sym = Symbol('sad') // 'sad' will only be visible in debugging mode
const symTwo = Symbol()
console.log(sym === symTwo) // false

// it is useful to create an hidden object attribute, that is unique:
const secondaryId = Symbol()
const user = {
    id: 193,
    name: 'a',
    [secondaryId]: 'olga-1',
}
for (const prop in user) {
    console.log(prop, user[prop])
}
// id 193
// name a
console.log(user[secondaryId]) // olga-1
// for..in doesnt see object attribute created with symbol

// global registry symbols is responsible for all symbols in the program

// returns the symbol that refers to the key,
// if no symbol exists, it will be created automatically
Symbol.for(key)
// returns key which holds the symbol, undefined if not
Symbol.keyFor(symbol)
