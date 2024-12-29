package main

import "fmt"

// enum is a type with fixed number of possible values,
// go itself doesnt have the *enum*, but you can implement it.

type ServerState int // this is our enum *abstract*

const (
	StateIdle      = iota // enums field *abstract*, iota is a special keyword of type untyped int(constant), 0
	StateConnected        // enums field with value 1
	StateError            // enums field with value 2
	StateRetrying         // enums field with value 3
)

// here we assign the consts to a map of ServerState key, string value
var stateName = map[ServerState]string{
	StateIdle:      "idle",
	StateConnected: "connected",
	StateError:     "error",
	StateRetrying:  "retrying",
}

// its often called a method that implments the Stringer interface.
// Stringer interface is defined by implementing the String() method
// which basically gives you a possibility to, print the values in a certain way,
// like default printable value for println, printf, .etc
func (ss ServerState) String() string {
	return stateName[ss]
}

func EnumsDataStructure() {
	ns := transition(StateIdle)
	fmt.Println(ns)

	ns2 := transition(ns)
	fmt.Println(ns2)

	fmt.Printf("stateName: %v\n", stateName)
}

func transition(s ServerState) ServerState {
	switch s {
	case StateIdle:
		return StateConnected
	case StateConnected, StateRetrying:
		return StateIdle
	case StateError:
		return StateError
	default:
		panic(fmt.Errorf("unknown state: %s", s))
	}
}
