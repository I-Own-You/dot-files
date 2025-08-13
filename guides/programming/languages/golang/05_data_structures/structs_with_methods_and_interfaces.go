package main

import (
	"fmt"
	"math"
)

// interfaces are named collections for method signatures and (type generics (since 1.20, another topic later))

// here is how you can define a basic interface of geomtry shape, interface define a shape of a method
type Geometry interface {
	area() float64
	perim() float64
}

type rect struct {
	width, height float64
}
type circle struct {
	radius float64
}

// implementing an interface means implementing all its methods
func (r rect) area() float64 {
	return r.width * r.height
}
func (r rect) perim() float64 {
	return 2*r.width + 2*r.height
}

// implementing an interface means implementing all its methods, name must be the same
func (c circle) area() float64 {
	return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
	return 2 * math.Pi * c.radius
}

// here, its a general interface that can call any method from any struct that implements it
func measure(g Geometry) {
	fmt.Println(g)
	fmt.Println(g.area())
	fmt.Println(g.perim())
}

func StructureWithMethodsAndInterfaces() {
	r := rect{width: 3, height: 4}
	c := circle{radius: 5}

	// you can call the measure() function with different structs, the main poin to be considered is that,
	// each struct must define all interface methods.
	measure(r)
	measure(c)

	// you can also have anonymous interfaces as parameters, return values, assigned to variables.
	//
	// if a method implements with a reciever pointer and it is guarded by an anonymous interface,
	// you must return the memmory address instead, not the struct, it wont handle for you as before,
	// becasue of the interface.
	//
	// interface as return types:
	//
	// type example struct{}
	// func (r *example) age() int { // pointer reciever
	// 	return 2
	// }
	// func alo() interface {
	// 	age() int
	// } {
	// 	var a = example{}
	// 	return &a // wont handle for you the dereferencing, must return the memmory
	// }
	// 	var b = alo()
	// 	fmt.Printf("b.age(): %v\n", b.age())
	//
	// interface as parameter type:
	//
	// type myStruct struct{}
	// func (r myStruct) age() {}
	// func myFunc(interface {
	//		age() int
	// }) { }
	//
	// interface as anonymous type:
	//
	// type display struct{}
	// func (d *display) Display() string {
	// 	return "Displaying"
	// }
	// var i interface {
	// 	Display() string
	// }
	// i = &display{}
	// if d, ok := i.(interface {
	// 	Display() string
	// }); ok {
	// 	fmt.Println(d.Display())
	// }

	// you can also have a slice of type interface with structs in it
	// Geometry(rect{5,10}) is done automatically, when placing values of Geomtry type interface,
	// but its working only because the values in []Geomtry interface slice do implement this interface,
	// if you remove the methods from eiter rect or circle, it will throw an error.
	var figures = []Geometry{rect{5, 10}, circle{3}, rect{}, circle{}}
	for _, figure := range figures {
		someValue := figure.area() + figure.perim()
		fmt.Printf("someValue: %v\n", someValue)
	}

	// an empty interface is implemented by all types
	// the actual value is converted for us by go to become an interface.
	// the interface points to 2 things:
	// 1. the type: a table of methods for the underlying values type (the methods table is cached)
	// 2. the actual data held by that value
	// example:
	// (a struct methods) and (the struct itself)
	// (other types methods, if any) and (the value itself of other types) like builtin types or custom
	//
	// func DoSomething(v interface{}) {
	// 	fmt.Printf("v: %v\n", v) // 2
	// }
	// DoSomething(2)

	// in case with []interface{} there is less flexibility
	//
	// this would not work because the type []interface{} wont convert it for you
	//
	// func PrintAll(vals []interface{}) {
	// 	for _, val := range vals {
	// 		fmt.Println(val)
	// 	}
	// }
	// names := []string{"stanley", "david", "oscar"}
	// PrintAll(names) // error
	//
	// so you would need to convert it specifically
	//
	// vals := make([]interface{}, len(names))
	// for i, v := range names {
	// 	vals[i] = v
	// }
	// PrintAll(vals)
}

type A interface {
	alo()
}

// this way you also can embed interfaces,
// here B interface consists of kek() and also alo() because of A interface.
// any function that will require parameter of type B will need to implement,
// both B and A, alo() + kek()
type B interface {
	kek()
	A
}
