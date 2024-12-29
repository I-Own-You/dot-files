package main

import (
	"embed"
)

// go can embed a file into a variable/byte/FS type variable,
// at compile tiime with embed directive: https://pkg.go.dev/embed - more details

//go:embed a.txt
var fileString string

//go:embed a.txt
var fileByte []byte

//go:embed a.txt
var folder embed.FS

func EmbedDirective() {

	print(fileString)
	print(string(fileByte))

	content1, _ := folder.ReadFile("folder/file1.hash")
	print(string(content1))

	content2, _ := folder.ReadFile("folder/file2.hash")
	print(string(content2))
}
