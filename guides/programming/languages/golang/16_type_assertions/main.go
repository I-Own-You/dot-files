package main

import (
	"fmt"
)

// type assertion provides access to an interfaces value underlying concrete value

var S string = "hello"

func main() {
	var i interface{} = "hello"

	// s will hold the value of the i interface if interface i contains string value
	s := i.(string)
	fmt.Println(s)

	// ok will be boolean that means succes or fail
	s, ok := i.(string)
	fmt.Println(s, ok)

	f, ok := i.(float64)
	fmt.Println(f, ok)

	// if you do not have the bool variable assigned and the interface is wrong, go will panic
	f = i.(float64) // panic
	fmt.Println(f)
}
