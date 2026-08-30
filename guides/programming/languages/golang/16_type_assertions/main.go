package main

import (
	"fmt"
)

// type assertion provides access to an interfaces value, other types beside interface/any are not allowed

var S string = "hello"

func main() {

	// go has a way to retrieve data from an interface, usually called (type assertion)
	//
	some_data := any(5) // var a any = 5 is the same thing
	// 1. how it works, some_data interface is tested to hold a "int" type value,
	//    and if it does, it retrieves the data and assigns it to the left variable
	// 1.1 there is a problem, if some_data interface doesnt hold "int", go will panic
	take_data := some_data.(int)
	//
	// there is away to tell if some interface holds an int or not without go to panic
	//
	// 1. some_data clearly doesnt store an "int" value, it stores a "string" value now
	some_data = "a"
	// does_it_store_int variable is a bool type value which receives:
	//	   1. true  - if some_data stores an int, if it does, take_data gets the value and type
	//	   2. false - if some_data do not store int, take_data gets a default value of the type
	//			      tested on which is int from inside ( )
	// 2. be aware of the fact taht "take_data" was previously assigned to a type and value,
	//    so even if you do here some_data.(string) its an error since "take_data" is of type int
	//    now
	take_data, does_it_store_int := some_data.(int)
	fmt.Println(take_data, does_it_store_int)

	// examples:

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

	// go has a special rule, if something untyped get sassignd to something typed, you eiter:
	//  1. convert it to that type
	//  2. underlying types must coincide
	//
	// example:
	type F func(int) int
	// this is allowed, both F and a underlying type are the same
	var a F = a
}

func a(int) int {
	return 2
}
