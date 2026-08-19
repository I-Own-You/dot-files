// 1. std is a standard library
// 2. io is an input/ouput library from the std
// 3. by default, rust already imports(prelude phase) some functionality from std in every program,
//    to find out what exaclty, you need to check the docs for std ,
//    this is why you import "io", its not in the default imported things from std
use std::io;

// Ordering is an enum with 3 variations: Less, Equal, Greater
use std::cmp::Ordering;

// Rng is a trait which defines methods that random nubmer generators implement
use rand::Rng;

// 1. fn - declares a function
// 2. () - means the function takes no parameters
fn main() {

    // 1. loop creates an infinite loop, so be aware about a way out
    loop {
        println!("Guess the number!");

        // 1. thread_rng() is a function that gives a random number generator which in our case is local,
        //    to the current thread of execution and is seeded by the OS
        // 2. gen_range() is defined by the rand::Rng trait, it takes a range and generate a number within,
        //    that range based on a number generator previously given with rand::thread_rng(),
        //    the 1..=100 means between 1 and 100 both "inclusive"
        // 3. type of the secret_number is actually infered (rust can do that ), for numbers,
        //    it defaults to i32 if the gen_range() doesnst specify the return type or the variable itself,
        //    doesnt have a type like: let secret_number: u32
        let secret_number = rand::thread_rng().gen_range(1..=100);

        println!("The secret number is: {secret_number}");

        println!("Please input your guess.");

        // 1. "let" is used to define a variable
        // 2. "mut" is used to define a variable as mutable since all variables without "mut",
        //    are immutable by default in rust
        // 3. ::new() is a function which returns an instance of String
        // 4. :: before "new" means "new" is associated(implemmeted on a type) function of the String type,
        //    in our case ::new() creates an empty string
        // 5. String - type provided by std which can grow and is a utf8 encoded bit of text
        let mut guess = String::new();

        // 1. io is an input/output library imported from the std
        // 2. you can still access stdin by std::io::stdin
        // 3. stdin returns an instance of std::io::Stdin (a type which represetns a handle to the
        //                                                 standard input stream)
        // 4. .read_line is a method on the standard input stream of the std::io::Stdin instance,
        //    &mut guess is the variable we pass which will store the user input (without overwriting,
        //    what was alread inside our variable), the variable must be mutable as well
        // 5. & near "mut" means you pass a reference, a way to access data without copying it,
        //    1. you cant have "mut &guess" since reference of "guess" is immutable even if,
        //       guess itself as a variable is mutable
        //    2. if you pass a reference, it must be mutable, if you want to change values through it
        //    3. if the variable is immutable you cant have a mutable reference
        // 6. .readd_line itself returns a "Result" value, a "Result" is an "enumeration" often called enum,
        //    which itself is a type that can be in multiple states, those states are called "variants";
        //    1. Result variants are Ok and Err
        //        1. Ok indicates the operation was successful and contains the generated value
        //        2. Err indicates the operation failed and contains about how/why the operatioin failed
        //    2. values of a Result type have methods on them, one of them is ".expect":
        //        1. calling .expect on Err will crash the program and display the message you provided
        //           insside it
        //        2. calling .expect on Ok will return the value Ok holds so you can use it
        //
        //        you should always call .expect on a Result type which means you are doing an
        //        error handling unles you want your program crashed intentionaly
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        // 1. you create a new variable guess but there is already a variable called "guess" in our,
        //    scope ? right, you can shadow the previous variable names in the same scope, it helps,
        //    a lot not think about new variable names, its mostly used for converting stuff
        // 2. guess.trim().parse() here:
        //    1. guess is the previous variable containing the user input,
        //    2. .trim() removes any whitespace at the beggining and at the end
        //    3. .parse() parses a string into a numeric type which must be given on a variable
        //       because there are multiple numeric types, in our casess "u32",
        //       the string parsed must contain a real number that can be processed,
        //       an emoji or letters obviously cant be parsed.
        //    3.1 .parse() returns a Result which gives as the ability to either crash or get the value
        // let guess: u32 = guess.trim().parse().expect("Please type a number");
        // 3. here is another version that doesnt crash the program if input is not a number,
        //    we basically go to the beggining of loop again
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue, // _ actually here means it will catch any errors, why its important ?
                                // because intead of _ you could have an actual error type
        };

        // 1. { } inside a string is a placeholder where you can evaluate an expression,
        //    in our case the variable "guess"
        println!("You guessed: {guess}");

        // 1. .cmp method compares 2 values, you can call .cmp on anything that is comparable:
        //    1. it always takes a reference
        //    2. returns a variant of Ordering enum
        // 2. match is an expression which decides based on the variant obtained from the .cmp method:
        //    1. match consists of arms(i will call it branches) patterns witch you match agains with the,
        //       value you give to match, in our case the result of guess.cmp, checking from top to bottom
        // 3. secret_number type actually will not be i32 as when the variable was defined, why ?
        //    because the guess type is u32, you cant compare 2 distinct types, so i32 gets promoted,
        //    to a higher type so they both can be compared and no one would lose precision
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break;
            },
        }
    }

    // 1. there is another style of this { } where you put your expression one by one separated with commas
    // println!("Hi, i am {}, i am {} years old.", "Anna", 18);
}
