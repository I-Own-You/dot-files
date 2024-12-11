package main

import (
	"fmt"
	"math"

	// if you dont have a .mod file, this will work because the path to the package is right,
	// but if you had a .mod file with module name(which is the idiomatic way),
	// you would have modName/aloha.
	//
	// also, if a folder is named aloha and the package it contains has the name aloha1,
	// then you would need aloha1 "./aloha", the package is always needed.
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
