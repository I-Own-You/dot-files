// 1. the most easy smart pointer is a "box" whose type is "Box<T>".

// 2.  boxes allow you to store data on the heap instead of the stack
// 2.1 on the stack remains the pointer which points to the data on the heap

// 3. boxes dont have performance overhead beside the fact that they store data on the heap instead of stack
// 3.1 you will mostly use boxes in this cases:
//      1. a type which size cant be known at compile time but you want to use a value of that type
//         and the context requires an exact size for the value
//      2. when you have a large amount of data and you want to transfer ownership but you dont want
//         to copy data
//      3. when you want to own a value, and you only care that its a type that implements some
//         trait rather than beign of a specific type

use crate::List::{Cons, Nil};
use crate::List2::{Cons as Cons2, Nil as Nil2};

fn main() {
    // 1. b is a pointer which points to data on the heap which has value "5"
    let b = Box::new(5);
    // 2. b itself is accessed as it woul be on the stack
    println!("b = {b}");
    // 3. here, both Box(pointer on the stack) and data on the heap will be deallocated

    // 1. won work, the size is unknown, you could do this infininte amount of times,
    //    compiler has no way to know how much into recursion you will go.
    let list = Cons(1, Cons(2, Cons(3, Nil)));
    // 2. but if you place data on the heap and have a pointer to it, compiler sees the pointer,
    //    on the stack and he is happy something is of known size at compile time.
    //
    //    now, Cons2 know its size, it needs a single i32 + the Box::new() pointer size
    let list2 = Cons2(1, Box::new(Cons2(2, Box::new(Cons2(3, Box::new(Nil2))))));
}

// 1. a recursive implementation literally denotes the fact that we need data but we dont know on
//    compile time how much to allocate since it could be nothing or a lot.
//
// 2. when it comes to enums, the space for a value of an enum is constructed by a rule:
//      1. the largest variant type in bytes no matter which variant is used right now,
//         this means, you could use a i32 with value 0, it would require you 1 byte for enum,
//         variant, but it would be the variant for example StringVariant(String) which holds,
//         24 bytes.
//
enum List {
    Cons(i32, List),
    Nil,
}
// 3. since above doesnt work on stack which require a known size on compile time, we should,
//    inform it we will have the List on the heap instead.
enum List2 {
    Cons(i32, Box<List2>),
    Nil,
}
