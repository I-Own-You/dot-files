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
	// if the buffer has capacity,
	// it wont block the thread untill the channel is full(no more space for values to store) or empty(no more values to retrieve from)
	messages := make(chan string)

	fmt.Printf("messages: %v\n", messages)

	// with channel <- value syntax, we can send the value into the channel from a new goroutine
	go func() { messages <- "ping" }()
	time.Sleep(time.Second * 5)

	// here with the syntax someVariableThatHoldsValue <- channel we can recieve the value from a channel from
	msg := <-messages
	fmt.Println("msg:", msg)
	// by default, sender and reciever will wait(block threads) each other until they both are ready,
	// by blocking the sender and reciever until they are ready

	// its not usual to define <-chan/chan<- types, this is usually,
	// encountered in function paramater types.
	var receiveChan <-chan any
	var sendChan chan<- any
	dataStream := make(chan any)

	receiveChan = dataStream // dataStream here implicitly is convertedd to <-chan
	// receiveChan <- true   // invalid since receiveChan is send channel only
	sendChan = dataStream // dataStream here implicitly is converted to chan<-
	// <-sendChan            // invalid since sendChan is receive channel only
}
