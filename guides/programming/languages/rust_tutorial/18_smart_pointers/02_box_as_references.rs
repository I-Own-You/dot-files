fn main() {
    // 1. "*" is dereferencing which means accessin value through a pointer which points to some
    //    data on the heap.
    let x = 5;
    let y = &x;
    // 2. you dont even have to put "*" in fron of "y" when not assigning
    println!("{y}");
    // 2. Box<T> in this case works the same with 1 major difference:
    //      1. y now holds the "copied" value of "x" and allocates data on the heap
    //      2. you can change "y" through "*" but it wont reflect onto "x" since they are not
    //         bound anymore.
    let x = 5;
    let y = Box::new(x);
    println!("{y}");

    // 1. lets use the custom Box implementation
    let x = 5;
    let y = MyBox::new(x);
    // 2. we cant use "*" since we need to implement "Deref" on MyBox<T>;
    // *y = 5;
    // 3. since we defined "Deref" on MyBox, we now can use "*"
    let c = *y;
    //
    // 4. actually, under the hood, rust does *(y.deref()), why with "*" in front ?
    //    because y.deref() itself returns a reference, *(y.deref()) the value itself,
    //    for simple types it doesnt matter or when you use the "y" itself without moving it
    let str = MyBox::new(String::from("a"));
    println!("{}", *str.deref());
    // 4.1 its ok, a reference is returned
    let str_move = str.deref();
    // 4.2 not ok, we try to dereference the reference and access the original value and assign to
    //   another variable which mean moving ownership from str value.
    // let str_move = *str.deref();

    // 1. "Deref coercion" in action
    let text = MyBox::new(String::from("hello"));
    // 2. "&" here is actually the call of text::deref(), its like a sintactic sugar so we dont type
    //    hello(&(*text)[..]) where (*text) access the &MyBox<String> data which is String,
    //    then &data[..] so, a string slice.
    //
    //    .deref() is called as much as needed to access the data needed and the number of times it
    //    needs to call is counted at compile time, so no overhead at runtime.
    hello(&text);
}

// 1. here is an implementation of std Box<T> but it doesnt store data on the heap, for the purpose
//    of the example
struct MyBox<T>(T);
//
impl<T> MyBox<T> {
    fn new(x: T) -> MyBox<T> {
        MyBox(x)
    }
}
//
// 2. now, lets implement "Deref", its provided by the std
//
//    without "Deref", compiler can only dereference references aka: "&"
use std::ops::Deref;
//
impl<T> Deref for MyBox<T> {
    // 1. this is an "associative type" for the "Deref" trait to use
    // 2. "associative type" is another way to define a generic parameter (discussed later)
    type Target = T;

    // it requires us to implement "deref" method, it borrows "self" and returns a reference
    // to the inner data.
    fn deref(&self) -> &Self::Target {
        // we return the first element of the tuple struct of MyBox<T> which is the data
        // it holds.
        &self.0
    }
}

fn hello(text: &str) {
    println!("{text}");
}

// 1. "Deref coercion" converts a reference to a type that implements "Deref", into a reference of another type
//
//    example: &String -> &str because String implements "Deref" whih returns &str

// 2. "Deref coercion" is applied autoamtically to arguments of function/method, it was added so
//    that calling function/methods wont need a lot of "*" and "&"

// 3. "Deref coercion" can work with either smart pointer or references

// 4. rust also provides "DerefMut" trait to override "*" on mutable references

// 5. rust does "deref coercion" in 3 cases:
//      1. &T to &U when T: Deref<Target=U>
//      2. &mut T to &mut U when T: DerefMut<Target = U>
//      3. &mut T to &U when T: Deref<Target = U>
