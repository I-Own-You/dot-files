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
	check(F(func(int, int) int { return 2 }))
}

type F func(int, int) int

func check(F) {}
