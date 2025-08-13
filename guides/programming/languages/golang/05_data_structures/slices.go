package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
)

func SlicesDataStructure() {

	// like arrays but more powerful
	// slices are build on top of array type but with additional features
	// slice is a descriptor to the underlying array: pointer to the array, length, capacity
	// capacity is the length of the underlying array, which is reallocated if its surpassed

	// unitialized slices equals nil, and has length = 0
	// initial slice capacity is equal to its length, here is 0
	// it means you cant work with it until intialzied or with make
	var s []string
	fmt.Println("uninit:", s, s == nil, len(s) == 0)

	// you can initialize a slice with initial length, values within will be also zeroed of its type
	// make() allocates an array, and returns a slice that reffers to the array (under the hood)
	// initial slice capacity is equal to its length, here is 3
	s = make([]string, 3)
	fmt.Println("emp:", s, "len:", len(s), "cap:", cap(s))

	var s1 []string
	// make() also accepts a third parameter which will be the capacity of the slice,
	// its mainly for optimization, so now the capacity is 10, and length 3,
	// it means when you surpass the capacity, and append one more element,
	// the slice is reallocated and copied to a new memmory adddress,
	// the element is appended and the capacity is increased, so be cautious
	s1 = make([]string, 3, 10) // ["", "", ""], even though the capacity is 10
	fmt.Println("emp:", s1, "len:", len(s1), "cap:", cap(s1))

	// this way you can set a value
	s[0] = "a"
	s[1] = "b"
	s[2] = "c"
	fmt.Println("set:", s)
	fmt.Println("get:", s[2])

	// returns the length of a slice
	fmt.Println("len:", len(s)) // 3

	// append() function appends a new element to a slice and returns a new slice,
	// it could be 1, 2 elements or a slice with [slice_name]... form.
	// if the slice has enough capacity it will be resliced to have the new elements,
	// if it doesnt, the slice is reallocated, copied, elements/slice added and capacity increased.
	// append() doesnt mutate the destination slice,
	// so append(slice, element) wont add to slice the element.
	s = append(s, "d")
	s = append(s, "e", "f")
	s = append(s, s...)
	fmt.Println("apd:", s)

	// as a special case, it is legal to append a string to a byte byte_slice, like this:
	var b1 = []byte{byte('h')}
	var byte_slice = append(b1, "world"...)

	// []byte("hello") converts "hello" into byte slice, its also called an anonymous slice, like []int{1,2,3}
	var byte_slice1 = append([]byte("hello"), "world"...)
	fmt.Printf("slice: %v\n", byte_slice)
	fmt.Printf("byte_slice1: %v\n", byte_slice1)

	c := make([]string, len(s))
	// you can copy elements from a slice into a slice, copy(to, from)
	copy(c, s)
	fmt.Println("cpy:", c)

	// copy also returns the number of elements copied.
	// copy doesnt reallocate, it rewrites the existing data with the data given, if the data length is smaller,
	// the rest elements will be zeroed of its type
	copy(c, s[len(s)-1:])
	fmt.Println("cpy:", c)

	s2 := "hello"
	b := make([]byte, len(s2))
	// as a special case, it also will copy bytes from a string to a slice of bytes.
	copy(b, s2)
	fmt.Printf("b: %v\n", b)

	// you can get a slice with : operator, [from(included), to(excluded)]
	// : operator also works on arrays
	l := s[2:5]
	fmt.Println("sl1:", l)

	// get a slice to(excluded), so s[0], s[1], s[2], s[3], s[4]
	l = s[:5]
	fmt.Println("sl2:", l)

	// get a slice from(included), so s[2], s[3], ... s[len(s)-1](last element)
	l = s[2:]
	fmt.Println("sl3:", l)

	// a copy of a slice, it still reffers to s, its not a copy
	l1 := s[:]
	fmt.Printf("l1: %v\n", l1)
	// a slice copy from an array
	var arr1 = [3]int{1, 2, 3}
	var slice1 = arr1[:]
	fmt.Printf("slice1: %v\n", slice1)

	// you can declare and initialize a slice also
	t := []string{"g", "h", "i"}
	fmt.Println("dcl:", t)

	// slices pkg contains a lot of utilities
	t2 := []string{"g", "h", "i"}
	if slices.Equal(t, t2) {
		fmt.Println("t == t2")
	}

	// creation of multi dimensional slices
	twoD := make([][]int, 3)
	for i := 0; i < 3; i++ {
		innerLen := i + 1
		twoD[i] = make([]int, innerLen)
		for j := 0; j < innerLen; j++ {
			twoD[i][j] = i + j
		}
	}
	fmt.Println("2d: ", twoD)

	d := []byte{'a', 'b', 'c', 'd'}
	// will not copy data from d slice, it will create a slice that points to d, so its efficient
	e := d[2:] // e == []byte{'c', 'd'}
	// becasue it points to the original slice, modification will occur in both d and e
	e[1] = 'a' // e == []byte{'c', 'a'} ,d == []byte{'a', 'b', 'c', 'a'}
	// but if you extend the created slice, and its capacity is surapassed,
	// it wont point anymore to the old slice
	e = append(e, 'e') // e == []byte{'c', 'a', 'e'}, d remains the same
	// now changing its elements wont reflect in the original slice,
	// because a new array was allocated and slice points to it
	e[0] = 'a' // e == []byte{'a', 'a', 'e'}, d == []byte{'a', 'b', 'c', 'a'} // 'c' remained the same

	// you can grow a slice with : operator until the capacity treshhold, going beyong will cause an error
	var a = make([]int, 3, 5) // a == [0,0,0]
	a = a[:cap(a)]            // a == [0,0,0,0,0]
	a = a[:cap(a)+1]          // error

	// you can use clear function for map/slice, here for slice, it means it will make all values within
	// the length of the slice to become its zeroed type, a is []int with 5 len, so [0,0,0,0,0].
	// you can also use ranges with [number:number].
	clear(a)

	// there is also a technique but dont use it because its kind of easy to screw
	origS := []int{0, 1, 2, 3, 4} // [0, 1, 2, 3, 4]
	// you kind of make the capacity smaller for a new slice but the referencing is still the same,
	// but as you see below, [1:3:3], the length is 3, capacity also 3, which is kind of ugly,
	// knowning the fact that the slice has only 2 elements instead of 3, becaus of [1:3].
	newS := origS[1:3:3]               // [1, 2], len: 3, cap: 3
	fmt.Println(&origS[1] == &newS[0]) // true

	moreTricksAboutSlicesHere := "https://go.dev/wiki/SliceTricks"
	fmt.Println(moreTricksAboutSlicesHere)

}

var digitRegexp = regexp.MustCompile("[0-9]+")

func FindDigits(filename string) []byte {
	b, _ := os.ReadFile(filename)
	return digitRegexp.Find(b) // its bad, it returns a slice that points to the underlying array b,
	//                                where b points to the underlying array
	//                                of os.ReadFile() which could be very big
	//                                and garbage collector wont free it because its pointed by our return
}

// fix this:
func CopyDigits(filename string) []byte {
	b, _ := os.ReadFile(filename)
	b = digitRegexp.Find(b)
	c := make([]byte, len(b))
	copy(c, b) // now you have a new slice which points to its array
	//                   rather than the original os.ReadFile() array which could be very big
	return c
}
