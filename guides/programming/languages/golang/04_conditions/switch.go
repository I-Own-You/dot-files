package main

import (
	"fmt"
	"time"
)

func SwitchCondition() {
	// case values can be any value, constants are not mandatory

	i := 2
	fmt.Print("Write ", i, " as ")
	switch i {
	// the type of case expressions must be the same type as the value type passed to switch
	case 1:
		fmt.Println("one")
		// fallthrough // this is a special keyword that lets you fallthrough to the next case
		//                because in go, switch exits after first returned value / last executed statement
		//				  inside a case.
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}

	switch time.Now().Weekday() {
	// 1. you can have multiple case expressions which it will choose from
	case time.Saturday, time.Sunday, 2:
		fmt.Println("It's the weekend")
	default:
		fmt.Println("It's a weekday")
	}

	t := time.Now()
	// 1. switch without a value defaults to switch true {...}
	switch {
	case t.Hour() < 12:
		fmt.Println("It's before noon")
	default:
		fmt.Println("It's after noon")
	}

	// a type switch, it compares the type instead of the value
	whatAmI := func(i interface{}) {
		// actually t will hold both type and value
		switch t := i.(type) {
		case bool:
			fmt.Println("I'm a bool", t) // bool
			fmt.Printf("t: %T\n", t)     // bool
			fmt.Printf("t: %v\n", t)     // true
		case int:
			fmt.Println("I'm an int")
			fmt.Printf("t: %T\n", t)   // will print the type, int
			fmt.Printf("t: %v\n", t*2) // so here will be the value, not the type
			//                            if formatted as %T, but put t*2, t*2 is dropped,
			//							  becasue type is not a value and int is printed
			fmt.Println(t) // will print the value of t, not the type
		default:
			fmt.Printf("Don't know type %T\n", t)
		}
	}
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}
