package main

import (
	"fmt"
	"math"

	// this here wont work because you need a go.mod file, but the info from below is correct.
	"./aloha"
)

// in go, a name is exported if it starts with a capital letter, Ana -> exported, ana -> not exported.
// when importing a package you can refer to only exported names.
// these rules aplies only to outside packages, not the same package, so if you are in the same package,
// any name will be exported by default, even though they could be in different files.

func main() {
	fmt.Println(aloha.A) // its capital letter so it can be accessed
	// fmt.Println(math.pi) // error
	fmt.Println(math.Pi) // no error
}
