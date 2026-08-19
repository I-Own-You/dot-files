fn main() {
    let x = 5;

    // 1. you can shadow a varible in the same scope by a redefiniton of it
    let x = x + 1;

    {
        // 1. this x variable is shadowing the the second x as swell which shadows the first x,
        //    but of course this is another scope and doesnt really matter what is happening outside
        let x = x * 2;
        println!("The value of x in the inner scope is: {x}");
    }

    println!("The value of x is: {x}");
}

// 1. shadowing is not the same as having a mutable variable, a mutable variable can be change,
//    during execution of the program while shadowing creates a new variable which could also have,
//    a different type or value, its more powerful but restricted to further changes
