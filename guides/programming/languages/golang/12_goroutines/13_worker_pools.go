package main

import (
	"fmt"
	"time"
)

// this will be the worker, the main point is:
// it uses the common jobs channel and awaits for values on it, this is why it will share with other workers,
// because they all operate on the same channel
func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Println("worker", id, "started  job", j)
		time.Sleep(time.Second)
		fmt.Println("worker", id, "finished job", j)
		results <- j * 2
	}
}

func WorkerPools() {

	const numJobs = 5
	jobs := make(chan int, numJobs)
	results := make(chan int, numJobs)

	// instantiate 3 workers
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// send 5 jobs, wont block because the channel has enough capacity
	for j := 1; j <= numJobs; j++ {
		jobs <- j
	}
	// close jobs channel, indicating our job is done
	close(jobs)

	// this operation will block to receive the value
	// collect the values(we dont, we just use the receiving syntax), and also,
	// we ensure that the worker goroutines have finished
	for a := 1; a <= numJobs; a++ {
		<-results
	}

	// why this is important ?
	// because the worker specifically has a 1s sleep, and since we give 5 jobs, it would take 5s,
	// but we have 3 instances of workers that operate on the same channel in different threads,
	// so they will share and operate conccurently and will terminate the work faster
}
