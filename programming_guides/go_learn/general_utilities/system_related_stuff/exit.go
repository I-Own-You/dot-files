package main

import (
	"fmt"
	"os"
)

// you can exit programs with given status in go with os package

func ExitExmaple() {

	// if you exit with os.Exit(), any defer defined in the programm wont run,
	// no any other defers from any other threads, nested level, .etc wont ever execute.
	defer fmt.Println("!")

	// here we exit with status code 3
	os.Exit(3)

	// note that unlike e.g. C,
	// Go does not use an integer return value from main to indicate exit status.
	// if you’d like to exit with a non-zero status you should use os.Exit.
}
