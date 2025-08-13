// every go programm is made up of packages.
// the start of the programm is always in the main package,
// so you can have a lot of packages but where all happens and
// executes is main function of a package(preferably named main also)
package main

import (
	"fmt"
	"math/rand" // the last name is the package name you can start using, here its rand, "/" is a delimeter
)

func main() {
	fmt.Println("My favorite number is", rand.Intn(10))
}

// there is also a function that will run after all variables are initialized in all packages,
// and after all packages are imported, before the main() execution.
//
// if there are multiple init functions and they dont terminate the execution like return,log.fatal, .etc,
// they will run all.

var S string

func init() {
	if S == "" {
		fmt.Println(1)
	}
}
