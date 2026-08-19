// 1. passing ownership to a function and then back... kind of tedious no ?
//    what if i want just to pass the value, do something with it but not lose it,
//    without even returning it back from the function ? yep, a reference to the value.

// 1. reference - pointer where we can access the data on that address, but the data itself,
//                is owned by some other variable, how it differs from a poniter ?
//                it should always have a valid address and value through the lifetime of it

// 2. reference are immutable by default (you can uses mut on them)

// 3. act of creating a reference "&" is called: borrowing;
//    you take something which is not yours and when ready, you give it back

fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("The length of '{s1}' is {len}.");

    // 1. here is how you can have a mutable reference that you can change
    let mut s = String::from("hello");
    change(&mut s);

    // 1. you cannot have more than 1 active mutabe reference being used at the same time
    let s1 = &mut s; // okay
    let s2 = &mut s; // okay
    // println!("{s1}, {s2}"); // here, error wont happen, it will happen on the line where,
                               // let s2 = &mut s; but why ? you have 2 active mutable references,
                               // thats not the problem, the problem is that you use the first,
                               // reference at the same time with the second which creates a
                               // data race.
                               // 
                               // The most important thing to remember is that you can have more,
                               // than 1 mutable reference to the same value, but they must,
                               // not be active at the same time.

    // 1. you also cant have both immutable + mutable reference active at the same time
    let s3 = &s;
    let s4 = &mut s;
    // println!("{s3} {s4}"); // error

    // 1. but you can have infinite amount of immutable references only
    let s5 = &s;
    let s6 = &s;
    println!("{s5} {s6}"); // no error

    // 1. here you wont have problems because first 2 references are read only, the data,
    //    wont suddenly change
    let s7 = &s;
    let s8 = &s;
    println!("{s7} {s8}");
    let s9 = &mut s;
    println!("{s9}");
}

// 1. you basically refere to the original value without taking ownership of it,
//    parameter s here will contain the reference (a pointer actually) wich points
//    to the original poiner of the s1 argument passed into the function in "main"
fn calculate_length(s: &String) -> usize {
    s.len()
    // s actually goes out of scope as a variable inside this functions but the actaul,
    // value on the heap stays there without being dropped because we dont have the ownership
    //
    // we also dont need to return s because the ownership is not taken so no "move" is performed

    // you cannot modify something you dont own
    // s.push_str(string); // error
}

// 1. function taking a mutable reference which you can change
fn change(some_string: &mut String) {
    some_string.push_str(", world");
}

// 1. Rust guarantees there cant be any dangling pointers
fn dangle() -> &String { // error, we try to return something that will be dropped

    let s = String::from("hello"); // s is a new String

    &s // we return a reference to the String, s
} // s goes out of scope and is dropped, so its memory goes away.




// data race:
//     1. two or more pointers access the same data at the same time.
//     2. at least one of the pointers is being used to write to the data.
//     3. theres no mechanism being used to synchronize access to the data.
