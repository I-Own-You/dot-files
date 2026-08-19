// 1. test - rust functions that test other non-test functions which should work in expected way

// 2. usually you will setup your data, run the code on that data, assert for the expected result

// 3. usually tests are defind inside a seaprate module dedicated for test for specific crate or for
//    all crates inside the package, or even inside a separate package dedicated to tests since they
//    dont need main() function
// 3.1 you will run tests with the command: "cargo test" there are other options and new arguemnts
//   to this command which can fileter names of functioin to tests, .etc

// 4. rust also has benchmark tests, consult the docs for them since they are not out yet

// 5. rust also has documentation for tests but writing docs for rust code will be discussed later

// 6. tests in rust are run in different threads

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

pub fn ret_2() -> i32 {
    2
}

pub fn greeting(name: &str) -> String {
    format!("Hello {name}!")
}

pub fn greeting2(name: &str) -> String {
    String::from("Hello!")
}

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}

struct Guess {
    value: i32,
}

impl Guess {
    fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
    fn new2(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be between 1 and 100, got {value}.");
        }

        Guess { value }
    }
    fn new3(value: i32) -> Guess {
        if value < 1 {
            panic!("Guess value must be greater than or equal to 1, got {value}.");
        } else if value > 100 {
            panic!("Guess value must be less than or equal to 100, got {value}.");
        }

        Guess { value }
    }
}

// #[cfd(test)] means rust will compile into a binary of test only when you run "cargo test" and
//              wont include any test information when you do "cargo build/run /--release"
#[cfg(test)]
mod tests {
    // notice that since we are in a module, we dont see what is outside of it, so import it with
    // glob pattern using "super" which means go 1 level up
    use super::*;

    // this attiribute is needed so that rust knows it should run this function as test since you
    // can have multiple functions inside this "tests" mod which can be helpers and are not designed
    // to be runnable as tests
    #[test]
    fn exploration() {
        let result = add(2, 2);
        // assert_eq! macro basically tests if inside ( ) 2 values are equal with "=="
        assert_eq!(result, 4);
    }

    #[test]
    fn another() {
        // this will fail all the time since it panics
        // panic!("Make this test fail");
    }

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        // assert! macro checks so taht inside ( ) the type is bool and the value is true
        assert!(larger.can_hold(&smaller));
    }

    #[test]
    fn smaller_cannot_hold_larger() {
        let larger = Rectangle {
            width: 8,
            height: 7,
        };
        let smaller = Rectangle {
            width: 5,
            height: 1,
        };

        // notice, in this function we alter the return value, since it this case it will return
        // false, this smeans we do !false and obtain true, for assert! true means success, so it passed
        //
        // if we alter the logic of .can_hold() so that it returns true, !true will become false, not passed
        assert!(!smaller.can_hold(&larger));
    }

    #[test]
    fn check_if_2_nr_differ() {
        let my_nr = 3;
        // assert_ne! checks if 2 values differ using "!="
        assert_ne!(my_nr, ret_2());
    }

    // this test is well written, but what if we want a custom error message when it fails ?
    #[test]
    fn greeting_contains_name() {
        let result = greeting("Carol");
        assert!(result.contains("Carol"));
    }
    // to achieve a custom error message we can pass a string after all assert arguments, that
    // string is passed into format! macro which will be printed when it fails in cli
    #[test]
    fn greeting_contains_name2() {
        let result = greeting2("Carol");
        assert!(
            result.contains("Carol"),
            // here goes our custom error message
            "Greeting did not contain name, value was `{result}`"
        );
    }

    // what about a test that knowss it should panic ?
    #[test]
    #[should_panic] // this means that this function should always panic, it must be after #[test]
    fn greater_than_100() {
        Guess::new(200);
    }
    // there is a drawback when it comes to panics, if it panics because of different things, how to
    // understand which one caused it ?
    #[test]
    #[should_panic]
    fn greater_than_100_2() {
        // in ::new2() version, it doesnt check if its above 200, but it will panic anyway since we
        // have #[should_panic] attribute, and also know that 200 is wrong and should panic, but the
        // panic wont be with the right message since we dont handle > 100 anymore, what can we do?
        Guess::new2(200);
    }
    // we can actually be more specific and let a panic know what panic its tied to
    #[test]
    // "expected" here is a parameter which takes a "substring" which will be included in some panic
    // message we provided, but we could actually provide the whole message which is a better
    // approach since you dont need to make errors when typing a substring.
    //
    // what will happen if a panic will occur, but the "expected" message will not match it ?
    // the panic message will be shown and below the test will explicitly point that our "expected"
    // message did not occur which means we clearly have a logic error or missmatch "expected" string
    #[should_panic(expected = "less than or equal to 100")]
    fn greater_than_100_3() {
        Guess::new(200);
    }

    // we can also use Result<T, E> enum to write tests
    #[test]
    fn it_works() -> Result<(), String> {
        let result = add(2, 2);

        // we basically implement our assert_eq! macro, this is kind of flexible for custom logic
        // and also allows us to use "?" shortcut
        //
        // 1. you cannot use #[should_panic] on tests which use Result<T, E>
        // 2. to return Err for a failed test do not use "?" on the Result<T, E> value but instead
        //    you can use assert!(value.is_err()) and not value?
        if result == 4 {
            // invoke Ok(()) if it passed
            Ok(())
        } else {
            // invoke Err(message) if it failed
            Err(String::from("two plus two does not equal four"))
        }
    }

    // during "cargo test", any function annotated with #[ignore] will not be executed, this is
    // useful if you dont need to execute it since it could be too large or whatever
    #[test]
    #[ignore]
    fn this_will_be_ignored() {
        println!("nothing");
    }

    // asser_eq! and assert_ne! use debug information to print info about the value inside which are
    // being tested, this means those values must implement "PartialEq" and "Debug" traits.
    //
    // for structs and enums defined yourself, you will need to implement "PartialEq" for equality
    // assertion an "Debug" when assertion fails and data value is needed for printing
    //
    // but since both traits are derivable you can just add #[derive(PartialEq, Debug)] annotation
    // above structs and enums and youre done.
}

fn main() {}
