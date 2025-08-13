package main

import "fmt"

func main() {
	// capacity:        1 byte
	// default:         false
	// possible values: true/false
	var a bool
	fmt.Printf("a: %v\n", a)

	// 1. string is just a sequence of bytes under the hood.
	// 2. the size of a string in Go is composed of two parts:
	//	   1. Header: contains a pointer to the string data and its length.
	//	   2. Data: The actual string data.
	// default: ""
	// possible values:
	//     1. raw string: `example\n`, here \n wont be parsed, it goes as it it, and \,n are seaparte bytes also
	//     2. interpreted string: "fadsfads", "%s al", "\x02", .etc.
	var b string
	fmt.Printf("b: %v\n", b)

	// 1. rune is an alias for int32 in all ways.
	// 2. its used to distinguish between rune types and int32 values.
	// 3.rune types are decimal values that denote hexadecimal unicode code point of a symbol.
	// capacity:         4 byte
	// default value:    0
	// possible values: -2_147_483_648 ~ 2_147_483_647   (-2^31 ~ 2^31 - 1)
	var c rune
	fmt.Printf("c: %v\n", c)

	// 1. byte is an alias for uint8 in all ways.
	// 2. its used to distinguish between uint8 values and byte sequences.
	// capacity:        1 byte
	// default value:   0
	// possible values: 0 ~ 255   (0 ~ 2^8 - 1)
	var d byte
	fmt.Printf("d: %v\n", d)

	// 1. 6-7 decimal digits precision. (typically 7)
	//capacity:         4 bytes
	//default value:    0
	//possible values: (1.4 * 10^-45 ~ 3.4 * 10^38)
	var e float32
	fmt.Printf("e: %v\n", e)

	// 1. 15-17 decimal digits precision. (typically 15)
	// capacity:         8 bytes
	// default value:    0
	// possible values: (5.0 * 10^-324 ~ 1.8 * 10^308)
	var e1 float64
	fmt.Printf("e1: %v\n", e1)

	// 1. complex{64,128} is the set of all complex numbers with float{32,64} real and imaginary parts.
	// capacity:        flaot32/float64 both parts
	// default values:  (0+0i)
	// possible values: flaot32/float64 both parts
	var f complex64
	var f1 complex128
	fmt.Printf("f: %v\n", f)
	fmt.Printf("f1: %v\n", f1)

	// 1. int, uint, uintptr typically are 32 bit on 32bit systems, 64bit on 64bit systems.
	// 2. int and uint must be used when you need an integer value unless you need a constraint.
	// capacity:        4 bytes on 32bit system, 8 bytes on 64bit system
	// default value:   0
	// possible values: int32/int64
	var g int
	fmt.Printf("g: %v\n", g)

	// capacity:        uint32/uint64
	// default value:   0
	// possible values: uint32/uint64
	var g1 uint
	fmt.Printf("g1: %v\n", g1)

	// 1. uintptr is an unsigned integer type that is large enough to hold the bit pattern of any memory address (pointer).
	// 2. it is primarily used for low-level operations:
	//		1. interacting with system calls
	//      2. interacting with memory addresses directly
	//      3. converting a pointer to an integer or vice versa.
	// 3. it is often used with Go’s unsafe package to perform low-level pointer arithmetic
	// 4. uintptr is not a pointer, it is not safe to use it as a real pointer, even though it can hold one
	// 5. if the garbage collector runs, the actual memory location might change, making the uintptr value invalid.
	// 6. always prefer real pointers (*T) unless working in low-level scenarios.
	// capacity:        uinptr32/uintptr64
	// default:         0
	// possible values: uinptr32/uintptr64
	var g2 uintptr
	fmt.Printf("g2: %v\n", g2)

	//capacity:         1 byte
	//default value:    0
	//possible values: -128 ~ 127   (-2^7 ~ 2^7 - 1)
	var g3 int8
	fmt.Printf("g3: %v\n", g3)

	//capacity:        1 byte
	//default value:   0
	//possible values: 0 ~ 255   (0 ~ 2^8 - 1)
	var g4 uint8
	fmt.Printf("g4: %v\n", g4)

	//capacity:         2 byte
	//default value:    0
	//possible values: -32_768 ~ 32_767   (0 ~ 2^8 - 1)
	var g5 int16
	fmt.Printf("g5: %v\n", g5)

	//capacity:        2 byte
	//default value:   0
	//possible values: 0 ~ 65_535   (0 ~ 2^16 - 1)
	var g6 uint16
	fmt.Printf("g6: %v\n", g6)

	//capacity:         4 byte
	//default value:    0
	//possible values: -2_147_483_648 ~ 2_147_483_647   (-2^31 ~ 2^31 - 1)
	var g7 int32
	fmt.Printf("g7: %v\n", g7)

	//capacity:        4 byte
	//default value:   0
	//possible values: 0 ~ 4_294_967_295   (0 ~ 2^32 - 1)
	var g8 uint32
	fmt.Printf("g8: %v\n", g8)

	//capacity:         8 byte
	//default value:    0
	//possible values: -9_223_372_036_854_775_808 ~ 9_223_372_036_854_775_807   (-2^63 ~ 2^63 - 1)
	var g9 int64
	fmt.Printf("g9: %v\n", g9)

	//capacity:        8 byte
	//default value:   0
	//possible values: 0 ~ 18_446_744_073_709_551_615   (0 ~ 1^64 - 1)
	var g10 uint64
	fmt.Printf("g10: %v\n", g10)

	// alias for interface{}, basically means any type
	// default: nil
	var h any
	fmt.Printf("h: %v\n", h)
	// same as
	var m interface{}
	fmt.Printf("m: %v\n", m)

	// 1. channel of type int
	// default: nil
	var i chan int
	fmt.Printf("i: %v\n", i)

	// 1. map type [key]value, [key:int]value:int
	// default: nil
	var j map[int]int
	fmt.Printf("j: %v\n", j)

	// 1. you can have any signature of the function, with parameters, its types, return values, and its types
	// default: nil
	var k func()
	fmt.Printf("k: %v\n", k)

	// 1. if it would have values, it would be {0, , false}, default values for fields, as example
	// default value: {}
	var l struct{}
	fmt.Printf("l: %v\n", l)

	// array
	// default: []
	// if it would have a length, it would be [0, 0, .etc]
	var arr [0]int

	// slice
	// default: nil
	// if it would have a length, it would be [0, 0, .etc]
	var slice []int
}

// this is a custom defined type, the underlying type is int
type A int

// also custom type, underlying type is struct{}
type B struct{}

// .etc...
type something any // type something interace{}, same

type iceCream string

// this is called an alias type which is fully equal to its right hand type, iceCream == aliasIceCream,
// if we defined: type aliasIceCream iceCream, aliasIceCream would be unique type and distinct from iceCream.
type aliasIceCream = iceCream
