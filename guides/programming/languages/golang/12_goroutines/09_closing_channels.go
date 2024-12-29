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
			// j: will be the value.
			// more: a bool meaning all values have been received and the channel is closed, or
			// values there remains and the channel is not closed
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

	// when you receive from a closed channel,
	// the first argument will be zero value of channel type, the second argument a bool false.
	// so any receiving from a closed channel wont block the thread because its closedd, no values and empty
	_, ok := <-jobs
	fmt.Println("received more jobs:", ok)
}
