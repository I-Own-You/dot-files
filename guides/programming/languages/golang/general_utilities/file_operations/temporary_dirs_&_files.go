package main

import (
	"fmt"
	"os"
	"path/filepath"
)

// you can also create temporary files that do not sit on the file system forever,
// os is likely to remove them after time.

func checktdf(e error) {
	if e != nil {
		panic(e)
	}
}

func TemporaryDirAndFile() {

	f, err := os.CreateTemp("", "sample")
	checktdf(err)

	fmt.Println("Temp file name:", f.Name())

	defer os.Remove(f.Name())

	_, err = f.Write([]byte{1, 2, 3, 4})
	checktdf(err)

	dname, err := os.MkdirTemp("", "sampledir")
	checktdf(err)
	fmt.Println("Temp dir name:", dname)

	defer os.RemoveAll(dname)

	fname := filepath.Join(dname, "file1")
	err = os.WriteFile(fname, []byte{1, 2}, 0666)
	checktdf(err)
}
