package main

import (
	"bufio"
	"fmt"
	"os"
)

// you can also write to files

// helper for errors
func checkwf(e error) {
	if e != nil {
		panic(e)
	}
}

func WriteToFiles() {

	d1 := []byte("hello\ngo\n")
	err := os.WriteFile("/home/mkc/aloha.txt", d1, 0644)
	checkwf(err)

	f, err := os.Create("/home/mkc/aloha.txt")
	checkwf(err)

	defer f.Close()

	d2 := []byte{115, 111, 109, 101, 10}
	fmt.Printf("d2: %s\n", d2)
	n2, err := f.Write(d2)
	checkwf(err)
	fmt.Printf("wrote %d bytes\n", n2)

	n3, err := f.WriteString("writes\n")
	checkwf(err)
	fmt.Printf("wrote %d bytes\n", n3)

	// when data is written to a file,
	// the OS often keeps data in memory for performance reason and update it when it thinks,
	// its the best(it writes fast but sometimes not instatntly).
	//
	// .Sync() method ensures the data from OS in memory buffer is written on the disk,
	// from the memory(flushes), it also impacts performance,
	// so its a trade off when working with critical resources like db operations, logs, .etc
	//
	// closing a file like f.Close()
	// flushes the data from memory buffer to the disk but f.Sync() ensures its flushed.
	f.Sync()

	// memory buffer where the data is stored instead of making multiple system calls,
	// for writes, it will store chunks of data to make a one write call when buffer is filled.
	// so it operates a lot faster by working with memory buffer that has data, insted,
	// of making multiple system calls which needs kernel level.
	// the 4kb loader can be changed also
	w := bufio.NewWriter(f)
	n4, err := w.WriteString("buffered\n")
	checkwf(err)
	fmt.Printf("wrote %d bytes\n", n4)

	// similar to f.Sync(), same purposes
	w.Flush()
}
