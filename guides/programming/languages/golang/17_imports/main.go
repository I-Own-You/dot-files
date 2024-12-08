package main

// when there are imports inside ( ), its called a factored import statement.
import (
	"fmt"
	"math"
)

// you could also write them on separate line but the above is preffered
// import "fmt"
// import "math"

func main() {
	fmt.Printf("Now you have %g problems.\n", math.Sqrt(7))
}
