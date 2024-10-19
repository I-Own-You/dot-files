package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func ScannerExample() {

	// scanner is a handy way to work with files, mainly for its tokenization way,
	// its used for read by lines or read by words but has other options too.
	// its not as efficient as buffio.reader/writer but nicer way for simple and easy things.
	scanner := bufio.NewScanner(os.Stdin)

	// return false if end of the input or error
	for scanner.Scan() {

		ucl := strings.ToUpper(scanner.Text())

		fmt.Println(ucl)
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintln(os.Stderr, "error:", err)
		os.Exit(1)
	}
}
