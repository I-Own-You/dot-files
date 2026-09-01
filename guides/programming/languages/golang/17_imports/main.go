package main

// when there are imports inside ( ), its called a factored import statement.
import (
	_ "bytes" //    1. this way, by putting "_" in front, you can import a package but not use it
	// 			       so compiler wont complain, its mainly used for side effects when other package use it
	//			    1.1 its mainly used to execute the init() function from "bytes" package
	// 				    which is invoked on package import, so its like a side effect
	. "errors" //   2. "." in front of a package means import everything from there, so you
	//			       dont need to do error.something
	"errors" //     2.1 errors itself cant be used so we need to import it
	"fmt"    //	    3. simple import
	"math"
	ss "strings" // 4. alias import, this way you can rename the package and use it instead
)

// you could also write them on separate line but the above is preffered
// import "fmt"
// import "math"

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
	fmt.Printf("%s", ss.ToLower("sdfsdf"))

	new_err := New("my error") // its actually errors.New()
	fmt.Printf("new_err: %v\n", new_err)

	new_err2 := errors.New("my error2")
	fmt.Printf("new_err2: %v\n", new_err2)
}
