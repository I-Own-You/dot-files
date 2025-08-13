package main

// when your code imports packages contained in other modules/packages,
// you manage those dependencies through your code's own module.
//
// module is defined by a go.mod file that tracks the modules that provide those packages/modules.
// that go.mod file stays with your code, including in your source code repository.
//
// in actual development,
// the module path will typically be the repository location where your source code will be kept.
// for example, the module path might be github.com/mymodule.
//
// if you plan to publish your module for others to use,
// the module path must be a location from which Go tools can download your module.
// more info -> https://go.dev/doc/modules/managing-dependencies#naming_module
//
// this is how you would initialize your module: [go mod init {name}] ->  go mod init example/hello
//
// modules in go are separate identities,
// so you cannot import modules in each other if they are not published,
// but you can define them in go.mod manually with the [replace] directive,
// and then you will be able to import them.

import (
	"fmt"

	// here, rsc.io is a module, quote is a package provided by module
	// this module by default wont work because you need to download it, you can do it with [go mod tidy]
	"rsc.io/quote"

	// this is a module in our module folder,
	// unfortunately you can import only published modules by default,
	// but you can use the [replace] directive in go.mod where you want to import a module and make it work,
	// or [go mod edit] command.
	//
	// instead of example it would be utils, to be consistent, but nice to know names can be different.
	// utils is an alternative name, you can have there any name, it will work, but its confusing, so
	// example would be utils because submodule/example has utils package,
	// actually, you can even leave the name of utils, but formatter will try to either put it back or remove module/package, bad
	"modules/example/myPkg"
	utils "submodule/example"
	myPkgg "submodule/example/myPkgg"
)

func main() {
	fmt.Println(quote.Go())
	myPkgg.AB()
	utils.CallMe()

	a := myPkg.AC()
	fmt.Printf("a: %v\n", a)
}
