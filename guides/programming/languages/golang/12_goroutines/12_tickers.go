package main

import (
	"fmt"
	"time"
)

// tickers can be used when you want to do someting at certain regular interval

func tickers() {

	// ticker is a channel that also receives values
	ticker := time.NewTicker(500 * time.Millisecond)
	done := make(chan bool)

	go func() {
		for {
			// we use select to await the values at intervals
			select {
			// once done, it exits the thread
			case <-done:
				return
			// t is a timestamp in this case from ticker.C channel that is filled from time.NewTicker above
			case t := <-ticker.C:
				fmt.Println("Tick at", t)
			}
		}
	}()

	time.Sleep(1600 * time.Millisecond)

	// this mean the ticker is stopped, no more tickers sent,
	// but it doesnt close the channel so other thread could read from the channel and not get an error
	ticker.Stop()

	done <- true
	fmt.Println("Ticker stopped")
}
