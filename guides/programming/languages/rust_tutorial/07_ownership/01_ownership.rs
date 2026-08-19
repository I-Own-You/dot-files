// 1. ownership - set of rules that govern how rust handles memory,
//                main reason is to manage heap data

// 2. ownership rules:
//    1. each value in rust has an owner
//    2. there can be only 1 owner at a time
//    3. when the owner goes out of scope, the value is dropped

fn main() {
    // 1. string literal - immutable so cannot be changed(the literal, not the variable with "mut")
    //                     its known at compile time(hardcoded into the program, .rodata actually)
    let immutable_string = "hey";

    // 2. dynamic string - when you dont know the size of the string or the string itself yet,
    //                     this String type manages data allocated on the heap,
    //                     and it can be changed as well
    // 2.1 memory for String is requested by the memory allocator at runtime (::from() does that)
    // 2.2 memory is deallocated once the variable that owns the String goes out of scope,
    //     actually Rust automatically calls a function "drop(var_name)" at the end of the scope,
    //     you can call it yourself to release memory earlier
    let mut dyn_string = String::from("hey");
    dyn_string.push_str(", its me");
    println!("{dyn_string}"); // hey, its me   

    // 1. here, because 5 is a simple value, y is bounded to 5, not to x, it works,
    //    because the size of 5 is known at compile time, no heap involved
    let x = 5;
    let y = x;

    // 1. String actually holds 3 fields as its implemeneted as a struct where on stack you have:
    //    1. pointer to the memory were data relies (so, data is on the heap)
    //    2. length of the string (in bytes)
    //    3. capacity of the string (meaning how much data can you push without needing to allocated
    //                               a new block of memory if the current capacity is surpassed)
    //                               this capacity is given from the allocator as well
    let s1 = String::from("hello");
    // 2. s1 is now copied into s2, but what exactly? 1. pointer 2. length 3. capacity,
    //    so you actually copy the s1 itself but not the data from the heap, in other words,
    //    the pointer of the s2 now points to the same memory where s1 points
    // 2.1 now we have a problem, since both variables point to the same memory,
    //     its a bug potential situation where releasing memory twice could lead to unexpected results,
    //     this is why here, s1 actually is "moved" which means its copied into s2 and then invalidated,
    //     so accessing s1 is simply invalid and compile error, and only s2 will be dropped after,
    //     it goes out of scope;
    //     Rust actually will never perform a deep copy by default on anything, so any copying,
    //     action in Rust should not be a performance issue (of course we talk about "=" and not
    //     methods like .Copy/DeepCopy which could implement some unique strategy for copy)
    let s2 = s1;

    // 1. here, drop is called on "s" itself to release memory from the heap from the,
    //    previous data it was allocated and allocates new data on the heap with new,
    //    stack data: pointer, length, capacity
    let mut s = String::from("hello");
    s = String::from("ahoy");
    println!("{s}, world!");

    // 1. but if you do want your data from the heap to be coppied into a new variable without,
    //    moving the original variable itself, you can use .clone() method, now,
    //    s4 will contain both stack data and heap data from the s3 but of course pointers,
    //    wont be the same, it will be a new object on the heap
    let s3 = String::from("hello");
    let s4 = s3.clone(); // deep copy performed
    println!("s3 = {s3}, s4 = {s4}");

    // 1. Rust also provides a Copy trait which means if some type implements this trait,
    //    then after copying it into anothe variable it will be trivially copied but not,
    //    moved, so it wont be invalidated and memory wont be released from it and it will,
    //    be valid for future use ("=" will act as a Copy trait)
    //
    // 2. types that implement Copy trait:
    //    1. any group of scalar values can implement Copy
    //    2. tuples if containing types that can implement Copy (so scalar)
    //
    //    you can check the docs for more
    //
    // 3. types that cannot implement Copy trait
    //    1. a resource
    //    2. requires allocation
    //    3. implement Drop trait

    // 1. passing a value to a function have similar mechanics as passing a value to a variable:
    //    passing a variable to a functioin will either move or copy the value
    let s = String::from("hello"); // s comes into scope
    takes_ownership(s); // s is moved into the function, not valid anymore in this scope

    let x = 5; // x comes into scope
    makes_copy(x); // x has value 5, its a scalar value, it implements Copy,
    // so x is not moved, its just copied into the function,
    // so you can use it later

    // 1. functioins can also move values back with when returning from it
    let s1 = gives_ownership(); // function moves its return value into s1
    let s2 = String::from("hello"); // s2 comes into scope
    let s3 = takes_and_gives_back(s2); // s2 is moved into the function then return value of the,
                                       // function is moved into s3

    // 1. for in loops take the ownership of data as well!! you would need a reference(borrow)
    //    the data to not lose data: for x in &data
}

fn takes_ownership(some_string: String) {
    println!("bye bye");
}

fn makes_copy(some_integer: i32) {
    println!("bye bye");
}

fn gives_ownership() -> String {
    let some_string = String::from("yours");
    some_string
}

fn takes_and_gives_back(a_string: String) -> String {
    a_string
}

// 1. ownership doesnt slow program execution, but does increase program compilation time
