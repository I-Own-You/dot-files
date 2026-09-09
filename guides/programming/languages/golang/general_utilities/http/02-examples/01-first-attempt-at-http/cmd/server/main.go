package main

import "example.com/test/internal/app"

// also, remember that wherever you have "main" package, you cannot import from it, it doesnt act
// as a library, its the source point where executable is building, "main" is the one importing
// features.

func main() {
	app := app.New()
	app.Middlewares()
	app.Routes()
	app.Run()
}
