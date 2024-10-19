package main

import (
	"os"
	"text/template"
)

// you can create (dynamic content / customized output) with the text/template package.
// there is also html/template for html purposes with better security

func TextTemplates() {

	// here you create a template
	t1 := template.New("t1")
	// here you define how template will look and also where the value will be placed: {{.}}
	t1, err := t1.Parse("Value is {{.}}\n")
	// panic if some errors occured
	if err != nil {
		panic(err)
	}

	// you can alternatively use template.Must(), it will panic in case of an error
	t1 = template.Must(t1.Parse("Value: {{.}}\n"))

	// this is how you execute your templates to write the output you choose
	t1.Execute(os.Stdout, "some text") // Value is some text
	t1.Execute(os.Stdout, 5)           // Value is 5
	t1.Execute(os.Stdout, []string{    // Value is [Go, Rust, C++, C#]
		"Go",
		"Rust",
		"C++",
		"C#",
	})

	// you can create a helper to create and parse a template in 1 step
	Create := func(name, t string) *template.Template {
		return template.Must(template.New(name).Parse(t))
	}

	// here, {{.Name}} means you can access a field of a struct, the fields from the struct must be exported when,
	// template will be executed
	t2 := Create("t2", "Name: {{.Name}}\n")

	t2.Execute(os.Stdout, struct {
		Name string
	}{"Jane Doe"})

	// here, map also have a key with Name, so it will also work, but maps doesnt require you to have exported key
	t2.Execute(os.Stdout, map[string]string{
		"Name": "Mickey Mouse",
	})

	// templates also allow if/else
	t3 := Create("t3",
		"{{if . -}} yes {{else -}} no {{end}}\n")
	t3.Execute(os.Stdout, "not empty") // yes
	t3.Execute(os.Stdout, "")          // no

	// templates also allow ranges
	t4 := Create("t4",
		"Range: {{range .}}{{.}} {{end}}\n")
	t4.Execute(os.Stdout, // Range: Go, Rust, C++, C#
		[]string{
			"Go",
			"Rust",
			"C++",
			"C#",
		})
}
