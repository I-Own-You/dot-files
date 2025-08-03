package main

import (
	"fmt"
	"time"
)

// select in go lets you wait on multiple channels operations
// so combining goroutines with channels is a powerful way of handling things

func SelectGoroutines() {

	c1 := make(chan string)
	c2 := make(chan string)

	go func() {
		time.Sleep(1 * time.Second)
		c1 <- "one"
	}()
	go func() {
		time.Sleep(2 * time.Second)
		c2 <- "two"
	}()

	for i := 0; i < 2; i++ {
		// waits for any of the channel operation ready and executes the case.
		// here will be printed "received one" becasue it waits only 1 second,
		// and then "received two" because the for loop executes 2 times.
		// select operates only on 1 case and exits.
		// if more than 1 channel operation is ready at the same time,
		// go picks random one randomnly and execute
		select {
		case msg1 := <-c1:
			fmt.Println("received", msg1)
		case msg2 := <-c2:
			fmt.Println("received", msg2)
		}
	}

	// an empty select{} bolock a goroutine without returning value since it has no choices and awaits forever,
	// its like a for {} in some way or sleeping, but it must not block the thread,
	// so its kind of a trick construction.
	// its mainly needed when you want to hang a program so other goroutines do something but with no CPU usage,
	// things like for {}, because select{} uses no cpu.
}
