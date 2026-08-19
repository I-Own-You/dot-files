// 1. Rc<T> type keeps track of the number of references to a value to determine if the value,
//    is still in use, if its 0, it can be cleaned up.

// 2. Rc<T> is used when we need data on the heap for multiple parts of our program to read and when
//    dont know which part of the program will be the last to read, at compile time.

// 3. Rc<T> is only for single-threaded programs, for multi-threaded programs there are other
//    techniques discussed later.

use crate::List::{Cons, Nil};

enum List {
    Cons(i32, Box<List>),
    Nil,
}

use crate::List2::{Cons as Cons2, Nil as Nil2};
use std::rc::Rc;

enum List2 {
    // instead of Box<> we have Rc<>
    Cons(i32, Rc<List2>),
    Nil,
}

fn main() {
    let a = Cons(5, Box::new(Cons(10, Box::new(Nil))));
    let b = Cons(3, Box::new(a));
    // 1. error, a is moved above, we cannot own same data twice
    // let c = Cons(4, Box::new(a));

    // 1. now with Rc<T>
    //
    //    what we basically do here is creating the initial Rc pointer, then we create another
    //    pointer for the same data and give it back and increase the reference
    //
    //    reference count is incrementd by 1 here, now its 1 for "a"
    let a = Rc::new(Cons2(5, Rc::new(Cons2(10, Rc::new(Nil2)))));
    // 2. a, b, c now share ownership inside "a"
    //
    //    a.clone() can be called isntead Rc::clone(&a), but convention says in our case we must
    //    call Rc::clone
    //
    // 2.1 reference count is incremented by 1 here, now its 2
    let b = Cons2(3, Rc::clone(&a));
    // 3. reference count is incremented by 1 here, now its 3
    let c = Cons2(4, Rc::clone(&a));
    // each copy of Rc, is not copying the entire data on the heap, its only increasing the
    // reference count, so it should not be an runtime overhead.

    // 4. you Rc has a lot of methods, you can print how many references you have, .etc
    //
    //    its called strong and not count because there are weak references as well, discussed later
    Rc::strong_count(&a);
}
