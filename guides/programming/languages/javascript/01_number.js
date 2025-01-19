// only [number] type, it includes all types
const aNr = 0.2 // 0.2
const bNr = 2.2 // 2.2
const cNr = 2 // 2
const dNr = NaN
const eNr = Infinity
const fNr = 1e6 // 10 ** 6
const gNr = 3_000_000 // 3 millions

// numbers can also be represented in 2, 8 and 16 bits:
const a = 0b11 // 3
const b = 0o77 // 63
const c = 0xff // 255

// because of the way computers handle fraction numbers, there are side effects:
console.log(0.2 + 0.7) // 0.8999999999999999
// so to avoid things like this, you must truncate, ceil or round them,
// or restrict the fraction numbers to avoid to many operations with it
const priceInCents = 15650
const discount = priceInCents * 0.33
const total = (priceInCents - discount) / 100
console.log(total.toFixed(2)) // 104.86

// also a side effect of comparing a smaller and bigger numbers,
// but because of the rounding of the numbers, 0 is left, and the numbers become identical:
const small = 0.11111111111111111
const smaller = 0.1111111111111111
console.log(small.toFixed(20)) // 0.11111111111111110494
console.log(smaller.toFixed(20)) // 0.11111111111111110494
console.log(small === smaller) // true

// NaN is a special value which defines that a result of an opertion is not a number:
parseInt('ads') // NaN because method wants a number, not string
console.log(NaN + 5) // NaN, because NaN is not a number itselft
console.log('a' * 5) // NaN, cant multiply string and number
console.log(NaN === NaN) // NaN cant be compared with itself
// when you need to check if something is NaN, you can use:
Number.isNaN()
// isNaN is different, it transforms the value into a number, then it checks if its NaN,
// so it can produce different results than Number.isNaN()
isNaN(2)
// to check if the result of somehting is a number and not a special value(Infinity, -Infinity, NaN), use:
Number.isFinite()
// ** operator also works:
console.log(10 ** 6) // same as 1e6

// you can also put '_' between number digits to achieve more readable number:
const integer = 1_234_567_890
const float = 0.123_456_789
const binary = 0b0101_1111_0001
const hex = 0x12_ab_34_cd
const bigInt = 1_234_567_890n

// 1. parseInt(string, decimal_system) takes a string and the decimal system,
//    which will parse the string, default is 10 system.
// 2. if string contains only symbols or the first symbol isnt a number which can be parsed -> return NaN,
//    whitespaces are ignored.
// 3. parseInt() works the same as Number.parseInt()
parseInt('12', 10) // 12
parseInt('absa', 10) // NaN
parseInt('   12', 10) // 12, whitespace at the begginig are ignored
// parseFloat() same as parseInt() but for float numbers
parseFloat(' 2.5') // 2.5

// Number() constructor has more methods and constants than a variable that contains a number
Number().valueOf()
Number.MIN_VALUE
