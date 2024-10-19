package main

import (
	"fmt"
	"os"
	"strings"
)

// working with envs in go is very easy as it is below

func main() {

	os.Setenv("FOO", "1")
	fmt.Println("FOO:", os.Getenv("FOO"))
	fmt.Println("BAR:", os.Getenv("BAR"))

	fmt.Println()
	for _, e := range os.Environ() {
		pair := strings.SplitN(e, "=", 2)
		fmt.Println(pair[0])
		fmt.Printf("pair: %v\n", pair)
	}

	// lookup is used to distinguish between unset variables and variables with empty values.
	// there are other useful methods.
	str, b := os.LookupEnv("sadffs")
	fmt.Printf("str: %v\n", str)
	fmt.Printf("b: %v\n", b)

	// go will also pick envs set when executing programm like: [someVar=2 go run ourProgram.go]
}
