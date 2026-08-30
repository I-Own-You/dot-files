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
// but you can define them in go.mod manually with the [replace] directive or [go mod edit] command
// and then you will be able to import them.

import (
	"fmt"

	// here, rsc.io is a module, quote is a package provided by module
	// this module by default wont work because you need to download it, you can do it with [go mod tidy]
	"rsc.io/quote"

	// this is a module in our module folder
	"modules/example/myPkg"

	// 1. the package from the "module_example" module which is utils, all the other packages can be,
	//    only in other folders and we would need to specify them after "submodule/example/{here}"
	// 2. utils can be changed to other name and be used
	// 3. we cannot remove the package name itself since the compiler will either:
	//			1. add the package name in fron of the path
	//			2. remove the declartion entirely
	utils "submodule/example"

	// 1. same as above but now we import another package from "module_example" module
	// 2. actually, here we must
	myPkg2 "submodule/example/myPkgg"
	// an important rule about folder names and package name:
	//
	// if your package name and folder name containing the package dont have the same name,
	// you cannot import the package through a folder without specifying a name in front of it as we did above
)

func main() {
	fmt.Println(quote.Go())
	myPkg2.AB()
	utils.CallMe()

	a := myPkg.AC()
	fmt.Printf("a: %v\n", a)
}
