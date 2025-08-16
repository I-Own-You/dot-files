package main

import (
	"fmt"
	"maps"
)

func MapsDataStructure() {
	// you can use make to create a map, map([key-type]value-type)
	// keys of maps can be only of comparable type
	m := make(map[string]int)

	// you can also have a declaration only, its nil by default (the zeroed value of map is nil),
	// it means you cant work with it untill intialized either with map literal or make.
	var nilMap map[int]int
	fmt.Println("nil_map", nilMap, "nil?:", nilMap == nil)

	// set, get values
	m["k1"] = 7
	m["k2"] = 13

	// you can print a map like this
	fmt.Println("map:", m)

	// retrieve a value from a map
	v1 := m["k1"]
	fmt.Println("v1:", v1)

	// if the key doesnt exist, a zero value for the value-type is returned, our map is int so v3 = 0
	v3 := m["k3"]
	fmt.Println("v3:", v3)

	// you can check if a key was present when retrieved a value by adding a second argument of type bool.
	// the _ identifier will contain the value which we skip here and the isKeyPresent will be a boolean which will hold,
	// the presence of a key in the map, its useful to distinguish between a presence and zeroed value of a type,
	// when you retrieve by a key.
	_, isKeyPresent := m["k2"]
	fmt.Println("prs:", isKeyPresent)

	// len(map) returns the key/value pairs
	fmt.Println("len:", len(m))

	// delete removes a key/value pair
	delete(m, "k2")
	fmt.Println("map:", m)

	// clear removes all key/value pairs from a map you
	clear(m)
	fmt.Println("map:", m)

	// you can declare and initialize on the same line also
	n := map[string]int{"foo": 1, "bar": 2}
	fmt.Println("map:", n)

	// maps pkg has some useful methods
	n2 := map[string]int{"foo": 1, "bar": 2}
	if maps.Equal(n, n2) {
		fmt.Println("n == n2")
	}

	// you can implement a set by making keys as values and values as bools
	attended := map[string]bool{
		"Ann": true,
		"Joe": true,
	}

	if attended["Ann"] {
		fmt.Println("nice")
	}
}

// map doesnt guarantee the order of keys, so printing key/value pairs wont be ordered,
// you need separate data struture in order to achieve this, like a slice with ordered keys.
