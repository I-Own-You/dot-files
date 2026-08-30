package main

import "fmt"

// closing a channel is useful to tell that no more values will be sent to a channel,
// also receivers will be informed that no more values will be there

func ClosingChannels() {
	jobs := make(chan int, 5)
	done := make(chan bool)

	go func() {
		for {
			// here it will forever loop to get values from jobs:
			// 1. j: will be the value.
			// 2. more: a bool meaning:
			//		1. true -  channel is not closed and there are values or there are values
			//	    2. false - channel is closed and there are no values in it
			j, more := <-jobs
			if more {
				fmt.Println("received job", j)
			} else {
				fmt.Println("received all jobs")
				done <- true // use the sync approach to wait at certain place in the code
				return
			}
		}
	}()

	for j := 1; j <= 3; j++ {
		// here we send continuously values and it wont block because the channel is buffered,
		// so we can store there and take later.
		jobs <- j
		fmt.Println("sent job", j)
	}
	// here we close the channel receive/send operations
	close(jobs)
	fmt.Println("sent all jobs")

	// wait for the goroutine above the forloop to notify the termination: done <- true on 21 line
	<-done

	// when you receive from a closed channel without values:
	// the first argument will be zero value of channel type, the second argument a bool false.
	// so any receiving from a closed channel wont block the thread because its closed, no values and empty
	_, ok := <-jobs
	fmt.Println("received more jobs:", ok)
}

// tip:
// 1. if you close a buffered channel, you STILL can receive all values and then v, ok := <-chan
//    will give you the zeroed value of channel type and ok will be false.
// 2. if you close an unbuffered channel while the value is sent into it in some goroutine,
//    then go will panic because you cant send values into channels which are closed.
