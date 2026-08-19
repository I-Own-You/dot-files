// 1. the second approach for error resolving is to know about the error but not stopping the
//    program but instead warn abuout it or just do something about it and continue the exectuion

// 2. Rust has Result enum with 2 variants:
//       enum Result<T, E> {
//           Ok(T),
//           Err(E),
//       }
// 2.1 T is the type for the value return in case of no errors inside Ok()
// 2.2 E is the type of the error which will be return in case of an error from Err()

use std::{
    fs,
    fs::File,
    io::{self, ErrorKind, Read},
};

fn main() {
    // 1. ::open() returns Result<T, E>
    //    T would be the type of the value implementation of File::open which is
    //                                                      std::fs::File which is a file handle
    //    E would be the type of the value std::io::Error
    //
    //    so our variable will be an instance of Result, either Ok or Err
    let greeting_file_result = File::open("hello.txt");
    //
    // 2. using a match pattern we can easily get the value in case of the success or do something
    //    else in case of an error
    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        // File::open() error is of type io::Error which is a struct provided by the library
        Err(error) => panic!("Problem opening the file: {error:?}"),
    };

    // 1. if would want to do something specifically based on an error type, you can do it as well,
    //    since File::open() can produce an error based on different conditions
    let greeting_file_result = File::open("hello.txt");
    let greeting_file = match greeting_file_result {
        Ok(file) => file,
        // Error struct has a metho .kind() which returns an enum ErrorKind variant
        Err(error) => match error.kind() {
            // here you test agains enum variants from ErrorKind
            ErrorKind::NotFound => match File::create("hello.txt") {
                // ::create() returns a Result you test against
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {e:?}"),
            },
            _ => {
                panic!("Problem opening the file: {error:?}");
            }
        },
    };

    // 1. .unwrap() will return the value from Ok() variant or will panic
    let greeting_file = File::open("hello.txt").unwrap();
    // 2. .expect() will return the value from Ok() variant or will panic but with your message,
    //    this is the preferred way if choosing between unwrap and expect
    let greeting_file =
        File::open("hello.txt").expect("hello.txt should be included in this project");
}

// 1. you can propagate errors and decide there what should it do with it
fn read_username_from_file() -> Result<String, io::Error> {
    // 1. return type of the function is Result<String, io::Error> either value or error we return
    let username_file_result = File::open("hello.txt");

    let mut username_file = match username_file_result {
        // we first check if we could open the file, then return it
        Ok(file) => file,
        // if the file could not been opened, we exit the function by returning the error, about
        // why we couldnt open the file
        Err(e) => return Err(e),
    };

    let mut username = String::new();

    match username_file.read_to_string(&mut username) {
        // we return the content of the "username" variable which we wrote into from
        // .read_to_string() method above and return from the function
        Ok(_) => Ok(username),
        // if we .read_to_string() failed, we return the error instead
        Err(e) => Err(e),
    }
}
//
// 2. rust has a shortcut for the above function since ussing a lot of matches and checking each
//    error is kind of tedious, its the "?" operator
fn read_username_from_file_shortcut() -> Result<String, io::Error> {
    // 1. "?" basically cotninue the workflow if the Result from the below statement is Ok() and
    //    the Err() if an error occured and returns either value within Ok() or Err()
    let mut username_file = File::open("hello.txt")?;
    let mut username = String::new();
    // in our case, "?" here wont return outside of function since we have ";" at the end which
    // basically makes it a statement and just discards the returned value
    username_file.read_to_string(&mut username)?;
    // this will be returned if no errors arived above
    Ok(username)

    // there is a difference between how "match" and "?" works:
    //      1. Error values that have "?" operator called on them go through the "from" function
    //         defined in the "From" trait in the std which is used to convert values from one type
    //         into another.
    //      1.1. when "?" calls "from", the error type received is converted into the error type
    //           defined in the return type of the current function
    //
    //      this is useful in our case since we return io::Error but the above code can fail for
    //      different reasons, but it will still be coverted into io::Error
    //
    //      you can use "?" only if the function return type is Result<T, E>, Option<T, E>, a type that
    //      implements "FromResidual", otherwise you it wont compile because "?" itslef returns
    //      early from a function if "?" got Err() or Ok() if "?" is at the end of an expression
    //      without ";" after and its the last expression inside a function
    //      //
    //      if "?" is part of an expression but not the last, it just returns the
    //      value and its used as usually by the next handlers, either methods called on it or whatever
    //
    //      "?" wont automaticcaly convert Result into Option or Option into Result, so you would
    //      need to explicitly handle that, either with .ok() on a Result or .ok_or() on an Option
    //      to convert them explicitly
    //
    //      main() by default returns (), but you can make its return type something else, like
    //      Result<(), E> where E would be your error you would like to return from main(), this is
    //      mainly needed for returning something else than "0" when main() is finishing the program
    //      since it follows the convention to return "0" if program finished successfully or some
    //      other number if there were some errors
    //      //
    //      main() can return any type that implement "std::process::Termination" trait which contains
    //      a function "report" that returns an "ExitCode"
}
//
// 3. you could make above function even shorted by skipping the return value of the File::open
//    and usiing "?" on it
fn read_username_from_file_even_shorter() -> Result<String, io::Error> {
    let mut username = String::new();

    // notice, we can use "?" everywhere there is a Result return type
    File::open("hello.txt")?.read_to_string(&mut username)?;

    Ok(username)
}
//
// 4. you can even shrink the functionality more, since std::fs has the same feature which opens a
//    file, reads content and stores it inside a String and returns it or an error
fn read_username_from_file_std_version() -> Result<String, io::Error> {
    fs::read_to_string("hello.txt")
}





// this is an alterantive error hanlding using closures (discussed later) with no "match" which is clearer
fn use_closures_to_handle_erorr() {
    let greeting_file = File::open("hello.txt").unwrap_or_else(|error| {
        if error.kind() == ErrorKind::NotFound {
            File::create("hello.txt").unwrap_or_else(|error| {
                panic!("Problem creating the file: {error:?}");
            })
        } else {
            panic!("Problem opening the file: {error:?}");
        }
    });
}
