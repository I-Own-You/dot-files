package main

import "fmt"

type base struct {
	num int
}

// this is a struct method
func (b base) describe() string {
	return fmt.Sprintf("base with num=%v", b.num)
}

// container embeds the base struct
type container struct {
	base
	str string
}

func EmbeddedStructure() {

	// here is the initialization process
	co := container{
		base: base{
			num: 1,
		},
		str: "some name",
	}

	// you can access the embedded struct fields with the variable that holds the parent struct
	fmt.Printf("co={num: %v, str: %v}\n", co.num, co.str)

	// you can also use the full access method through the embedded struct
	fmt.Println("also num:", co.base.num)

	// since container embeds base, methods of base become methods of container as well, so we can access them
	fmt.Println("describe:", co.describe())

	type describer interface {
		describe() string
	}

	// even co doesnt implement describe() method from describer interface,
	// it works becase container interface, embeds base struct, so base methods become container methods.
	// base struct implements describer interface, so container struct implements the describer interface also.
	var d describer = co
	fmt.Println("describer:", d.describe())
}
