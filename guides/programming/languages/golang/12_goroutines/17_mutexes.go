package main

import (
	"fmt"
	"sync"
)

// for a complex state management we can use mutex to safely access data across multiple threads
// this container will hold a map of counters that we will update from multiple threads.
// we also add a mutex to synchronize the access.
// mutexes must not be copied, if you pass this struct somewhere, only by pointer
type Container struct {
	mu       sync.Mutex // zeroed value of the mutex is also usable, no need for initialization
	counters map[string]int
}

func (c *Container) inc(name string) {

	// here we lock the resources while a thread is using it
	c.mu.Lock()

	// here we make sure we unlock the resources so we wont hang the program
	defer c.mu.Unlock()

	c.counters[name]++
}

func mutexes() {
	c := Container{counters: map[string]int{"a": 0, "b": 0}}

	// create a wait group
	var wg sync.WaitGroup

	doIncrement := func(name string, n int) {
		for i := 0; i < n; i++ {
			// here our function will increment our container map values
			c.inc(name)
		}
		// release a wait group after the function is done
		wg.Done()
	}

	// here we add 3 to the wait group, because lower we invoke doIncrement 3 times
	wg.Add(3)
	// threads use in the function the common container, but since we use a mutex it will work as expected
	go doIncrement("a", 10000)
	go doIncrement("a", 10000)
	go doIncrement("b", 10000)

	// wait for the threads to finish
	wg.Wait()
	fmt.Println(c.counters)
}

// starvation: when a goroutine waits for too long or never gets to run, in some case it could be ok(for delay only),
// 			   for example sync.RwMutex which prioritizes writers over readers lock.
