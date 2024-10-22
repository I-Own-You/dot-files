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
}
