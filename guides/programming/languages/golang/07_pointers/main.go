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

// 1. variables passed into functions without explicit "&":
//       1. maps: copy of pointer
//       2. slices: copy of pointer
//
//       3. arrays:
//			1. copy of value
//		    2. if it has pointers inside, copy of them are passed:
//				1. without dereferncing you change only the copy
//				2. with dereference you change the underlying data
//
//       4. structs:
//			1. copy of value
//			2. if it has pointer fields:
//				1. without dereferncing you change only the copy
//				2. with dereference you change the underlying data
//
//       5. channels: copy of pointer
//       6. interfaces: copy of pointer
//       7. functions: copy of pointer
//
//		 summary:
//       	1. everything in golang passes by value.
//		 	2. copy of pointer does not allow changing the variable itself, you need the actual pointer,
//			   not copy
//			3. slices and map - can change data through copy pointer
//		 	3.1 copy pointers inside array/struct can change data through copy pointer, but you need
//				explicit dereferncing("*" in front) or you will alter the copy pointer
