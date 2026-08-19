// 1.   an executed program code is run in a process
// 1.1. OS manage multiple proccesses at once
// 1.2. within your program, you can also have independent parts that run simultaneously
// 1.3. these independent parts are run within a thread.

// 2. splitting program code across threads can increse performance but increase complexity
// 2.1 threads run separately of each other, theres no guarantee about the order of your program
//     code, it can lead to problems:
//          1. race condition (data is accessed in random order by each thread)
//          2. dead lock (2+ separate threadss wait on each other)
//          3. other bugs (very rare ones, whatever they may be)

// 3. rust std uses 1:1 model of thread implementation, where a program uses:
//       1 OS thread per 1 language thread

use std::thread;
use std::time::Duration;

fn main() {
    // 3. we can fix the issue of this thread to not run by storing the result of thread::spawn
    //    inside a variable, the return type of thread::spawn is JoinHandle<T> on which you can call
    //    .join() method to be sure the "main" thread will not exit until this thread finishes
    let handle = thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {i} from the spawned thread!");
            thread::sleep(Duration::from_millis(1));
        }
    });

    // 5. if we would have .join() call here on "handle" thread, we would create an order about how
    //    our threads run, "handle finishes", then "main" is resumed
    // handle.join().unwrap();

    // 1. after last cycle, "main" thread the program is executing in, finishes, this means the program
    //    terminates which leads to cancellation of all other threads as well
    //
    // 2. the problem with these 2 for-cycle is that:
    //      1. the order of running is not specified, it will be random everytime
    //      2. the above for-cycle inside a seaprate thread can even not run because the below
    //         for-cycle could finish faster
    for i in 1..5 {
        println!("hi number {i} from the main thread!");
        thread::sleep(Duration::from_millis(1));
    }

    // 4. we basically "block" the current thread in which we are, in our case "main" untill our
    //    other thread "handle" finishes.
    //
    // without this block, "main" thread will finish and quit the program execution which means
    // all the other threadss will be dropped out;
    //
    // .unwrap() basically will if thread ended successfully or will panic in case of errors
    handle.join().unwrap();

    // 6. using threads will often be on par with using "move" for closures since threads cannot
    //    work on the same data through closures without dropping data, since we dont know in which
    //    thread exaclty the data will be invalidated and how long it will live
    let v = vec![1, 2, 3];
    // here, we borrow "v", but we dont know for how long our thread will run, it could run
    // longer than "main" thread which means the data is dropped inside "main" but could still be
    // needed inside "hanlde" thread
    let handle = thread::spawn(|| {
        println!("Here's a vector: {v:?}");
    });
    //
    let v = vec![1, 2, 3];
    // here, we move the data entirely to "handle" thread which means we can no longer use data
    // inside "main" thread so that data will live inside that thread now
    let handle = thread::spawn(move || {
        println!("Here's a vector: {v:?}");
    });
    handle.join().unwrap();
}
