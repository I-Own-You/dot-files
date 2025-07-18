package main

import "fmt"

// a generic type
// also, when you use it, you must instantiate it, you cant infer like in a function
type myGenericType[K comparable, V any] map[K]V

// error, type paramteres cant be used as types for a type itself
// type genericType[A any] A

// type aliases provide a easy way to define same types from different packages, as an example.
type TFromDiffPkg = somePkg.TypeName
type MapFromDiffPkg1[K comparable, V any] = someOtherPkg.MapType
type MapFromDiffPkg2[K comparable, V any] = someOtherPkg.MapType[K, V]

// generic type aliasess
type aliasMyGenericType[K comparable, V any] = myGenericType[K, V]

// a function with generic type
func GenericMin[T int | float32 | float64](x, y T) T {
	if x < y {
		return x
	}
	return y
}

func main() {

	// here, GenericMin[int], is called instantiation, the compiler substitute the functioins type with int,
	// and then it checks if values received are compatible with it, if not -> error.
	x := GenericMin[int](2, 5)
	fmt.Printf("x: %v\n", x)

	// you can also drop the type here, in most cases the compiler will infer the type from type parameter of the,
	// function, but it only works if you do have type paramteres, if you rely only on return type and dont have,
	// type paramteres, it wont work.
	y := GenericMin(2, 5)
	fmt.Printf("y: %v\n", y)

	// same process as above, and stores the function in fmin, you cant have only GeneriMin wihtout type thought,
	// because you return the function, it must know ahead of time which type it will be, it wont work by calling,
	// the function later with some types.
	fmin := GenericMin[float64]
	m := fmin(2.71, 3.14)
	fmt.Printf("m: %v\n", m)
}

// generic types can alos be used on types
type Tree[T interface{}] struct {
	left, right *Tree[T]
	value       T
}

// here is the usage of generic struct type variable of t *Tree[T] and return type *Tree[T]
func (t *Tree[T]) Lookup(x T) *Tree[T] {
	return nil // lacks implementation, for purpose of docs
}

// here is a variable of generic struct type
var stringTree Tree[string]

// here is a union of types constructed with interface
// also called: type constraint
type Number interface {
	int8 | int32 | ~string
	// ~string means that any type which underlying type is string,
	// so any custom types, like type myString string will also pass.
	// but ~ can be used only in type sets,
	// so only in interfaces composing a type constraint.
}

// you can also inline interface types constraint
func myFunc[S interface{ ~[]E }, E interface{}](s S, nr E) {}

// you can alos shorten the syntax S ~[]E
func myFuncShorter[S ~[]E, E interface{}](s S, nr E) {}

// you can also shorten more, to the final idiomatic form, any is an alias for interface{}
func myFuncShorterMore[S ~[]E, E any](s S, nr E) {}

// here we have an example which will show why sometimes its good to have a compiler constraint on types
func Scale[E int8 | int32](s []E, c E) []E {
	r := make([]E, len(s))
	for i, v := range s {
		r[i] = v * c
	}
	return r
}

type Point []int32

func (p Point) String() string { return "" }

func ScaleAndPrint(p Point) {
	r := Scale(p, 2)
	// here, the r returned from Scale is of type []int32, just a slice, a slice doesnt have any methods, error
	fmt.Println(r.String())

	newR := newScale(p, 2)
	fmt.Println(newR.String())
}

func newScale[S ~[]E, E int8 | int32](s S, c E) S {
	// now, it will work, because the compiler infers the type of all E underlying types, so Point type will be,
	// assumed as S, which underlying type is []int32, and it works.
	r := make(S, len(s))
	for i, v := range s {
		r[i] = v * c
	}
	return r
}

// here is a combination of a type and a method in a interface, it means it must be that type and also implement,
// all its methods to be of this interfacee type.
type myInterface interface {
	myStruct
	A()
}

// only myStruct implement myInterface because it has A() and most imporatnt it satisfies the type myStruct,
// where myStruct2 is distinct type, so doesnt satisfy.
type myStruct struct{}
type myStruct2 struct{}

func (ms myStruct) A()  {} // implements myInterface
func (ms myStruct2) A() {} // doesnt implement myInterface

// also an example with primitive type in interface
type myInterface2 interface {
	~int32 // if you here would omit the ~, it meant the interface would be implemented only by a int32 with
	B()    // method B(), but int32 is a primitive so it wont be implemented by anything, which leads to
	//        impossible interface
}

type myStruct3 int32

func (ms myStruct3) B() {}

// generic interface
type Adder[T any] interface {
	Add(T) T
}

func Sum[T Adder[T]](a, b T) T {
	return a.Add(b)
}

type AA int

func (a AA) Add(b AA) AA {
	return a + b
}
