package main

import "fmt"

// here, ival takes a copy of the value,
// and not the memmory address variable itself(if a variable has been passed)
func zeroval(ival int) {
	ival = 0
}

// here, iptr holds a pointer to the variable passed, so it can access and modify it
func zeroptr(iptr *int) {
	*iptr = 0
}

func main() {
	// go supports pointers that let you pass referenes to values and records

	i := 1
	fmt.Println("initial:", i) // 1

	// here, only a copy of the value is sent, not the variable address
	zeroval(i)
	fmt.Println("zeroval:", i) // 1

	// here, because of the &, the memmory address of the variable is sent, so it will be modified
	zeroptr(&i)
	fmt.Println("zeroptr:", i) // 0

	fmt.Println("pointer:", &i) // some address

	// ptrI holds a references of memory address of variable i
	var ptrI *int = &i
	fmt.Printf("value of variable i: %v\n", i)
	fmt.Printf("value of variable ptrI: %v\n", *ptrI)
}
