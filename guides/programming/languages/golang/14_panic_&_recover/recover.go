package main

import "fmt"

// go has a builtin recover() method that can handle the panic and return the program to normal execution again

// this function panics
func willPanic() {
	panic("a problem")
	// you could define here a defer and recover and it would be handled here.
	// its possible to recover from a function that panics but it will anyway exit.
}

func recoverr() {

	// recover() must be called inside a deferred function, be it anonymous or not
	// when the programm panics, defer is activated and recover() handles(catch) the panic.
	// if recover() is called outside defered function, it returns nil, or if no panic occurs, also nil.
	defer func() {
		if r := recover(); r != nil {

			fmt.Println("Recovered. Error:\n", r)
		}
	}()

	// here program panics, defered function activates because main() finished with a panic,
	// recover() handles, in this case prints something, then code goes as normal above mayPanic()
	willPanic()

	fmt.Println("After mayPanic()")
}
