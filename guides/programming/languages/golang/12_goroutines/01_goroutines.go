package main

import (
	"fmt"
	"time"
)

// a goroutine is a lightweight thread execution

// 1. go has its own thread scheduler which works on os thread scheduler (without us)
//    in fact, it has a thread pool which reuses goroutines so our programm could stay more efficient because
//    every goroutine costs resources(memory) + context switch time,
// 2. it basically works with network pool,
//    but when it comes to file, then, it probably will create a separate real OS thread since only network pool
//    async work is implemented by the operating systems, (windows probably has for files), but the thread will,
//    anyway go to the thread pool again to be reused
// 3. therad pool is also named (local runing queue) for go thread and (global runing queue) for real OS threads
// 4. if a core from cpu no longer has goroutines to work, it could steal some from other core which has some,
//    and help it with work, or it could steal from (global os threads if there are goroutines)
// 5. context switch happens at go program level(go scheduler), not on pc hardware, so our cpu thinks we are,
//    doing CPU bound work, but its really an IO bound work, so this means we dont really need a lot of OS threads,
//    we can have little but a lot in go app because of the go scheduler which does io bound work,
//    which means we have go scheduler at go application level which does all the work which minimizes the need of,
//    real OS threads and real OS context switches, this is why golang is ideal for IO bound operations.
// 6. how threads change priority and switches the context ? its through system events

// each gorouitne has a default of 2kylobytes of stack on its own, if goroutine surpasses this,
// the stack will grow, it means if in your goroutines you have for example a lot of variables which,
// surapssed 2kb of memory, stack will grow.

// os threads for example have a default of 1mb of default stack memory

func f(from string) {
	for i := 0; i < 3; i++ {
		fmt.Println(from, ":", i)
	}
}

func goroutines() {
	// this is executed in the main thread of the application
	// this would be executed the first, because its in the main thread of the application (synchronous code)
	f("direct")

	// this way you start a goroutine, its basically starting executing in a separate thread of application
	// this would start in another thread, but would be executing alongside the sync code
	go f("goroutine")

	// also executin in another thread
	// this would start also in another thread, but would be executing alongside the sync code and other goroutines
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
