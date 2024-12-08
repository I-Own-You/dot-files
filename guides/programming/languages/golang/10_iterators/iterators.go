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
	return func(yield func(E) bool) {
		for v := range s.m {
			// main point here is that yield function is called on every value we will operate so taht iter.Seq,
			// could decide to return or not. If if return false, the iterator stops, if it just returns, also stops,
			// if returns true -> iterator will keep returning values that it takes with yield(v).
			// the name could be anyting, not just yield.
			if !yield(v) {
				return
			}
		}
	}
}

func PrintAllElements[E comparable](s *Set[E]) {
	// you can use for range construction to iterate over iterators, but here s.All() is kind of cluncky because,
	// All() could be a iterator itself without returning one,
	// but if it would have parameters, or any cleanup function, then a method would be better.
	// if for any reason the range loop exits, like break or any other reason,
	// the yield will effectively return false, so it will make sure the iterator is stopped.
	for v := range s.All() {
		fmt.Println(v)
	}
}

func main() {

	a := New[int]()
	a.m[0] = struct{}{}
	a.m[1] = struct{}{}
	a.m[2] = struct{}{}
	a.m[3] = struct{}{}
	// its not the usual construction, its not at all, just for the sake of explanation.
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
			// true means the iterator will keep trying to return values.
			// false/return with no value would mean cancel the iteration,
			// but in this case you cant return nothing, so false.
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
	// true means the iterator will keep trying to return values.
	// (false/return with no value) would mean cancel the iteration,
	// but in this case you cant return nothing, so false.
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
	defer stop1()
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
