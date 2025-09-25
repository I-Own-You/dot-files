package main

import "fmt"

// struct - typed collection fo fields, its useful for grouping data to form a record

type person struct {
	// in memory, the struct is just a contiguous block of memory which has its length for every filed like:
	// name will take 8 bytes (since my pc is 64 bit)
	// age will take 8 bytes (since my pc is 64 bit)
	// overall size of struct is 16 bytes, but because of alignment of memory it could take more.
	name string // field
	age  int    // field
	//
	// alignment - basically means filling the memory in blocks, for example you have
	//
	// doesItPass bool
	// truckRoad int32
	// overallRoad float64
	//
	// here, doesItPass needs 1 byte, but truckRoad needs 4 bytes, but overallRoad even 8 bytes,
	// it means, doesItPass will span over 8 bytes where 1 byte is his and the rest 7 is just filled, so that,
	// overallRoad could fit within this contiguous memory, and now the struct looks like this:
	//
	// doesItPass bool [1 byte]
	// [7 bytes padded]
	// truckRoad int32
	// [4 bytes padded]
	// overallRoad float64 [8 byte]
	// now, our struct has 32 bytes, it only matters when performance is really hurt, otherwise not.
	//
	// to fix this, you need to specify the fields from largest to smalles, like this:
	// overallRoad float64 [8 byte]
	// truckRoad int32 [4 bytes]
	// doesItPass bool [1 byte]
	// [3 bytes padded] // still needed becaus doesItPass has 1 byte, but it needs to align to truckRoad
	// but compiler can also do something else and need more or less so its kind of a hard topic.
}

// constructs a new person with name, age fields
// its also called *constructor function*
func newPerson(name string) *person {

	p := person{name: name}
	p.age = 42
	return &p // its ok to return pointers to local variables in go because the garbage collector will track it,
	//           without deallocation the memmory until the data is no longer referenced
}

func StructDataStructure() {
	// empty struct
	// myV variable points to the empty struct{}, a global golang variable, but its pointer is nil(no allocation)
	var myV person
	fmt.Printf("myVVV: %v\n", myV)

	// myVV now has a pointer(its allocated) but also points to struct{}, the value is empty struct{}
	var myVV = person{}
	fmt.Printf("myVVV: %v\n", myVV)

	// allocated, points to struct{}
	myVVV := person{}
	fmt.Printf("myVVV: %v\n", myVVV)

	// still 0, but addresses must be different since its an array, its a special case handled by compiler
	// any other use, like value of key in map, chanel value, .etc will be 0 consumed memory, so, not allocated
	myVVVV := [5]struct{}{}
	fmt.Printf("myVVVV: %v\n", myVVVV)

	// creation of a struct, its an anonymous struct, becasue its not assigned to a variable
	fmt.Println(person{"Bob", 20})
	// this would be invalid, you must define from original struct sequence order
	// fmt.Println(person{20, "Bob"})

	// you can also explicitly name the fields in any order, so not following the original struct sequence order
	fmt.Println(person{age: 30, name: "Alice"}) // the printing of a structs also follows struct sequence order

	// omitted fields will be zeroed within its type, age is int, so age = 0
	fmt.Println(person{name: "Fred"})

	// this way you can yield a pointer(address memmory) to the struct
	fmt.Println(&person{name: "Ann", age: 40})

	// creation of a person through a constructor function which takes a name argument
	fmt.Println(newPerson("Jon"))

	// this way you can assign a person struct to a variable
	s := person{name: "Sean", age: 50}
	// this way you access its fields
	fmt.Println(s.name)

	// you can also assign a struct pointer to a variable and use it, the pointer is dereferenced automatically,
	// meaing you can access the struct fields without using the (*s).fieldName syntax
	sp := &s
	var _ *person = &s  // same as above but more explicit
	fmt.Println(sp.age) // no need for (*sp).age, but you can use it if you want

	// structs are mutable when referenced by memory, the s also changes because the sp hold a pointer to s
	// if it would be sp := s, sp would hove a copy of struct s, so different memory would mean they cant,
	// change each other, but if struct has a pointer field, the pointer fields will have a pointer copy,
	// so you can mutate data among all structs that are related.
	sp.age = 51
	fmt.Println(sp.age)

	// if a struct type is only used for a single value, we don’t have to give it a name.
	// the value can have an anonymous struct type.
	//
	// also, you cant assign a struct to another struct even if they both are identical, but,
	// 1. you can if you convert them like struct1(struct2)
	// 2. assign an anonymous struct to it with identical structure (but better dont do this)
	dog := struct {
		name   string
		isGood bool
	}{
		"Rex",
		true,
	}
	fmt.Println(dog)
}
