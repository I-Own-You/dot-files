package main

import "fmt"

func RangeOverChannels() {
	// we can use for range to iterate over values received from a channel

	queue := make(chan string, 2)
	queue <- "one"
	queue <- "two"
	// close(queue)

	// 1. this easy way we can just iterate thorugh values from a channel and
	//    it will close automatically when the last value will be given because the channel was closed above,
	// 2. if channel would not be closed,
	//    it would panic because it would continue the for but no more values to retreive
	// 3. range over a channel can wait forever for a value but there should be a way to 
	//	  to unblock the waiting goroutine for golang to not panick, basically means:
	//    if there are goroutines alive the for cycle will wait someone to close the channel,
	//    but if all goroutines finished, go runtime spots this and panics with a deadlock warninig
	for elem := range queue {
		fmt.Println(elem)
	}
}
