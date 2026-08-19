// 1. vector - allows you to store values next to each other in memory
//             1. values must be of the same data type

fn main() {
    // 1. this is how you initialize a vector
    // 2. type is needed to be provided because on the right, we dont have data provided,
    //    so its an empty vector of nothing, it cannot be infered by the compiler, we must help it
    let v: Vec<i32> = Vec::new();

    // 1. rust provides a macro that let us give default values, skip the vector type and
    //    make compiler infer it;
    let v2 = vec![1, 2, 3, 4, 5]; // Vec<i32> implicit
    let v3 = vec![1, 2u8, 3]; // Vec<u8> implicit

    // 1. you can access vector elements in 2 ways: by index, by .get() method
    let third = &v2[2]; // third2: &i32 reference to third element inside vector (address in memory)
    //                             this is useful to borrow if data may be droped
    let third2 = v2[2]; // third2: i32, just copied into third2
    let third2 = v2.get(2); // third2: Option<&i32>, either there is value or not
    match third2 {
        Some(value) => println!("{value}"),
        None => println!("There is no value"),
    }

    // 1. accessing an items outside vector boundaries differ for both appraoch of accessing an item:
    // let if_not_available_crash_program = &v2[100]; // will crash(panic), our vector is not that long yet
    let return_None_if_not_available = v2.get(100); // either None or Some(&value)

    // 1. ownership and borrowing are applied on vectors as well, you cant have both mutable and
    //    immuable reference to the same resource active at the same time
    let mut v4 = vec![1, 2, 3, 4, 5];
    let first = &v4[0];
    // v4.push(6); // error, you took an immutable reference above for "first" and use it below
    //             but until usage of the immutable reference you try to change the resource
    println!("{first}"); // if you comment, above will surely work
    // why ? because vector may allocate new memory block in other location of RAM if its capacity
    // is surpassed which would require copying old data into new one, and the "first" variable
    // holding the "old" reference is not something we would want.

    // 1. iterating through a vector is simple
    for x in &v4 {
        println!("{x}");
    }
    // 2. you can iterate inside a mutable data as well
    for x in &mut v4 {
        // "*" here is dereferencing the memory address which x holds, so you are actaully
        // changing each value inside v4
        *x += 5;

        // actually, you cant modify the v4 itself inside the for loop since for loop itself
        // has a reference to the v4 which by the rules of data race you cant have both
        // a reading and writing reference.
    }

    // 1. there is 2 techniques to store inside a vector multiple data types, the first is enum:
    let generic_vec = vec![
        DiffVecType::Int32(5),
        DiffVecType::Text(String::from("abcd")),
        DiffVecType::Char('s'),
    ];
    for gen_vec_elem in &generic_vec {
        match gen_vec_elem {
            DiffVecType::Int32(nr) => println!("{nr}"),
            DiffVecType::Text(text) => println!("{text}"),
            DiffVecType::Char(chr) => println!("{chr}"),
        }
    }
    // 2. there is a problem with the enum variants and matching, what if you dont know
    //    if you will be exhausting all the variants or dont want to ?
    //
    //    if the above is true, then you will "object traits" discussed later
}

enum DiffVecType {
    Int32(i32),
    Text(String),
    Char(char),
}
