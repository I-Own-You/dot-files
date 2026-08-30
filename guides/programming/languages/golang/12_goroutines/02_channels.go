package main

import (
	"fmt"
	"time"
)

func channels() {
	// channels are like pipes between goroutines, so you can send values into one channel from some goroutine,
	// and recieve the value in another goroutine

	// this way you create a channel with make(), if size is omitted or 0, the channel is unbuffered,
	// an unbuffered channel means it will block when send/receive values.
	// if the buffer has capacity,it wont block the thread untill the channel is
	// full(no more space for values to store) or empty(no more values to retrieve from)
	messages := make(chan string)

	fmt.Printf("messages: %v\n", messages)

	// with channel <- value syntax, we can send the value into the channel from a new goroutine
	go func() { messages <- "ping" }()
	time.Sleep(time.Second * 5)

	// <- channel syntax can retrieve a value from the channel
	msg := <-messages
	fmt.Println("msg:", msg)
	// by default, sender and reciever will wait(block threads) each other until they both are ready

	// its not usual to define <-chan/chan<- types, this is usually,
	// encountered in function paramater types.
	var receiveChan <-chan any
	var sendChan chan<- any
	dataStream := make(chan any)

	receiveChan = dataStream // dataStream here implicitly is convertedd to <-chan
	// receiveChan <- true   // invalid since receiveChan is send channel only
	sendChan = dataStream // dataStream here implicitly is converted to chan<-
	// <-sendChan            // invalid since sendChan is receive channel only

	// 1. a non initialized channel always panic on:
	//    send, receive, close, as a select case
	var a chan<- int // a is nil
	// everything here is an error, it blocks indefinetly
	// a <- 5
	// b := <-a
	// close(a)
	// select {
	// case a <- 5:
	// case <-a:
	// case v := <-a:
	// }

	// 1. multiple variables can opearte on the same channel, under the hood the variable is just
	//    a reference to the object of the channel at runtime
	f_chan := make(chan int)
	s_chan := f_chan
	t_chan := s_chan
	go func() { t_chan <- 5 }()
	fmt.Println(<-f_chan)
	// tip: channels are special constructions handled by go runtime
	//
	// 2. there are very rare cases when you can get a channel through a pointer to:
	//    1. change the variable itself so it will point to another channel
	//    2. remove a reference for a channel
	// 1:
	some_chan := make(chan int)
	ptr_some_chan := &some_chan
	// here, it now points to a new channel and not to channel opened through some_chan variable
	*ptr_some_chan = make(chan int)
	// 2:
	*ptr_some_chan = nil
}
