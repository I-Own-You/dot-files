// 1. closure - anonymous functions you can:
//      1. save in a variable
//      2. pass as argument to other functions

// 2. you can crate a closure in 1 place and then call it in different place to evaluate different
//    context

// 3. closures can capture value within its scope (where they are defined) which functions cant do

// 4. closures most of the time dont require you to annotate types of parameters or the return type;
//    this works because most of the time closures are stored inside variablese and tossed around;
//    because closures are usually small and inside a context, types are inferred most of the time;

use std::{thread, time::Duration};

#[derive(Debug, PartialEq, Copy, Clone)]
enum ShirtColor {
    Red,
    Blue,
}

struct Inventory {
    shirts: Vec<ShirtColor>,
}

impl Inventory {
    fn giveaway(&self, user_preference: Option<ShirtColor>) -> ShirtColor {
        // .unwrap_or_else() takes a sinle argument wich is a closure, it works by checking the
        // "user_preference" Option<T> values, and if there is a value "Some<T>" it will unwrap an
        // return it, but if theres not, it calls the argument, in our case the closure;
        //
        // in our case, the closure has no parameters "||", if it would have parameters, it would be
        // between "|here|", then, after the "||" goes the closure body, in our case it just calls
        // the self.most_stocked() method, it can also be inside { } if you need more code
        //
        // the point of clossure here, is that you pass a function to be executed at some point but
        // not right now, unwrap_or_else() will execute the closure only if user_preference doesnt
        // have a value, but if it has, closure will never be executed.
        //
        // another benefit of the closure is that it knows about "self" the type itself it workss on
        // right now, it actaully "captures an immutable reference to current self Inventor instance",
        // and passes it to the closure.
        user_preference.unwrap_or_else(|| self.most_stocked())
    }

    fn most_stocked(&self) -> ShirtColor {
        let mut num_red = 0;
        let mut num_blue = 0;

        for color in &self.shirts {
            match color {
                ShirtColor::Red => num_red += 1,
                ShirtColor::Blue => num_blue += 1,
            }
        }
        if num_red > num_blue {
            ShirtColor::Red
        } else {
            ShirtColor::Blue
        }
    }
}

fn main() {
    let store = Inventory {
        shirts: vec![ShirtColor::Blue, ShirtColor::Red, ShirtColor::Blue],
    };

    let user_pref1 = Some(ShirtColor::Red);
    let giveaway1 = store.giveaway(user_pref1);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref1, giveaway1
    );

    let user_pref2 = None;
    let giveaway2 = store.giveaway(user_pref2);
    println!(
        "The user with preference {:?} gets {:?}",
        user_pref2, giveaway2
    );

    // 1. even though you dont need most of the time, you can annotate paramteres and return types
    let expensive_closure = |num: u32| -> u32 {
        println!("calculating slowly...");
        thread::sleep(Duration::from_secs(2));
        num
    };

    // 1. remember, you can skip type annotations only if a closure can infer its type, in our case
    //    rust doesnt even understand where he could take the context from;
    let add_one_v1 = |x| x + 1;
    // 2.1 but if you try to uncomment below closure calls, now, it can infer that its clearly i32
    // add_one_v1(5);

    // 1. compiler gets a type for each parameter and return type for the first call and ignores
    //    others, which means if you call a closure with some type and then with the other, on the
    //    second call you will get an error
    let example_closure = |x| x;
    let s = example_closure(String::from("hello")); // example_closure: impl Fn(String) -> String
    // let n = example_closure(5); // error, we try Fn(i32) -> i32, but its already Fn(String) -> String

    // 1. closures can capture values from their environment in 3 ways:
    //     1. borrowing immutability
    //     2. borrowing mutability
    //     3. taking ownership
    //
    //     closure itself decides which one to take based on what it does with the value in the body
    //
    // 1. borrowing immutable reference:
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");
    // its immutable reference since to print values you only need to read them
    let only_borrows = || println!("From closure: {list:?}");
    println!("Before calling closure: {list:?}");
    only_borrows();
    println!("After calling closure: {list:?}");
    //
    // 2. borrowing mutable reference
    let mut list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");
    // its mutabl reference since to change data we need it to be mutable, the variable holding the
    // closure itself must be mutable
    let mut borrows_mutably = || list.push(7);
    borrows_mutably();
    println!("After calling closure: {list:?}");
    //
    // 3. taking ownership
    let list = vec![1, 2, 3];
    println!("Before defining closure: {list:?}");
    // its moved sine we used "move" in front of the ||, the data is no longer ours;
    //
    // its usually useful to move data when you work with threads and you pass data inside
    // a new thread and you no longer need the data to be in the current thread and its also
    // enforced by the compiler actaully when working with threads since you dont want your data to
    // be gone in current thread and ending up with dangling reference in other thread
    //
    // "move" keyword here, is an explicit way of moving data, we still can move data inside the
    // closure body like let closure_var = data; and thats it, "data" is moved and droped
    let list = vec![1, 2, 3];
    thread::spawn(move || println!("From thread: {list:?}"))
        .join()
        .unwrap();

    // 1. closures automatically implemented any of these 3 traits depending on how closure body
    //    handles the value: ( FnOnce(), FnMut(), Fn() )
    //
    // RULES:
    //
    //      1. "FnOnce()" applies to closures that can be called once, all closures implement it since
    //         all closures can be called at least once. If a closure moves a value, it implements
    //         only FnOnce trait, since its called only once.
    //
    //      2. "FnMut()" applies to closures that dont move captured values within their body but
    //         could mutate the captures values. These closures can be called more than once.
    //
    //         IMPORTANT: "captured values" are anything inside | | and closure body, and some data
    //                    could be from environment but not inside | |, and its "captured as well".
    //
    //      3. "Fn()" applies to closures that dont "move", dont "mutate" captured values and also
    //         closures that capture nothing from their environment. These closures usually can be
    //         called multiple times without "mutating" their environment which is benefit for conccurency
    //

    // tip: compiler automatically assigns "Fn()" traits to simple functions if its possible, which
    //      means we could pass function names where closures are needed, but only of "Fn()" traits
}
