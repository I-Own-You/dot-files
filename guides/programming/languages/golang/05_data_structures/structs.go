package main

import "fmt"

// struct - typed collection fo fields, its useful for grouping data to form a record

type person struct {
	name string // field
	age  int    // field
}

// constructs a new person with name, age fields
// its also called *constructor function*, just a name which represents functions that create structs
func newPerson(name string) *person {

	p := person{name: name}
	p.age = 42
	return &p // its ok to return pointers to local variables in go because the garbage collector will track it,
	//           without deallocation the memmory until the data is no longer referenced
}

func StructDataStructure() {
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
	var _ *person = &s  // same as above but more explicit, and wihtout name so compiler wont give error
	fmt.Println(sp.age) // no need for (*sp).age, but you can use it if you want

	// structs are mutable when referenced by memory, the s also changes because the sp hold a pointer to s
	// if it would be sp := s, sp would hove a copy of struct s, so different memory would mean they cant,
	// change each other, but if struct has a pointer field, the pointer fields will have a pointer copy,
	// so you can mutate data among all structs that are related.
	sp.age = 51
	fmt.Println(sp.age)

	// if a struct type is only used for a single value, we don’t have to give it a name.
	// the value can have an anonymous struct type.
	dog := struct {
		name   string
		isGood bool
	}{
		"Rex",
		true,
	}
	fmt.Println(dog)
}
