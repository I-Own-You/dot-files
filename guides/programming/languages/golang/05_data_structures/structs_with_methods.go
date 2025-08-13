package main

import "fmt"

type rectt struct {
	width, height int
}

// this will automatically assign methods for rectt struct, because this function has:
// 1. no traditional name: func (r rect)
// 2. has a reciever (r rect) or (r *rect) // this is the main point, it must have a reciever to become a mehtod
// 3. name after the enclosed reciever area()
func (r *rectt) area() int {
	return r.width * r.height
}

func (r rectt) perim() int {
	return 2*r.width + 2*r.height
}

func StructsWithMethods() {
	// assigning a sruct to another variable wihtout & will make a shallow copy,
	// so modifying one wont modify another.
	// but if struct has a pointer field, the pointer fields will have a pointer copy,
	// so you can mutate data among all structs that are related.
	var person1 = person{name: "Ala", age: 15}
	var person2 = person1                // shallow copy
	person2.age = 20                     // person1 wont be modified, person2 will be
	fmt.Printf("person1: %v\n", person1) // {name: "Ala", age: 15}
	fmt.Printf("person2: %v\n", person2) // {name: "Ala", age: 20}

	r := rectt{width: 10, height: 5}
	// since method needs pointer receiver you could also do (&r).area() but go did this automatically
	fmt.Println("area: ", r.area()) // (&r).area() would be the same
	fmt.Println("perim:", r.perim())

	// remember go automatically dereferences the pointer, no need to use *rp,
	rp := &r
	fmt.Println("area: ", rp.area())
	fmt.Println("perim:", rp.perim()) // (*rp).perim() would be the same

	// important!
	// methods cant be defined for types that comes from external packages, they must be local to type definition
}
