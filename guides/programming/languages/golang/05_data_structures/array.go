package main

import "fmt"

func ArrayDataStructure() {

	// in Go, an array is a numbered sequence of elements of a specific length
	// slices thought are more common, so arrays are useful in specific scenarios

	// basic array of fixed 5 length with default values for the array type,
	// [5]int so array will be [0,0,0,0,0]
	var a [5]int
	fmt.Println("emp:", a)

	// this way you can set a value
	a[4] = 100
	fmt.Println("set:", a)

	// this way you can get a value
	fmt.Println("get:", a[4])

	// returns the length of the array
	fmt.Println("len:", len(a))

	// same as a variable initialization, within { } comes the values for the array
	b := [5]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// the length will be calculated by the compiler from within { }.
	// the ... here is a special notation menaning the length is inferred from the values within { }.
	b = [...]int{1, 2, 3, 4, 5}
	fmt.Println("dcl:", b)

	// you can also specify the index position and value.
	// all values between the specified index and value before it will be zeroed values of arrays type,
	// this means the array will be [100, 0, 0, 400, 500].
	b = [...]int{100, 3: 400, 500}
	fmt.Println("idx:", b)

	// multi dimensional arrays
	var twoD [2][3]int
	for i := 0; i < 2; i++ {
		for j := 0; j < 3; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

	// and you can also create and initialize a multi dimensional array
	twoD = [2][3]int{
		{1, 2, 3},
		{1, 2, 3},
	}
	fmt.Println("2d: ", twoD)

}
