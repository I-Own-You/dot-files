fn main() {
    // 1. varibles in rust are immutable by default, you create them with "let"
    let x = 5;
    println!("{x}");
    x = 6; // error, x is not mutable

    // 1. rust doesnt allow an unitialized variable without a type
    let no_value_and_type; // error
    // 2. you can give it a type and it wont be an error
    let no_value: i32;
    // 3. but if you try to use an unitialized variable, is an error
    println!("{no_value}"); // error
    // 4. but if you give it a value, its ok
    no_value = 5;
    println!("{no_value}");
    
}
