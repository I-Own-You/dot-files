package main

import (
	"errors"
	"fmt"
)

type myError struct {
	something string
	err       error // you could even have error field which would hold another error when myError initialized
}

func (e *myError) Error() string {
	// return e.something + " " + e.err.Error() // its bad, becasue err field could be nil, so go will panic
	if e.err != nil { // good, we check that the error exists
		return e.something + " " + e.err.Error()
	}
	return e.something
}

// this is the method under the hood of error interface that uses erorrs.Is to unwrap errors in nested/chaind errors
// the unwrapped erorrs also can have this method
func (e *myError) Unwrap() error { return e.err }

type argError struct {
	arg     int
	message string
}

// you can have custom types as errors by implementing the Error() method
func (e *argError) Error() string {
	return fmt.Sprintf("%d - %s", e.arg, e.message)
}

func ff(arg int) (int, error) {
	if arg == 42 {

		return -1, &argError{arg, "can't work with it"}
	}
	return arg + 3, nil
}

func main() {

	_, err := ff(42)
	var ae *argError
	fmt.Printf("ae: %v\n", (*ae))
	// here errors.As finds the first error in err's tree that matches target, and if one is found,
	// sets target to that error value and returns true. otherwise, it returns false.
	// target must be a non-nil pointer to an error type or interface
	if errors.As(err, &ae) {
		fmt.Println(ae.arg)
		fmt.Println(ae.message)
	} else {
		fmt.Println("err doesn't match argError")
	}
}

// you can also have your Error type and implement all those methods from erorrs.Is, erorrs.As, .etc,
// and go will use your implementation and not the builtin
