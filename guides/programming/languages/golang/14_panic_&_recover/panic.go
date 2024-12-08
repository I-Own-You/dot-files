package main

import "os"

// a panic means something went unexpectedly wrong
// also panic is used to fail fast on errors that should not occur during normal operations, or
// we are not yet ready to handle it

func panicc() {

	panic("a problem") // here program will panic, code below wont execute

	// typically we panic when we get unexpected erorrs or if we dont want to handle them
	_, err := os.Create("/tmp/file")
	if err != nil {
		panic(err)
	}
}
