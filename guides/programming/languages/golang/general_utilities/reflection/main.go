package main

import (
	"fmt"
	"reflect"
)

// reflection(in computing): ability of a program to examine its own structure, particularly through types,
// kind of metaprogramming
//
// reflection and interfaces are closely related.

// reflection goes from interface value to reflection object:
// a mechanism to examine the type and value pair stored inside an interface variable.

func main() {
	var xVal float64 = 3.4
	fmt.Println("type:", reflect.TypeOf(xVal)) // type: flaot64
	// float64 is stored inside interface{} and then reflec.Typeof(x) unpacks x and recover type

	var xType float64 = 3.4
	fmt.Println("value:", reflect.ValueOf(xType).String()) // value: <float64 Value>
	// .String() was called because the fmt.Println() would shows the concrete value(3.4), because
	//  fmt always gets the unerllying value

	var xKind float64 = 3.4
	vKind := reflect.ValueOf(xKind)
	fmt.Println("type:", vKind.Type())                               // type: float64
	fmt.Println("kind is float64:", vKind.Kind() == reflect.Float64) // kind is float64: true
	//                                                 .Kind() always return the original type(dropping static one)
	//                                                 static one is any custom, like type MyType int, MyType is cutsom
	fmt.Println("value:", vKind.Float()) // value: 3.4

	// reflection goes from interface values to reflection objects and back again
	// .Interface() is a way to go back from reflect.Value to value
	yTh := vKind.Interface().(float64) // y will have type float64.
	fmt.Println(yTh)                   // 3.4

	// you can change reflect values, but they must be settable
	// settability: is determined by whether the reflection object holds the original item.
	var xSet float64 = 3.4
	vSet := reflect.ValueOf(xSet)                   // we pass a copy of xSet to reflect.ValueOf, not the original item
	fmt.Println("settability of v:", vSet.CanSet()) // settability of v: false
	// vSet.SetFloat(7.1) // panic
	pSet := reflect.ValueOf(&xSet)                  // &x, not x
	fmt.Println("type of p:", pSet.Type())          // type of p: *float64
	fmt.Println("settability of p:", pSet.CanSet()) // settability of p: false, but why ? because we need *p, not p
	vSet = pSet.Elem()                              // Elem() helps us with indirecting *p
	fmt.Println("settability of v:", vSet.CanSet()) // settability of v: true
	vSet.SetFloat(7.1)                              // wont panic
	fmt.Println(vSet.Interface())                   // 7.1
	fmt.Println(xSet)                               // 7.1

	// Struct example with reflect
	type T struct {
		A int // they are exported because only exported fields of a structure is settable
		B string
	}
	t := T{23, "skidoo"}
	s := reflect.ValueOf(&t).Elem()
	typeOfT := s.Type()
	for i := 0; i < s.NumField(); i++ {
		f := s.Field(i)
		fmt.Printf("%d: %s %s = %v\n", i, typeOfT.Field(i).Name, f.Type(), f.Interface())
		// 0: A int = 23
		// 1: B string = skidoo
	}
	// s contains a settable reflection object, so we can modify the fields of the structure.
	s.Field(0).SetInt(77)
	s.Field(1).SetString("Sunset Strip")
	fmt.Println("t is now", t) // t is now {77 Sunset Strip}

}

// reflection goes from interface values to reflection objects and back again,
// this is the most important thing to understand,
// you can go back and forth, this is why you can get value/type, in any situatin
