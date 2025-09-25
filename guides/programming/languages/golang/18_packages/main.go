// every go programm is made up of packages.
// the start of the programm is always in the main package
package main

import (
	"fmt"
	"math/rand" // the last name is the package name you can start using, here its rand, "/" is a delimeter
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}

// there is also a function that will run after all variables are initialized (outside of functions) in all packages,
// and after all packages are imported, before the main() execution.
//
// if there are multiple init functions and they dont terminate the execution like return,log.fatal, .etc:
// 1. init functions from imported packages
// 2. init functions from current package in case there are multiple files of same pkg you cant guarantee the order.
//    (order is determined by go toolchain)
// 3. if more than 1 init funciton in the same file, it executes from top to bottom

var S string

func init() {
	if S == "" {
		fmt.Println(1)
	}
}
