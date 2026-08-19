fn main() {
    let number = 3;

    // 1. an if construction starts by "if" followed by a condition without ( )
    if number < 5 {
        println!("condition was true");
    // 2. you can have an else clause which executes when "if" clause fails
    } else {
        println!("condition was false");
    }

    // 1. condition must be of "bool" type or you will have an error, no implicit conversion,
    //    into bool will happen as with other languages
    // if number { // error
    //     println!("wont execute");
    // }

    // 1. you can have another if branches "else if condition"
    if number < 5 {
    } else if number == 7 {
    } else {
    }

    // 1. since "if" is an expression, we can use it to assign values to variables
    // 2. all values from if/else if/else must have same type or you will get an error
    let number = if number < 5 { 8 } else {88};
    // 3. "else if" is also allowed
    let number = if number < 5 {
        8
    } else if 2 < 10 {
        88
    } else {
        2
    };
    // above construction can be complex since you are allowed to have { } for "if", "else if" and "else"
}
