package main

import "fmt"

// when using channels as function parameters,
// you can specify if a channel is meant to only send or receive values.

// here, the pings paramter accepts a channel that will send a value, otherwise error
func ping(pings chan<- string, msg string) {
	pings <- msg
}

// pings parameter is for receiving a value, otherwise panic
// pongs parameter is for sending values, otherwise panic
func pong(pings <-chan string, pongs chan<- string) {
	msg := <-pings
	pongs <- msg
}

func ChannelDirections() {
	pings := make(chan string, 1)
	pongs := make(chan string, 1)
	ping(pings, "passed message")
	pong(pings, pongs)
	fmt.Println(<-pongs)
}
