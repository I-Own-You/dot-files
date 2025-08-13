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
	case 1:
		fmt.Println("one")
		// fallthrough // this is a special keyword that lets you fallthrough to the next case
		//                because in go, switch exits after first returned value / last executed statement
	case 2:
		fmt.Println("two")
	case 3:
		fmt.Println("three")
	}

	switch time.Now().Weekday() {
	// you can separate by comma multiple expressions in a case statement
	// you can also have more than 1 value to group possible variants, in this case it will check against both values
	case time.Saturday, time.Sunday, 2:
		fmt.Println("It's the weekend")
		// fallthrough // this would fall into next case, which is the default one
	default:
		fmt.Println("It's a weekday")
	}

	t := time.Now()
	// switch without initial value, acts like a if/else
	// it defaults to switch true
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
			//                            if formatted as %T, but put t*2, t*2 is dropped, becasue type is not a value
		default:
			fmt.Printf("Don't know type %T\n", t)
		}
	}
	whatAmI(true)
	whatAmI(1)
	whatAmI("hey")
}
