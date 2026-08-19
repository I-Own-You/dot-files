
// 1. key elements in async programming in rust are:
//      1. future
//      2. async/await

// 2. future - value that may not be ready now but will be ready  at some point in the future.
//
//      1. Rust provides a "Future" trait so that different async operations can be implemented with
//         different data structures but common interface.
//      2. In rust, "futures" are types tha implemente "Future" trait.
//      3. each "future" holds its own information about the progress that has been made and that it
//         is "ready"

// 3. "async" can be applied to blocks and functions to specify that they can be: interrupted/resumed
// 3.1 within an "async" block/function you can use "await" to await a "future"(to wait until its ready)
// 3.2 any point where you "await" a future within an "async" block/function is a potential spot for 
//     that block/function to pause or resume.
// 3.3 the process of checking with a "future" to see if its value is available is called: "polling"

fn main() {
    
}
