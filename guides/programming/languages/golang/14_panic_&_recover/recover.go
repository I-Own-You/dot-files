package main

import "fmt"

// go has a builtin recover() method that can handle the panic and return the program to normal execution again

// this function panics
func willPanic() {
	panic("a problem")
	// you could define here a defer and recover and it would be handled here, but the function will anyway exit.
}

func main() {

	// recover() must be called inside a deferred function, be it anonymous or not
	// when the programm panics, defer is activated and recover() handles the panic.
	// if recover() is called outside defered function, it always returns returns nil
	defer func() {
		if r := recover(); r != nil {

			fmt.Println("Recovered. Error:\n", r)
		}
	}()

	// here program panics, defered function activates because main() finished with a panic,
	// recover() handles, in this case prints something, then program ends
	willPanic()

	// wont reach, because the panic happened inside main because of willPanic()
	fmt.Println("After mayPanic()")
}
