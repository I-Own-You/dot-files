package main

import (
	"fmt"
	"sync"
	"time"
)

// to wait for multiple goroutines to finish we can use wait groups

// our worker
func workerrr(id int) {
	fmt.Printf("Worker %d starting\n", id)
	time.Sleep(time.Second)
	fmt.Printf("Worker %d done\n", id)
}

func WaitGroups() {

	// this would be our wait group that will wait for all threads to finish
	// if you plan to pass waitgroup to a function, it should be through a pointer
	var wg sync.WaitGroup

	for i := 1; i <= 5; i++ {
		// increment wait group by n goroutines you start
		wg.Add(1)

		// execute in closure to tell the worker is done for the wait group
		go func() {
			// defer keyword ensures the waitgroup is decremented by 1, no matter what happens inside goroutine,
			// workerrr(i) functioin, like panics, early returns or errors, because if not called, it would break,
			// the waitgroups tracking goroutines and could lead to panic because the programm hangs for waiting,
			// the wait group to become 0, meaning all threads executed.
			// also, the keyword defer here means it will be executed after all function scope is finished,
			// meaning workerrr(i) also needs to finish, and then wg.Done() will be executed
			defer wg.Done()
			workerrr(i)
			// wg.Done()
		}()
	}
	// the execution here works

	// here we block until the wait group counter goes to 0 (means all threads executed)
	wg.Wait()

	// only resumed when wg.Wait() finishes all its waiting threads

}
