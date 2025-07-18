package main

import (
	"fmt"
	"os"
)

type point struct {
	x, y int
}

func StringFormatting() {
	p := point{1, 2}
	// %v will print struct values {1 2}
	fmt.Printf("struct1: %v\n", p)

	// if it is a struct, you can use %+v to print also fields: {x:1 y:2}
	fmt.Printf("struct2: %+v\n", p)

	// if you use %#v, go will print a go syntax representation of the value,
	// the source code snippet that will produce the value.
	fmt.Printf("struct3: %#v\n", p)

	// %T will show the type of a value
	fmt.Printf("type: %T\n", p)

	// %t will format booleans , v would also work
	fmt.Printf("bool: %t\n", true)

	// formatting integers have many ways, %d is for 10-base representation
	fmt.Printf("int: %d\n", 123)

	// %b, binary representation
	fmt.Printf("bin: %b\n", 14)

	// %c, prints the character coresponding to the 33 integer number
	fmt.Printf("char: %c\n", 33)

	// x, will encode the number into hexa decimal representation
	fmt.Printf("hex: %x\n", 456)

	// floating numbers also have way, for basic float number use %f
	fmt.Printf("float1: %f\n", 78.9)

	// %e or %E, is for scientific version of a number like 1.234000e+08
	fmt.Printf("float2: %e\n", 123400000.0)
	fmt.Printf("float3: %E\n", 123400000.0)

	// basic string printing, %s
	fmt.Printf("str1: %s\n", "\"string\"")

	// double quote strings as in GO source, %q
	// it puts quotes around the whole string and escape special characters like newline, tabs, quotes, .etc
	fmt.Printf("str2: %q\n", "\"string\"")

	// %x renders a string in base16, it basically concatenates the decimal representation of each byte symbol
	fmt.Printf("str3: %x\n", "hex this")

	// %p you can see the representation of a pointer, nil or  memmoery address
	// if you would omit the & in p, it would print the source code snippet of GO for struct
	fmt.Printf("pointer: %p\n", &p)

	// you can specify width of representation by adding a number between % and format verb
	// the value will be aligned to right and the left if remains will be padded with spaces
	fmt.Printf("width1: |%6d|%6d|\n", 12, 345)

	// also you could specify the decimal representation in combination with width syntax, %{n}.{n}verb
	fmt.Printf("width2: |%6.2f|%6.2f|\n", 1.2, 3.45)
	// you can also have only the decimal representation only, %.{n}verb
	fmt.Printf("width2.1: |%.2f|%.2f|\n", 1.2, 3.45)

	// you can justify the width into left side and padd spaces from right with %- instead of %
	fmt.Printf("width3: |%-6.2f|%-6.2f|\n", 1.2, 3.45)

	// you can justify width of anything that can be justified with %{n}verb
	fmt.Printf("width4: |%6s|%6s|\n", "foo", "b")
	// left justify
	fmt.Printf("width5: |%-6s|%-6s|\n", "foo", "b")

	// fmt.Sprintf() formats and returns the formatted string instead of printing to stdout,
	// so we can use it later as a variable to print or whatever
	s := fmt.Sprintf("sprintf: a %s", "string")
	fmt.Println(s)

	// fmt.Fprintf() also formats but writes to the output we specify,
	// here we specify the error stderr, there are others like stdout, .etc
	fmt.Fprintf(os.Stderr, "io: an %s\n", "error")
}
