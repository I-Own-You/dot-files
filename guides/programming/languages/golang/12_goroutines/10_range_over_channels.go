package main

import "fmt"

func RangeOverChannels() {
	// we can use for range to iterate over values received from a channel

	queue := make(chan string, 2)
	queue <- "one"
	queue <- "two"
	close(queue)

	// this easy way we can just iterate thorugh values from a channel and it will close automatically when,
	// the last value will be given because the channel was closed above,
	// if channel would not be closed, it will panic because it would continue the for but no more values to retreive
	for elem := range queue {
		fmt.Println(elem)
	}
}
