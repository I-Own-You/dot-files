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

func (r rectt) change() int {
	r.width = 20
	return r.width + r.height
}

func StructsWithMethods() {

	r := rectt{width: 10, height: 5}
	// since method needs pointer receiver you could also do (&r).area() but go did this automatically
	fmt.Println("area: ", r.area()) // (&r).area() would be the same
	fmt.Println("perim:", r.perim())

	// remember go automatically dereferences the pointer, no need to use *rp,
	rp := &r
	fmt.Println("area: ", rp.area())
	fmt.Println("perim:", rp.perim()) // (*rp).perim() would be the same

	// myFunc points to 2 things:
	// 1. a copy of .change() method
	// 2. a copy of r object data (heigh, weight)
	// why its important ?
	// 1. because now those 2 copies of method/data goes into the heap and not the stack,
	//    because it needs to be held by garbage collector and follow + free memory at some point
	// 2. if you would have a parameter in a receiver and changed there a property, then it would not work,
	//    on a copy of that data, but on the original object would, but it could still allocate memory because of how
	//    golang garbage collector escape analysis works, so decoupling should be avoid unless needed
	myFunc := r.change
	myFunc()
	fmt.Printf("r.width: %v\n", r.width) // not 20, still 10
	// if receiver method would be a pointer, then it would operate on the original pointer which output 20

}

// important!
// methods cant be defined for types that comes from external packages, they must be local to type definition

// never mix value and pointer receivers
// you can go as exception from value to pointer, but you cannot go from pointer to value, as a rule (respect it)

// in go, you should never write get/set methods(receivers), because API should provide something, and get/set doesnt.
