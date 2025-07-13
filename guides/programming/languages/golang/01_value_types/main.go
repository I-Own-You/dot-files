package main

import "fmt"

// this is a custom defined type, the underlying type is int
type A int

// also custom type, underlying type is struct{}
type B struct{}

// .etc...
type something any // type something interace{}, same

// a generic type
type myGenericType[K comparable, V any] map[K]V

// error, type paramteres cant be used as types for a type itself
// type genericType[A any] A

type iceCream string

// this is called an alias type which is fully equal to its right hand type, iceCream == aliasIceCream,
// if we defined: type aliasIceCream iceCream, aliasIceCream would be unique type and distinct from iceCream.
type aliasIceCream = iceCream

// type aliases provide a easy way to define same types from different packages, as an example.
// type TFromDiffPkg = somePkg.TypeName
// type MapFromDiffPkg[K comparable, V any] = someOtherPkg.MapType       // not yet supported, look below
// type MapFromDiffPkg[K comparable, V any] = someOtherPkg.MapType[K, V] // not yet supported, look below

// this will be available in february 2025, generic type aliasess are not yet supported
// type aliasMyGenericType[K comparable, V any] = myGenericType[K, V]

func main() {
	//capacity: 1 byte
	//possible values: true/false
	//default value: false
	var a bool
	fmt.Printf("a: %v\n", a)

	//raw literal strings: `example\n`, here \n wont be parsed, it goes as it it, and \,n are seaparte bytes also
	//interpreted literal string: "fadsfads", "%s al", "\x02", .etc.
	//string is just a sequence of bytes under the hood.
	//
	//the size of a string in Go is composed of two parts:
	//
	//1. Header: contains a pointer to the string data and its length.
	//on most systems, this header is 16 bytes (8 bytes for the pointer and 8 bytes for the length) in
	//a 64-bit architecture.
	//2. Data: The actual string data. In your example, "a" is 1 byte in length if encoded in UTF-8.
	//
	//var ourString = "a"
	//the total memory allocated for the string "a" would be 17 bytes (16 bytes for the header + 1 byte for the data).
	//
	//The 16 bytes header is the overhead used by the Go runtime to manage the string.
	//this is why even very short strings like "a" use more than just the byte for the actual character data.
	//
	//var a string, var b = "a", var c = ""
	//here, all the variables, even initialized or not, they all have allocated memory for the header,
	//and only the b variable would have the data part counted because of the "a".
	//
	//capacity: 4 for 32bit systems, 8 bytes for 64bit systems, the limitation is about pc memory and OS limitations.
	//posible values: raw literal string, interpreted literal string.
	//default value: ""
	var b string
	fmt.Printf("b: %v\n", b)

	//rune is an alias for int32 in all ways.
	//its used to distinguish between rune types and int32 values.
	//rune types are decimal values that denote hexadecimal unicode code point of a symbol.
	//capacity: 4 byte
	//possible values: -2_147_483_648 ~ 2_147_483_647   (-2^31 ~ 2^31 - 1)
	//default value: 0
	var c rune
	fmt.Printf("c: %v\n", c)

	//byte is an alias for uint8 in all ways.
	//its used to distinguish between uint8 values and byte sequences.
	//capacity: 1 byte
	//possible values: 0 ~ 255   (0 ~ 2^8 - 1)
	//default value: 0
	var d byte
	fmt.Printf("d: %v\n", d)

	//6-7 decimal digits precision. (typically 7)
	//capacity: 4 bytes
	//possible values: (1.4e-45 ~ 3.4e+38)
	//default value: 0
	var e float32
	fmt.Printf("e: %v\n", e)
	//
	//15-17 decimal digits precision. (typically 15)
	//capacity: 8 bytes
	//possible values: (5.0e-324 ~ 1.8e+308)
	//default value: 0
	var e1 float64
	fmt.Printf("e1: %v\n", e1)

	//complex{64,128} is the set of all complex numbers with float{32,64} real and imaginary parts.
	//capacity: 4 bytes for float32, 8 bytes for float64
	//possible values: both real imaginary type goes to (float32 for complex64) and (float64 for complex128)
	//default values: (0+0i)
	var f complex64
	var f1 complex128
	fmt.Printf("f: %v\n", f)
	fmt.Printf("f1: %v\n", f1)

	//int, uint, uintptr typically are 32 bit on 32bit systems, 64bit on 64bit systems.
	//int and uint must be used when you need an integer value unless you need a constraint.
	//
	//capacity: 4 bytes on 32bit system, 8 bytes on 64bit system
	//possible values: int32 on 32bit systems, int64 on 64bit systems
	//default value: 0
	var g int
	fmt.Printf("g: %v\n", g)

	//capacity: 4 bytes on 32bit system, 8 bytes on 64bit system
	//possible values: uint32 on 32bit systems, uint64 on 64bit system
	//default value: 0
	var g1 uint
	fmt.Printf("g1: %v\n", g1)

	//uintptr is an unsigned integer type that is large enough to hold the bit pattern of any memory address (a pointer).
	//
	//it is primarily used for low-level operations, such as interacting with system calls or memory addresses directly,
	//where you need to convert a pointer to an integer or vice versa.
	//
	//it is often used with Go’s unsafe package to perform low-level pointer arithmetic,
	//although Go discourages direct manipulation of memory.
	//
	//uintptr is not a pointer: Even though uintptr holds a pointer value, it is not safe to use it as a real pointer.
	//for instance, if the garbage collector runs, the actual memory location might change, making the uintptr value invalid.
	//always prefer real pointers (*T) unless working in low-level scenarios.
	//
	//capacity: 4 bytes on 32bit system, 8 bytes on 64bit system
	//possible values: uint32 on 32bit systems, uint64 on 64bit systems
	//default value: 0
	var g2 uintptr
	fmt.Printf("g2: %v\n", g2)

	//capacity: 1 byte
	//possible values: -128 ~ 127   (-2^7 ~ 2^7 - 1)
	//default value: 0
	var g3 int8
	fmt.Printf("g3: %v\n", g3)

	//capacity: 1 byte
	//possible values: 0 ~ 255   (0 ~ 2^8 - 1)
	//default value: 0
	var g4 uint8
	fmt.Printf("g4: %v\n", g4)

	//capacity: 2 byte
	//possible values: -32_768 ~ 32_767   (0 ~ 2^8 - 1)
	//default value: 0
	var g5 int16
	fmt.Printf("g5: %v\n", g5)

	//capacity: 2 byte
	//possible values: 0 ~ 65_535   (0 ~ 2^16 - 1)
	//default value: 0
	var g6 uint16
	fmt.Printf("g6: %v\n", g6)

	//capacity: 4 byte
	//possible values: -2_147_483_648 ~ 2_147_483_647   (-2^31 ~ 2^31 - 1)
	//default value: 0
	var g7 int32
	fmt.Printf("g7: %v\n", g7)

	//capacity: 4 byte
	//possible values: 0 ~ 4_294_967_295   (0 ~ 2^32 - 1)
	//default value: 0
	var g8 uint32
	fmt.Printf("g8: %v\n", g8)

	//capacity: 8 byte
	//possible values: -9_223_372_036_854_775_808 ~ 9_223_372_036_854_775_807   (-2^63 ~ 2^63 - 1)
	//default value: 0
	var g9 int64
	fmt.Printf("g9: %v\n", g9)

	//capacity: 8 byte
	//possible values: 0 ~ 18_446_744_073_709_551_615   (0 ~ 1^64 - 1)
	//default value: 0
	var g10 uint64
	fmt.Printf("g10: %v\n", g10)

	//any is alias for interface{}, basically means any type
	var h any
	fmt.Printf("h: %v\n", h)
	// same as
	var m interface{}
	fmt.Printf("m: %v\n", m)

	//a channel fo type int, you can have here any channel type
	var i chan int
	fmt.Printf("i: %v\n", i)

	//a map type [key:value] of int key and int value, also can have any type for key:value
	var j map[int]int
	fmt.Printf("j: %v\n", j)

	//again, you can have any signature of the function, with parameters, its types, return values, and its types
	var k func()
	fmt.Printf("k: %v\n", k)

	var l struct{}
	fmt.Printf("l: %v\n", l)

	// array

	var arr [0]int

	// slice
	var slice []int
}
