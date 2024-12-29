package main

import "fmt"

var a, b = 1, 2
var c, d int = 3, 4
var e, f, g = true, false, 1

var (
	a1 int
	a2 int8 = 2
	a3      = 3
)

func example1() {
	fmt.Printf("a: %v\n", a) // 1
}

func example2() {
	a := 1000                // you can shadow the global variable
	fmt.Printf("a: %v\n", a) // 1000
}

func VariableDeclaration() {
	var (
		a10 int
		a12 int = 2
		a13     = 0
	)
	fmt.Printf("a10: %v\n", a10)
	fmt.Printf("a12: %v\n", a12)
	fmt.Printf("a13: %v\n", a13)

	// even though there is a variable defined with the same name in global scope,
	// you can shadow it by definig new one in local scope
	var a = "initial" // type is inferred from value
	fmt.Println(a)

	var b, c int = 1, 2 // type is declared
	fmt.Println(b, c)

	var d = true
	fmt.Println(d)

	var e int // variables without values are zero-valued of each of its type, int = 0, bool = false, .etc
	fmt.Println(e)

	// shorthand for declaring+initializing a variable, type is inferred, this syntax can be used only in functions
	f := "apple"
	// not quite same as above because the type is given, its string, the above is inferred from "apple" constant
	var f_copy string = "apple"
	fmt.Println(f)
	fmt.Println(f_copy)
}
