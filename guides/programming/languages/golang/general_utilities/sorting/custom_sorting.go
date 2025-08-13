package main

import (
	"cmp"
	"fmt"
	"slices"
	"sort"
)

// custom sorting makes us able to sort in different way than the default way

func CustomSorting() {
	fruits := []string{"peach", "banana", "kiwi"}

	// implement a comparing function
	lenCmp := func(a, b string) int {
		return cmp.Compare(len(a), len(b))
	}

	// call the sort.SortFunc() with our custom function to sort in place
	slices.SortFunc(fruits, lenCmp)
	fmt.Println(fruits)

	type Person struct {
		name string
		age  int
	}

	people := []Person{
		{name: "Jax", age: 37},
		{name: "TJ", age: 25},
		{name: "Alex", age: 72},
	}

	// we can also sort other types like a slice of Person
	slices.SortFunc(people,
		func(a, b Person) int {
			return cmp.Compare(a.age, b.age)
		})
	fmt.Println(people)

	// convert array into slice to use sort.Slice()
	// this type of sorting are easy for simple sorting
	arr := [5]int{4, 2, 3, 1, 5}
	sort.Slice(arr[:], func(i, j int) bool { // arr[:] converts
		return arr[i] < arr[j]
	})

	// you can have more complex sorting that can be built only on custom types, but they are more powerful
	animals := []Animal{
		{Name: "afsd", Age: 2},
		{Name: "dffd", Age: 3},
		{Name: "ldsf", Age: 4},
		{Name: "iosd", Age: 5},
	}
	// but note, the Sort() is not guaranteed to be stable and in many situations sort.SortFunc() is faster
	sort.Sort(ByAge(animals))
}

type Animal struct {
	Name string
	Age  int
}

type ByAge []Animal

func (a ByAge) Len() int           { return len(a) }
func (a ByAge) Less(i, j int) bool { return a[i].Age < a[j].Age }
func (a ByAge) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
