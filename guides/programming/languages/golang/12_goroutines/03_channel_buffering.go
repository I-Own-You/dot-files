package main

import (
	"fmt"
)

func ChannelBuffering() {

	// a buffered channel with a capacity means no more than (N) values can be hold before the thred is blocked
	messages := make(chan string, 2)

	messages <- "buffered"
	messages <- "channel"
	messages <- "hello" // this will cause panic, deadlock

	fmt.Println(<-messages)
	fmt.Println(<-messages)
	fmt.Println(<-messages) // this will also cause panic, deadlock
}
