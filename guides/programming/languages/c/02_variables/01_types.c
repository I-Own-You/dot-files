// 1. every varialbe must have a type which specifies what kind of data it holds
// 2. type is imporatant because it specifies how its stored and what operations can it perform
// 3. variable types also depend on system architecture (x32, x64), we assume x64 only

// numeric type: int
// 1. determines the smallest and largest number it can store
// 2. determines if digits are allowed after decimal point aka "."

// int (integer):
// 1. can store 4 bytes of data
// 2. it has (both 4 bytes):
//           1. signed version (negative numbers included)
//           2. unsigned version (non negative numbers)
// 3. when dividing 2 integer types, result is truncated, so there is no decimal point with digits after it

// float (floating point):
// 1. can store 4 bytes of data BUT its stores it differently than integer, it hold the scientific notation,
//    rather than numbers itself, so instead of 123_456 it holds 1.23456 * 10^5 so it can store way more,
//    using this technique, there is a formula for float how it achieves this.
// 2. it can store decimals(this is actually default for every number, it will have .0)
// 3. arithmetic operations on float can be slower than on int
// 4. numbers stored as float actually are just an approximation and sometimes they could show not what we want
//    example: 0.1 as float in a variable can show 0.09999999987 because of rounding error of implementation
// 5. every float value MUST have "f" letter at the end, because if it doesnt have it, the value is actually 
//    type "double", so: float c = 2.0, here 2.0 is actually "double" and you will get a warning from compiler
//    and "implicit type conversion happens" where 2.0 becomes float since variable "c" has float type,
//    so always put "f" letter at the end like this: float c = 2.0f
