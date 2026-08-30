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
		// 1. increment wait group by n goroutines you start
		wg.Add(1)

		// 2. execute in closure to tell the worker is done for the wait group
		go func() {
			// 1. wg.Done() ensures the waitgroup is decremented by 1 no matter what
			//	  happens inside goroutine
			// 2. if you dont call wg.Done() you never decrement the amount of wait groups you added,
			//    which means the waitgroup will never reach 0 waitgroups available which would mean
			//    calling "wg.Wait()" will just hang the program - deadlock.
			//
			// tip: defer means it will be executed after all function in current scope return,
			//      meaning workerrr(i) also needs to finish, and then wg.Done() will be executed
			defer wg.Done()
			workerrr(i)
			// wg.Done()
		}()
	}

	// block until the wait group counter goes to 0 (means all threads executed)
	wg.Wait()

}
