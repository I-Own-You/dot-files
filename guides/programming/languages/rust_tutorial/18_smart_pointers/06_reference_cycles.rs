// 1. even though rust is considered memory safe, we still can leak memory.

// 2. its easy to crate memory leaks when references dependo on each other and the counting of the
//    reference will never exhaus, using Rc<T> and RefCell<T> especially.

use crate::List::{Cons, Nil};
use std::cell::RefCell;
use std::rc::{Rc, Weak};

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}

fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        // 1. problem occurs here, but it wont trigger compile error yet
        //
        // whats the problem ? you create a pointer to "b" and assign it to pointer inside "a"
        // where the list was Nil, but "b" earlier created a pointer to "a" and assigned it as
        // for the List, its now a recursive lookup
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // 2. this line will trigger error because you will try to print and "Debug" trait will try to
    //    print List within a.tail() which is "b" you assigned earlier but "b" assigned a pointer of
    //    "a" as the List and "a" itself is List which has a List assigned as "b", and recursive...
    // println!("a next item = {:?}", a.tail());

    // 1. Rc::clone increase the strong count of Rc<T> and when strong count is 0, its droped.
    // 2. but you also can create "weak reference" to the value within Rc<T> instance by calling
    //    Rc::downgrade and passing a reference to Rc<T>
    //
    // 3. strong references is about sharing ownership over some Rc<T> data.
    // 4. weak reference dont express an ownership relationship, and its count doesnt affect when an
    //    instance of Rc<T> instance is cleaned up.
    //
    // 5. when you call Rc::downgrade, you get a smart pointer of type Weak<T>, and instead of
    //    increasin the strong count, it increases the weak count by 1, and this count is tracked
    //    by the Rc<T> as well, the difference is weak count doesnt have to be 0 for data to be dropped
    //
    //    for the Weak<T> value to be references and used, it must exist, so calling .upgrade() by
    //    an instance of Weak<T> returns an Option<Rc<T>> so, either Some() or None which means the
    //    value is still there or its already dropped.
    //
    //    strong counts let Rc<T> live, weak counts let whole Rc<T> block live even if Rc<T> data is dropped,
    //
    let leaf = Rc::new(Node {
        value: 3,
        children: RefCell::new(vec![]),
    });

    let branch = Rc::new(Node {
        value: 5,
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
    // we have a problem, we can access leaf from branch but not branch from leaf but we want to,
    // here is how we would do the relationship
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}

#[derive(Debug)]
struct Node {
    value: i32,
    children: RefCell<Vec<Rc<Node>>>,
    // by adding this field, we say:
    //      1. children can refer to parent without keeping parent alive
    //      2. parent can own children through Rc without creating an Rc cycle
    //
    // so, Node should be able to access its parent but it will not own its parent
    parent: RefCell<Weak<Node>>,
}

// you will basically use weak refs:
//      1. if you dont want ownership.
//      2. if you dont need counts to affect Rc<T> data.
