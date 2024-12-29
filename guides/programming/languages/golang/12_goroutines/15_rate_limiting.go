package main

import (
	"fmt"
	"time"
)

func RateLimiting() {
	// you can implement rate limiting with go routines, channels and tickers,
	// rate limiting is a constraint after certain actions

	// simulate an allowed of 5 request
	requests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		requests <- i
	}
	// no more requests than 5 can be sent
	close(requests)

	// our limit so that only once a 200 ms we can send a request
	limiter := time.Tick(200 * time.Millisecond)

	for req := range requests {
		// here we simulate the 200ms waiting
		<-limiter
		fmt.Println("request", req, time.Now())
	}

	// but if we want to allow n requests at a time before rate limiting ?
	// here we simulate it
	burstyLimiter := make(chan time.Time, 3)

	for i := 0; i < 3; i++ {
		// fill up the channel with values
		burstyLimiter <- time.Now()
	}

	go func() {
		// once in 200ms range in a separate thread
		for t := range time.Tick(200 * time.Millisecond) {
			// since our burstyLimiter has 3 values above filled up for instant non blocking burst requests,
			// we need to fill up again with values after the first 3 requests are executed,
			// its an infinite for of every 200ms in a separate thread
			burstyLimiter <- t
		}
	}()

	// simulate our requests
	burstyRequests := make(chan int, 5)
	for i := 1; i <= 5; i++ {
		// fill up the channel
		burstyRequests <- i
	}
	// close channel, no more values can be sent
	close(burstyRequests)

	for req := range burstyRequests {
		// since our burstyLimiter has initially 3 values in its channel, the first 3 requests will be instant,
		// then it will wait until new values are sent into burstyLimiter every 200ms, its defined above
		<-burstyLimiter
		fmt.Println("request", req, time.Now())
	}
}
