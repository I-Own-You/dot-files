package main

import (
	"fmt"
	"time"
)

// there is a way to execute go code at some point in the future or at some interval,
// this can be achieved with gos builtin timer and ticker

func timers() {

	// a timer is an event in the future, you tell how long to wait before the execution.
	// and it provides a channel that will be notified when to execute
	timer1 := time.NewTimer(2 * time.Second)

	// this line will block the thread in which its executing and unblock it when the timer finishes and,
	// continues the execution of the program.
	// in main thread not that handy but in ohter goroutines,
	// it can delay some action without touching other goroutines and the main thread
	<-timer1.C
	fmt.Println("Timer 1 fired")

	timer2 := time.NewTimer(time.Second)
	go func() {
		// here you blocked the thread until timer fires the execution again
		<-timer2.C
		fmt.Println("Timer 2 fired")
	}()
	// here you stopped the timer so it wont execute the code after <-timer2.C.
	// timer.Stop() returns true if stopped, false if not or already expired
	stop2 := timer2.Stop()
	if stop2 {
		fmt.Println("Timer 2 stopped")
	}

	// wait 2 seconds to truly show that the timer is stopped
	time.Sleep(2 * time.Second)
}
