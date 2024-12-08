package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

// the primary mechanism for managing state is through channels, but
// there are other options such as sync/atomic package that provide functionality such as,
// atomic counters accessed by multiple gorotuines

func AtomicOperations() {

	// we will use an atomic unsigned integer type (always positive)
	var ops atomic.Uint64

	//a wait group to help wait on all threads to finish
	var wg sync.WaitGroup

	// start 50 goroutines
	for i := 0; i < 50; i++ {
		// add each goroutine to wait group
		wg.Add(1)

		go func() {
			for c := 0; c < 1000; c++ {

				// atomically increment our value
				ops.Add(1)
			}

			wg.Done()
		}()
	}

	// wait until all threads are executed
	wg.Wait()

	// when goroutines modify an atomic value, its not safe to access it,
	// since on this line we dont modify the atomic value we could access it without .Load(),
	// but .Load() is a safe method to acess the atomic value even if other threads would still be,
	// modifying the atomic value in other threads.
	fmt.Println("ops:", ops.Load())
	// the print would be 50_000 because we used an atomic value that was modified by 50 threads,
	// but since its an atomic value with atomic operation, threads wont interact with each other and,
	// and wont interfere with each others value.
	//
	// if we would use a simple int variable, we would get another number, because,
	// a lot of threads would interfer at the same time trying to increase the counter.
	//
	// moreover if we would execute our program with -race flag we would get the race condition error
}
