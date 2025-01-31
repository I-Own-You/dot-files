package main

import "fmt"

// basic receive/send on channels are blocking
// but with select and default case, we can implement non-blocking sends/receives and multi-way selects

func NonBlockingChannelOperations() {
	messages := make(chan string)
	signals := make(chan bool)

	// here, if messages channel is ready to receive, case  will take it, if not, the default case is executed
	select {
	case msg := <-messages: // here it would be blocked without select
		fmt.Println("received message", msg)
	default:
		fmt.Println("no message received") // this will execute since messages doesnt have values to return
	}

	msg := "hi"
	select {
	case messages <- msg: // here it would be blocked without select
		fmt.Println("sent message", msg) // this will execute since msg can return into messages, because its empty
	default:
		fmt.Println("no message sent")
	}

	// also, a multi way select with non-blocking channel operations are also available
	select {
	case msg := <-messages:
		fmt.Println("received message", msg)
	case sig := <-signals:
		fmt.Println("received signal", sig)
	default:
		fmt.Println("no activity")
	}
}
