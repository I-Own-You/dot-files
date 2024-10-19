package main

import "fmt"

func IfElseCondition() {
	// basic if
	if 7%2 == 0 {
		fmt.Println("7 is even")
	} else {
		fmt.Println("7 is odd")
	}

	// if without else
	if 8%4 == 0 {
		fmt.Println("8 is divisible by 4")
	}

	// logical ||, && can be used in conditions
	if 8%2 == 0 || 7%2 == 0 {
		fmt.Println("either 8 or 7 are even")
	}

	// you can precede conditoin with a statement, the result of a statement will be available,
	// in if and all its branches.
	if num := 9; num < 0 {
		fmt.Println(num, "is negative")
	} else if num < 10 {
		fmt.Println(num, "has 1 digit")
	} else {
		fmt.Println(num, "has multiple digits")
	}

	// you can have more than one variables defined
	if i, j := true, false; i && j {
		fmt.Println("hi")
	}

	// go doesnt have ternary operator, if/switch is the only option
}
