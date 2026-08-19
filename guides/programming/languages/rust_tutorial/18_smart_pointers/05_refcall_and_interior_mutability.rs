// 1. interior mutability - pattern that allows to mutate data even when there are immutable
//    references to that data (which is not allowed usually).
//
//    to do this, rust uses "unsafe" code which means we no longer rely on compiler safety

// 2. we can use types that use inerior mutability only when only if we can ensure that borrowing
//    rules will be followed at runtime without compiler guaranteeing that.
// 2.1 "unsafe" itself is wrappen in a safe api and outside "unsafe", type is still immutable

// 3. RefCell<T> represents single ownership over data
// 3.1 how RefCel<T> differ from Rc<T> and Box<T> ?
//     rules state that:
//          1. at any given time, you either have 1 mutable reference or any amount immutable
//             references but not both
//          2. references must be valid
//
//     1. these rules are encforced at "compile" time for Box<T> and Rc<T>
//     2. for RefCell<T>, these rules apply only at "runtime"
//     3. breaking these rules at:
//          1."compile time" gets you compile errors
//          2. "runtime" gets you panic and exit of the program
//
//  RefCell<T> is used when you know your code follows the borrow rules but compiler is unable to
//  tell if you are right or not.

// 4. RefCell<T> is used only in single-threaded programs, otherwise compile errors you will get

// 5. by using RefCell<T> you will have a small penalty time in runtime performance since now you will
//    have to keep track of the borrows at runtime rather than at compile time

use std::{cell::RefCell, rc::Rc};

struct Data {
    text: RefCell<String>,
}

impl Data {
    fn push_new_data(&self, new_text: &str) {
        // 1. this would not be allowed, &self if immutable, but we dont want to make it mutable,
        //    since we dont know the who and when would use it
        // self.text.push_str("a");
        //
        // 2. we can actually borrow a mutable reference only for this place by using .borrow_mut() on
        //    the data we need to mutate.
        //
        self.text.borrow_mut().push_str("a");
    }
}

struct RcAndRefCell {
    text: String,
}

fn main() {
    let data1 = Data {
        text: RefCell::new(String::from("a")),
    };

    // 1. invoke the method which borrows there the mutable ref nad does its thing
    data1.push_new_data("a");
    //
    // 2. we cant access data just by "data1.text", since since "text" is RefCell<String>,
    // println!("{}", data1.text); // error
    //
    // 3. we must get the immutable reference for data with ".borrow()"
    println!("{}", data1.text.borrow());

    // 1. reference rules apply for RefCell<T> too, remember ? but just on runtime, lets break the
    //    rules and see compiler getting an error
    let first_mutable_borrow = data1.text.borrow_mut();
    // 2. on this line, we will have an error for breaking the rule for having more than 1 mutable
    //    reference at a time.
    // let second_mutable_borrow = data1.text.borrow_mut(); // error

    // 1. we can combine Rc<T> and RefCell<T> to have multiple ownership over a data which can be
    //    mutated since Rc<T> cannot mutate data because it would break the rule for single mutable reference
    let value = Rc::new(RefCell::new(RcAndRefCell {
        text: String::from("a"),
    }));
    let second_owner = Rc::clone(&value);
    let third_owner = Rc::clone(&value);
    value.borrow_mut().text.push_str("b");
    println!(
        "{}, {}",
        second_owner.borrow().text,
        third_owner.borrow().text
    );
}

//    .borrow_mut() itself returns an RefMut<T> which is a smart pointer
//    .borrow() itself returns an Ref<T> which is a smart pointer
//
//     1. they both implement Deref, so they can be used as references
//     2. RefCell<T> keeps track of references of how many Ref<T> and RefMut<T> smart pointers are
//        currently in use, .borrow() increases Ref<T>, .borrow_mut() increases RefMut<T>,
//        going out of scope decreases either Ref<T> or RefMut<T>
