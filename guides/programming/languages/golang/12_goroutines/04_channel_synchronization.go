package main

import (
	"fmt"
	"time"
)

func workerr(done chan bool) {
	fmt.Print("working...")
	time.Sleep(time.Second)
	fmt.Println("done")

	// here you block
	done <- true
}

func ChannelSynchronization() {

	done := make(chan bool, 1) // actually this implementation would work without 1 length
	go workerr(done)

	// here you also block until you get a value into channel, since above we have go worker(done),
	// it starts executing the function in another thread while the main is blocked because of <-done,
	// and when done <- true is hit in the function of another thread, here it receives the value and terminates.
	// without this line, the program would just terminate the main thread and all executing/blocked threads
	<-done
	// even though our channel is buffered by 1 length, it still doesnt have values, it still blocks
}
