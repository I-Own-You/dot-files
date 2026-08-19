// 1. match - allows you to compare a value against a series of patters and execute code based,
//            on a matched pattern

// 2. patterns - can be literal values, variable names, wildcards, and many other things (discussed later)

// match power is that compiler(at compile time) confirms that all pattersn can be handled

// the way it works is it takes the value and matches agains every pattern until it finds the
// right pattern and passes the value into that code block where you can use

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
    Namings(String),
}

fn main() {

    // now, since we know how match pattern works and taht it works with enum variants,
    // we can handle the Option<T> values!
    let five = Some(5);
    let six = plus_one(five); // five has value, Some(i) matches and executes and returns
    let none = plus_one(None); // None doesnt have value, it matces None, None is returned
}

fn value_in_cents(coin: Coin) -> u8 {
    // how match works here:
    // 1. match takes as a value an expression, in our case its coin which is of type Coin,
    //    Coint itself is an enum which has 4 variants, these variants are the patterns we need,
    //    to match against (their values and type)
    // 2. next, we have the match arms(branches) we test against
    // 3. then we have the pattern we test against on the left (the value of the pattern)
    // 4. then we have the "=>" separator which seaparates the pattern and code to run on match
    // 5. then we have the code that will execute after a match is found
    //
    // tip: the checking is performed from top to bottom without skipping any
    // tip: you must handle all the patterns of coin type which is Coin, you cant skip any
    match coin {
        // as you see below, you could use { } for code block and skip the "," after } or you,
        // could skip { } but put "," after each branch, { } are useful if code block spans across lines
        Coin::Penny => {
            println!("hey its penny!");
            1
        }
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
        // here, as you see, Namings kind of Coin type actaully takes a String type which holds,
        // data, we cant just use Coin::Namings, so we add the value which Namings holds and put,
        // it inside (value) which we can then use in the code block after "=>", pretty convinient
        Coin::Namings(value) => {
            println!("{value}");
            0
        }
    }
}

fn handle_unwanted_matches(x: i32) {
    match x {
        3 => println!("{x}"),
        5 => println!("{x}"),
        // how do we catch all matches we could not with previous matches ?
        all_the_other_numbers => println!("{all_the_other_numbers}"),
        // handle all matches must be at the end since putting it first will ignore all below
    }
    
    match x {
        3 => println!("{x}"),
        5 => println!("{x}"),
        // what if you dont need to use the value but catch match and do nothing/something without it ?
        _ => println!("we do nothing"),
        // handle all matches must be at the end since putting it first will ignore all below
    }
    
    match x {
        3 => println!("{x}"),
        5 => println!("{x}"),
        // what if we dont want to do anything at all ?
        // _ cannot be used at rigth side to execute code, only on the left side
        _ => (),
        // handle all matches must be at the end since putting it first will ignore all below
    }
}

// now, since we know how match pattern works and taht it works with enum variants,
// we can handle the Option<T> values!
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

