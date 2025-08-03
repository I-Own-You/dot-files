package main

import (
	"fmt"
	"math"
)

// constants are defined at compile time, so they are immutable

// constant can be character, string, numeric, boolean types
const s string = "constant"
const number = 0

func constants() {
	fmt.Println(s)

	const (
		e  = iota // 0, iota is reset to 0 if it encounters a constant declaration and increasez by 1
		e1        // 1
		e2        // 2
	)

	const a = "2"
	// const statement can be initialized everywhere a var can
	const n = 500000000

	// constant expressions perform arithmetic with arbitrary precision
	// (the limit is the memory of digits after the dot(.)  ).
	const d = 3e20 / n
	fmt.Println(d)

	// a constant has no type until it’s given one, such as by an explicit conversion.
	// this is why they have *untyped { type }* like untyped float,
	// but float isnt a valid type, float32 or float64 is, applied to all supported types for constants
	fmt.Println(int64(d))

	// a number can be given a type by using it in a context that requires one,
	// such as a variable assignment or function call.
	// For example, here math.Sin expects a float64.
	fmt.Println(math.Sin(n))
}
