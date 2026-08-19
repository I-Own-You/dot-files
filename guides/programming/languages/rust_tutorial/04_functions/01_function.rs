fn main() {
    // 1. this is how you call a function
    my_func();

    // 1. here is how you call a function and give it an argument
    func_with_param(5);
    func_with_params(7, '$');

    let x = five();
    println!("Your number is: {x}");

    let tuple_of_nrs = (1, 2, 3);
    let result = take_tuple(tuple_of_nrs);

    // 1. you can assign functions to variables and use them as functions later
    let my_func_var = my_func;
    // you can even pass functions into functions as parameters
    
    // 1. yes, you can call functions that are below the "main" function, the important
    //    part is that "main" should see the function(it must be in "main" scope)
}

// 1. this is how you define a function
fn my_func() {
    println!("hey!");
}

// 1. funcitonss can have parameters(you cant omit the type of a parameter)
fn func_with_param(nr: i32) {
    println!("Your number isss {nr}");
}

// 1. functions can have multiple paramteres
fn func_with_params(nr: i32, label: char) {
    println!("Your number is {nr}, label for it is {label}");
}

// 1. since rust is an expression language, it strongly differs from other languages,
//    let y = 6; is not a statement, 6 itself is, let y = is not, "let" is a statement,
//    an expression means there is an evaluation and a result after it: function calls,
//    block scope with { }, macro calling are expressions for example.
//
//    why this matters ? expressions dont have ";" at the end of the line, but if you put one,
//    you make it a statement from an expression if it was an expression in the first place.
//
//    you can return from a function a value as the final expression within a function,
//    but you also can return earlier with "return" keyword
fn five() -> i32 { // return type is mandatory if you return from a function which you assign as:
                   // fn func_name(params) -> type
    // this line is an expression: no ";" at the end and is as swell a final expression
    5
}

// 1. now you should really know whats the return type of a function is: unit type ()
fn ret_none() {
    
}

// 1. this is how you can take a tuple as a paramter
fn take_tuple(my_tuple: (i32, i32, i32)) -> i32 {
    my_tuple.0 + my_tuple.1
}

// 1. you can have functions inside functions
fn hey() {
    fn key2() {
        
    }
}
