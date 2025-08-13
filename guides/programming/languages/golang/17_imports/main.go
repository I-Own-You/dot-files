package main

// when there are imports inside ( ), its called a factored import statement.
import (
	_ "bytes" // this way you can import a package but not use it so compiler wont complain,
	//           its mainly used for side effects when other package use it
	"fmt"
	"math"
	ss "strings" // this way you can rename the imported package
)

// you could also write them on separate line but the above is preffered
// import "fmt"
// import "math"

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
	fmt.Printf("%s", ss.ToLower("sdfsdf"))
}
