fn main() {
    // 1. tuple - a way to group a number of values with different data types or same into one,
    //            compound type. it has fixed length which is given during defintion
    let tup: (i32, f64, u8) = (500, 6.4, 1); // you can skip the types they will anyway be inferred
    // if compiler can of course

    // 1. since tup is bounded to whole tuple, we can get the value from it like this,
    //    destrcturing this tuple is done through an implicit pattern mathcing of "let" keyword
    let (x, y, z) = tup;

    println!("y");

    // 1. you can also access tuple vlaues through an index rather than name, but only
    //    for assiging a variable, in other places its not allowed
    let my_y = tup.1; // 6.4, f64

    // 1. actually know you can create multiple variable on the same line with help of tuple
    let (my_var, my_second_var): (u8, u8);
    // 2. or give them value as well
    let (my_var, my_second_var): (u8, u8) = (5, 5);

    // 1. an empty tuple without values has a special name - unit,
    //    its type and value are both written as () which represent an empty value/type,
    //    expression actually implicitly return a unit value if they dont return any value
    let no_type = println!("a"); // no_type == ()
    let no_type2: () = println!("a"); // same as above, println!("") returns nothign == ()
}

// this function returns a unit value - ()
fn foo() {
    println!("hello");
}
// same as above
fn foo2() -> () {
    println!("hello");
}
