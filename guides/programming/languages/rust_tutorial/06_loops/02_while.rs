fn main() {
    // 1. a second type of loop is "while" loop which evaluates a condition and decides,
    //    wethear it executes its body or not
    // 2. you can also use break/continue inside a while loop to either break or skip to next iteration
    let mut number = 3;

    while number != 0 {
        println!("{number}!");

        number -= 1;
    }

    println!("LIFTOFF!!!");
}
