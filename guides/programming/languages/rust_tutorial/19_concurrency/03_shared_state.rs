// 1. another way of concurrency is accessing shared data

// 2. shared-memory concurrency is like multiple ownership where multiple thread can accesss
//    same data in memory

// 3. mutex - mutual exclusion which means only a single thread is allowed to access some data
//            at any given time.
// 3.1 to access data in a mutex, a thread must signal that it want to acquire mutexes lock
// 3.2 mutex lock - data structure that is part of the mutex that keeps track of who currently
//                  has exclusive access to the data.
// 3.3 mutexes are hard mostly because of 2 things:
//      1. you must attempt to acquire mutex lock before using data
//      2. when you are done with data, you must unlock the data so that other threads can acquire the lock

use std::{
    rc::Rc,
    sync::{Arc, Mutex},
    thread,
};

fn main() {
    // 1. Mutex::new() creates a new mutex
    let m = Mutex::new(5);
    {
        // 2. to access data inside the mutex, we acquire the lock through call of .lock() on mutex
        // 3. .lock() blocks the current thread until it can acquire the lock and access the data
        // 4. if a thread panics while holding a Mutex, the Mutex becomes poisoned, which means
        //    other threads that subsequently call .lock() will get an Err(PosionError)
        // 5. .lock() returns MutexGuard which:
        //          1. implements Deref trait to point to data
        //          2. implements Drop trait which releases the lock automatically when
        //             a MutexGuard goes out of scope.
        // 6. .unwrap() returns the MutexGuard wrapped in a LockResult
        let mut num = m.lock().unwrap();
        // 5. if we acquired the lock, .unwrap() returned the Result Ok() variant, we can access
        //    data and do what we need with it
        *num = 6;
    }
    println!("m = {m:?}");

    // 1. this code shows that we cant use a mutex which was moved in the first cycle of the loop,
    //    but what if we wanted to ?
    let counter = Mutex::new(0);
    let mut handles = vec![];
    for _ in 0..10 {
        let handle = thread::spawn(move || {
            // here, we move the "counter" mutext in the first cycle, the next cycle will produce a
            // compile errror of  trying to use a "moved value"
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
    // error, we are trying to use a moved value
    // println!("Result: {}", *counter.lock().unwrap());
    //
    // 2. we could try to adhere to the known smart pointer! Rc<T> which allow us to have references
    //    to the original data
    let counter = Rc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        // 1. yeah, creating pointer copies to the original counter, but here is the problem...
        //    you cannot be sure any of threads will not affect increasing/decreasing across
        //    threads, remember, Rc<T> is only for single threading
        let counter = Rc::clone(&counter);
        // 2. "move" cannot send "counter" (pointer copies) across threads safely...,
        //    which means Send trait is not implemented for Rc<T> type...
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
    // error, accessig moved data
    // println!("Result: {}", *counter.lock().unwrap());
    //
    // 3. whats the fix then ????? Arc<T> type!!!
    //
    //    1. Arc<T> is like Rc<T> that is safe acros threads.
    //    2. "A" in Arc means "atomic" - atomically reference-counted type
    //    3. "atomic" - additional kind of concurrency primitve(you can study it from std::sync::atomic),
    //                  so its "atomic" which is safe across threads inside Arc<T>
    //    4. if "atomic" is thread safe, why all types do not ipmlement it for thread safety ?
    //       thread safety comes with penalty for runtime performance, and you should know it when
    //       choosing thread-safety things like channels, mutexes or "atomic"s
    //
    // 4. here we create a mutex which is inside a Arc<T>
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..10 {
        // 5. here we crate a pointer copy of the original mutex
        let counter = Arc::clone(&counter);
        // 6. here we move the pointer copy
        let handle = thread::spawn(move || {
            // 7. here we acquire the lock on mutext by using the pointer copy to original mutex
            //
            // notice the fact that we make our mutex "mutable" even though its definition is
            // immutable, this means Mutex<T> provides "interior mutability" as RefCell<T> smart
            // pointer and all *Cell structs
            let mut num = counter.lock().unwrap();
            *num += 1
        });
        // 8. here, we store our threads for future usage
        handles.push(handle);
    }
    // 9. here, we iterate over our vector of threads
    for handle in handles {
        // 10. here we look if all thread finished successfully wihtout panics
        handle.join().unwrap();
    }
    println!("Result: {}", *counter.lock().unwrap());

    // 1. Mutexes can be overkill for primitive data, inside std::sync::atomic there are other types
    //    which can help with accessing shared data between threads.
}
