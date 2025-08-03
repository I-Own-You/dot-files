package main

import (
	"fmt"
	"os"
)

// defer is used when you need to execute something as a cleanup or at the end of function scope,
// bear in mind that it will wait for all functions or processes inside the functioin scope defer is used.
// defer arguments are evaluated immediately, though, so if you have a function inside your main deferrred function,
// then it will be executed immediately.
// os.exit() will stop defer from working.

func main() {

	f := createFile("/tmp/defer.txt")
	// here we defer the closing operation untill the whole main() process is not finished, so we wait writeFiel(f)
	defer closeFile(f)
	writeFile(f)
}

func createFile(p string) *os.File {
	fmt.Println("creating")
	f, err := os.Create(p)
	if err != nil {
		panic(err)
	}
	return f
}

func writeFile(f *os.File) {
	fmt.Println("writing")
	fmt.Fprintln(f, "data")
}

func closeFile(f *os.File) {
	fmt.Println("closing")
	err := f.Close()

	// even when defering we anyway need to check for errors just in case
	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}

	// multiple defers in a program are executing from bottom up, so 10 liens of defer will start from the bottom
}
