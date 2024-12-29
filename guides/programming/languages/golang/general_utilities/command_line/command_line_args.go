package main

import (
	"fmt"
	"os"
)

// go also has utilities to work with command line arguments

func CommandLineArguments() {

	// all raw cli arguments, the first one is always the program that runs,
	// or a bit more if you run it instead of building.
	argsWithProg := os.Args

	// separate the program argument which starts the builded program
	argsWithoutProg := os.Args[1:]

	// accessing a cli argument
	arg := os.Args[3]

	fmt.Println(argsWithProg)
	fmt.Println(argsWithoutProg)
	fmt.Println(arg)
}
