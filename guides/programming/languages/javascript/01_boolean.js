const isTrue = true
const isFalse = false

//you can turn a value into its false state with ! operator:
const a = true // here you can put any value which results in true, ! operator will work with it
const b = !a // b will be false
const c = !!a // make a false, then true again, same as Boolean(a)

// you can use &&, ||, !, ?? operators:
console.log(2 && 3) // true, it only checks the left side and returns the right side
console.log(2 || 3) // 2, checks the left side, if true, returns it, if not, returns right side
console.log(!false) // true
console.log(null ?? 1) // 1, it means if the left side is either null or undefine, return right side

// you can also use binary operators like &,|,^
// they differ a bit, in terms of &,|
console.log(true & false) // 0, in case with && it would return false(right side),

// but because its a binary operator it checks both sides, which results in 0(false)
console.log(true | false) // 1, | operator works as ||

// BigInt - type of number that is bigger than primitive one:
const biggy = 9997000254740991n // n at the end is to show that the number is of BigInt type
const alsoBig = BigInt(999700025499999)
// BigInt cant be serialized wiht JSON

// values that are always false:
console.log(
  0 == false,
  -0 == false,
  '' == false,
  Boolean(null) == false, // null is absence of something, but its not false, use with Boolean(null)
  Boolean(undefined) == false, // undefined means not there at all, use with Boolean(undefined)
  Boolean(NaN) == false, // NaN means not a number, use with Boolean(NaN)
  0n == false
)

// ternary operator - a shorthand for inline if else
// condition ? value(if true) : value(if false)
//
// use case:
const someNum = 5
console.log(someNum === 5 ? 'a' : 'b') // a
//
const anotherNum = 10
const someResult = anotherNum > 10 ? 'more than 10' : 'less then 10'
console.log(result)
// nested ternary operators:
const num = 10
const result =
  num > 10
    ? 'more than 10'
    : num === 10
    ? 'number equals 10'
    : 'number less than 10' // check first, then second, like if else if else
console.log(result) // 'number equals 10'
