package main

import "fmt"

// enum is a type with fixed number of possible values,
// go itself doesnt have the *enum*, but you can implement it.

type ServerState int // this is our enum *abstract*

//  1. iota is a special keyword used only inside const blocks and always starts from 0,
//     but only if its put at the first const member, on other const members it will be:
//     0 + const member placement, so you cannot use it to reset values, for that you need
//  2. to reset or assign a value to a member you need "member = value", all members below
//     it which didnt do "= value" will have that previous defined value
//  3. you can define a type on a member and all members below it without a type defined will also,
//     have it, by default the type of const members is "untyped int"
//  4. if you dont have iota, you need to pass a value to the first member of enum and all
//     the below members will have that value as well, the above ones without the value will
//     be of untyped type which results in an error, only iota autoincrements next members
const (
	StateIdle      ServerState = iota // iota is a special keyword of type untyped int(constant), 0
	StateConnected                    // enums field with value 1
	StateError                        // enums field with value 2
	StateRetrying                     // enums field with value 3
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
