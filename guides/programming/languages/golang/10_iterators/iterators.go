package main

import (
	"fmt"
	"iter"
)

// iterators are a way to push/pull values out of a container of any user defined type

// func(yield func() bool)     // this is the first yield function variant
// func(yield func(V) bool)    // this is the second yield function variant
// func(yield func(K, V) bool) // this is the third yield function variant

// type Seq[V any] func(yield func(V) bool)        // newly added type
// type Seq2[K, V any] func(yield func(K, V) bool) // newly added type for map types

type Set[E comparable] struct {
	m map[E]struct{}
}

func New[E comparable]() *Set[E] {
	return &Set[E]{m: make(map[E]struct{})}
}

// All() method here returns an iterator, iter.Seq type
func (s *Set[E]) All() iter.Seq[E] {
	// 1. the yield function is used to test if it should keep giving the value or return
	// 2. return false/nothing - stops giving values
	// 3. return true - continues giving values
	return func(yield func(E) bool) {
		for key := range s.m {
			if !yield(key) {
				return
			}
		}
	}
}

func PrintAllElements[E comparable](s *Set[E]) {
	// 1. you notice we didnt give a function to .All() method since it returns a function
	//    which needs a function to be passed, this works because "range" from for loop
	//	  generates it for you.
	// 2. internally "range" looks at the right expression and if it
	//	  finds a function signature like "func(some_name func(place_holder)) bool" then it knows
	//	  to interpret it as iterator and even provide a function in case you didnt give one
	//	  as in this example you didnt
	for v := range s.All() {
		fmt.Println(v)
	}
	// 2. but you could pass it a function if you got some logic and dont want the implementation from .All():
	s.All()(func(v E) bool {
		fmt.Println(v)
		return true
	})
}

func main() {

	a := New[int]()
	
	a.m[0] = struct{}{}
	a.m[1] = struct{}{}
	a.m[2] = struct{}{}
	a.m[3] = struct{}{}
	// its not the usual construction, just for the sake of explanation.
	// a.All()( /* here would be the function that would have the logic which would return true/false */ )
	// PrintAllElements(a)

	// simple exmple of an iterator
	myIter := func(yield func(v int) bool) {
		for v := range 10 {
			if !yield(v) {
				return
			}
		}
	}
	myIter(
		func(v int) bool {
			if v%2 == 0 {
				fmt.Printf("v: %v\n", v)
			}
			return true
		},
	)

	// another way
	myIter(filterOdd)

}

func filterOdd(v int) bool {
	if v%2 == 0 {
		fmt.Printf("v: %v\n", v)
	}
	return true
}

// another type of iterator is pull iterator, where you pull the value.
//
// iter.Pull here returns 2 functions, next and stop (however you call them).
//
// first function is responsible for returning the value and a boolean meaning there are or are not any more values.
// second funciton is responsile for stopping the future pulling of values when you dont need them anymore.
func EqSeq[E comparable](s1, s2 iter.Seq[E]) bool {
	// next1 will return value/signal if there are valueus left
	// stop1 will cancel the future pulling of values even if there are values to retrieve
	next1, stop1 := iter.Pull(s1)
	defer stop1() // will explain the defer keyword later
	next2, stop2 := iter.Pull(s2)
	defer stop2()
	for {
		v1, ok1 := next1()
		v2, ok2 := next2()
		if !ok1 {
			return !ok2
		}
		if ok1 != ok2 || v1 != v2 {
			return false
		}
	}
}
