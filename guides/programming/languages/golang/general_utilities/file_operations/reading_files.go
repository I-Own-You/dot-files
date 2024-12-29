package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
)

// go provides packages to work with files, mainly its os package and other helpers for it

// working with files its often needy to check for errors,
// so checkrf will be a helper instead of if clause.
func checkrf(e error) {
	if e != nil {
		panic(e)
	}
}

func ReadingFiles() {

	// read whole files content into memory, content is returned
	dat, err := os.ReadFile("/home/mkc/aloha.txt")
	checkrf(err)
	fmt.Print(string(dat))

	// open file for reading, any other actioins instead of reading wont work.
	// opens a file and if successful returns a pointer to the file to use for read.
	f, err := os.Open("/home/mkc/aloha.txt")
	checkrf(err)
	// create a slice of byte where will store the content
	b1 := make([]byte, 5)
	// reads len(b1) bytes, store them in b1, returns how many bytes were read
	n1, err := f.Read(b1)
	checkrf(err)
	fmt.Printf("%d bytes: %s\n", n1, string(b1[:n1]))

	// seek to specific location in a file and read/write from there, here is from the start
	o2, err := f.Seek(6, io.SeekStart)
	checkrf(err)
	b2 := make([]byte, 2)
	n2, err := f.Read(b2)
	checkrf(err)
	fmt.Printf("%d bytes @ %d: ", n2, o2)
	fmt.Printf("%v\n", string(b2[:n2]))

	// seek a position relative to the current position
	_, err = f.Seek(4, io.SeekCurrent)
	checkrf(err)

	// seek a position starting from the end
	_, err = f.Seek(-10, io.SeekEnd)
	checkrf(err)

	o3, err := f.Seek(6, io.SeekStart)
	checkrf(err)
	b3 := make([]byte, 2)
	// io package has some features that makes simpler working with files
	n3, err := io.ReadAtLeast(f, b3, 2)
	checkrf(err)
	fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))

	_, err = f.Seek(0, io.SeekStart)
	checkrf(err)

	// bufio package provides some useful methods for working with files and optimizations.
	// bufio.reader is more efficient because under the hood it loads 4kb of data into,
	// memory buffer where the data is taken instead of making multiple system calls,
	// so it operates a lot faster by working with memory buffer that has data, instead,
	// of making multiple system calls which needs kernel level rights.
	// the 4kb loader can be changed also.
	r4 := bufio.NewReader(f)
	b4, err := r4.Peek(5)
	checkrf(err)
	fmt.Printf("5 bytes: %s\n", string(b4))

	// usually files are closed on the next line after file is open, with defer
	f.Close()
}
