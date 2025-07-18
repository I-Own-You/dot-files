package main

import "fmt"

func main() {

	// for is the only looping construct in go

	// classic for loop with initializer, condition, after
	for j := 0; j < 3; j++ {
		fmt.Println(j)
	}

	// you can have more than one variable defined, but
	// in this case you cant do things like i++, j++.
	// because the last part of the for must be an expression or a single statement
	for i, j := 0, 1; j < 3; i, j = i+1, j+1 {
		fmt.Println(j)
	}

	// for with a condition, like while with condition
	i := 1
	for i <= 3 { // same as for ; i <= 3 ;
		fmt.Println(i)
		i = i + 1
	}

	// for , like infinity while until you break/return
	for {
		fmt.Println("loop")
		break
	}

	// for using a range of something, loop over something N times
	// break/continue also works in for loops
	for n := range 6 {
		if n%2 == 0 {
			continue
		} else {
			fmt.Println(n)
			break
		}
	}

	// you can also use range to iterate over builtin structures
	// here is a slice, arrays will also work
	nums := []int{2, 3, 4}
	// we can specify 2 variables instead of one, first is the index, seconds the value
	for index, value := range nums {
		fmt.Printf("index: %d, value: %d.", index, value)
	}

	// same as above using slice literal
	for index, value := range []int{2, 3, 4} {
		fmt.Printf("index: %d, value: %d.", index, value)
	}

	// iterating over map you have both key,value pair from range
	kvs := map[string]string{"a": "apple", "b": "banana"}
	// when ranging over map, the first varialbe is the key, not index, the second is the value of a key
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	// if you specify only one variable ranging over map, the key will be given
	for k := range kvs {
		fmt.Println("key:", k)
	}

	// you can also iterate over unicode points, here is the string
	// i = index, c = unicode number
	// string under the hood are []string slice, if here would be some symbols that are outside ascii, like unicode,
	// range can handle those and the index might be different, like +2 or +3 becuase some symbols can span 2-4 bytes.
	for i, c := range "go" {
		fmt.Println("i=", i, "c=", c) // 0 103, 1 111
	}

	// here 'g' will be the number version of 'g' because the '{symbol}' which is a rune which is an alias for
	// int32, which is itself a number which points to a unicode character.
	for c := range 'g' {
		fmt.Println(c) // 0, 1, 2, n, 102
	}
}
