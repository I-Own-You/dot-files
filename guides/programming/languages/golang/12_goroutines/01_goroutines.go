package main

import (
	"fmt"
	"time"
)

func f(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
}

func goroutines() {
		// a goroutine is a lightweight thread execution
	// the thread management is done thourgh golang builtin scheduler that relies on a limited small os threads

	// this is executed in the main thread of the application
	// this would be executed the first, because its in the main thread of the application (synchronous code)
	f("direct")

	// this way you start a goroutine, its basically starting executing in a separate thread of application
	// this would start in another thread, but would be executing alongside the sync code
	go f("goroutine")

	// also executin in another thread
	// this would start also in another thread, but would be executing alongside the sync code
	go func(msg string) {
		fmt.Println(msg)
	}("going")

	time.Sleep(time.Second)
	fmt.Println("done")
	// the results here would be first everyting from sync code at first, but if it takes too long and the
	// async code (in another threads) are done, they would be returned earlier than sync code, only,
	// if async code is above sync code.
	// so its a concurrent execution, all processes are interleaved and returned on ready state
}
