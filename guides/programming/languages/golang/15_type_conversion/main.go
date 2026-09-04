package main

import (
	"fmt"
	"math"
)

// in go, assignment of some type to another requires explicit conversion: T(v)

func main() {
	var x, y int = 3, 4
	var f float64 = math.Sqrt(float64(x*x + y*y)) // int -> float64
	var z uint = uint(f)                          // float64 -> uint
	fmt.Println(x, y, z)

	// type conversion to a custom type is also possible, yes
	check(func(int, int) int { return 2 })

	// 1. casting a rune literal into byte is illegal if it overflows, but allowed through a variable which
	//    will basically perform a complement wrapping
	// fmt.Println(byte('ы')) // error, ы holds 1099 decimal number for its code point,
	//						  byte is from 0 till 255
	rune_literal := 'ы'
	fmt.Printf("rune_literal: %v\n", byte(rune_literal)) // allowed, things like this are performed:
	//														1099 > 255 ? then 1099 - 255 = 844
	//														844 > 255 ? then 844 - 255 = 589
	//														589 > 255 ? then 589 - 255 = 334
	//														334 > 255 ? then 334 - 255 = 79
	//														79 > 255 ? then 79
}

type F func(int, int) int

func check(F) {}
