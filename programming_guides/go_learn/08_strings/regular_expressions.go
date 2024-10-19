package main

import (
	"bytes"
	"fmt"
	"regexp"
)

// go has builtin package for regular expressions.
// here will be some examples

func RegularExpressions() {

	// test if a match is found
	match, _ := regexp.MatchString("p()ch", "peach")
	fmt.Println(match)

	// above we had used a string pattern directly to achieve some regexp simple task,
	// for more complex regexp you will need to compile an optimized regexp struct
	r, _ := regexp.Compile("p([a-z]+)ch")

	// the same as above but with a struct instance created above, faster and optimized
	fmt.Println(r.MatchString("peach"))

	fmt.Println(r.FindString("peach punch"))

	fmt.Println("idx:", r.FindStringIndex("peach punch"))

	fmt.Println(r.FindStringSubmatch("peach punch"))

	fmt.Println(r.FindStringSubmatchIndex("peach punch"))

	fmt.Println(r.FindAllString("peach punch pinch", -1))

	fmt.Println("all:", r.FindAllStringSubmatchIndex(
		"peach punch pinch", -1))

	fmt.Println(r.FindAllString("peach punch pinch", 2))

	// you can also use function from regexp that do not require strings,
	// still strings are bytes under the hood
	fmt.Println(r.Match([]byte("peach")))

	// must will panic if a compiled regexp has errors
	r = regexp.MustCompile("p([a-z]+)ch")
	fmt.Println("regexp:", r)

	fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))

	in := []byte("a peach")
	// once again you can use functions that do not rquire strings and for example use byte,
	// and use bytes package to do something with them
	out := r.ReplaceAllFunc(in, bytes.ToUpper)
	fmt.Println(string(out))
}
