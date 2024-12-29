package main

import (
	"fmt"
	"slices"
)

// slices pkg has sort implementations for builtin and user defined types

func sorting() {

	strs := []string{"c", "a", "b"}
	// sorting functions are generic and work for any ordered built-in type
	// it also sorts in place so it modifies the original type
	slices.Sort(strs)
	fmt.Println("Strings:", strs)

	ints := []int{7, 2, 4}
	slices.Sort(ints)
	fmt.Println("Ints:   ", ints)

	// you can check if a type is already sorted
	s := slices.IsSorted(ints)
	fmt.Println("Sorted: ", s)
}
