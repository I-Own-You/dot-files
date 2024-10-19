package main

import (
	"fmt"
	"time"
)

func timeouts() {
	// for example some external call then returns its result on channel c1 after 2s.
	// the channel is buffered, meaning it will be nonblocking for 1 value,
	// its a common pattern to buffer so it wont block the thread and in case you dont read from the channel
	c1 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c1 <- "result 1"
	}()

	select {
	case res := <-c1:
		fmt.Println(res)
	case <-time.After(1 * time.Second):
		// this case will fire no matter what, only if there is no other return value, like a timeout.
		// in this case it will fire because the c1 channel has a time.Sleep() of 2 seconds, our timeout if of 1s,
		// so this case will fire and select will exit
		fmt.Println("timeout 1")
	}

	c2 := make(chan string, 1)
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "result 2"
	}()
	select {
	case res := <-c2:
		// this will fire, because the c2 channel gets done in 2 seconds, timeout allows up to 3s
		fmt.Println(res)
	case <-time.After(3 * time.Second):
		// this case wont fire because our timeout allow up to 3s of free time,
		// the c2 channel operation gets done in 2s
		fmt.Println("timeout 2")
	}
}
