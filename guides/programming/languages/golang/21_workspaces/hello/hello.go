package main

import (
	"fmt"

	// here we can use bye module that is in our workspace without using replace directive
	// you initialize a workspace, add modules that you want to be available in all workspace,
	// you import them where you need and thats it.
	// [go work init]
	"example/bye"

	"golang.org/x/example/hello/reverse"
)

func main() {
	fmt.Println(reverse.String("Hello"))
	bye.Hello()
}
