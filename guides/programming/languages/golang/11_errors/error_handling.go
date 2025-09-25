package main

import (
	"errors"
	"fmt"
)

// its idiomatic for go to return errors as a separte value and access it, rather than try/catch or throwing,
// or whatever, so its very simple to handle them

// by convention, error is the last value returned with type error(builtin interface)
func ff2(arg int) (int, error) {
	if arg == 42 {

		// errors.New() constructs basic errors with a message
		return -1, errors.New("can't work with 42")
	}

	// by convention a nil value in the error position means no error encountered
	return arg + 3, nil
}

// predeclared errors that can be used for future, they all have erorr type.
// fmt.Errorf() is also the second way of creating errors beside errors.New().
var ErrOutOfTea = fmt.Errorf("no more tea available")
var ErrPower = fmt.Errorf("can't boil water")

func makeTea(arg int) error {
	if arg == 2 {
		// here is how you can return the predefined error
		return ErrOutOfTea
	} else if arg == 4 {

		// you can wrap errors with higher level errors for a context, in this case this is a higher level error,
		// and ErrPower is the lower level error
		// its like A wraps B which wraps C, .etc, you can use this trick with functions like errors.Is, errors.As
		// one of way to wrap the error is using %w directive of fmt.Errorf().
		// under the hood %w adds an Unwrap() method to Errorf() that will return an error,
		// Unwrap() - deault method for unwrapping nested erorrs on chain, the rest of functionality is the same as %v
		return fmt.Errorf("making tea: %w", ErrPower)

		// you could also just pass the text from an error to the newly created error
		// instead of creating a new nested one but you lose the chain so,
		// method like errors.Is(myError, ErrPower) will give false
		// return fmt.Errorf("making tea: %v", ErrPower)
	}
	return nil
}

func ErrorHandling() {
	for _, i := range []int{7, 42} {
		// its common to check errors inline, if is one of them
		if r, e := ff2(i); e != nil {
			fmt.Println("f failed:", e)
		} else {
			fmt.Println("f worked:", r)
		}
	}

	for i := range 5 {
		// here we also could check if err == ErrOutOfTea, err == ErrPower
		if err := makeTea(i); err != nil {

			// errors.Is lets you find out if an error or any erorr in the chain matches a specific error,
			// its very useful for nested/wrapped errors for finding errors in a chain of them.
			// if an error wraps another error, it can unwrap and look thorugh those errors to find.
			// the checking is based on the error value.
			if errors.Is(err, ErrOutOfTea) {
				fmt.Println("We should buy new tea!")
			} else if errors.Is(err, ErrPower) {
				fmt.Println("Now it is dark.")
			} else {
				fmt.Printf("unknown error: %s\n", err)
			}
			continue
		}

		fmt.Println("Tea is ready!")
	}
}
