// 1. rust covers 2 type of errors:
//     1. recoverable - when you want to know and notify about the error
//     2. unrecoverable - when we want to stop the program
//
// 2. rust doesnt have exceptions to handle errors, instead it has:
//     1. Result<T, E> -  for recoverable errors, warn and do something with it
//     2. panic! - for unrecoverable errors,to stop the program 

// 1. rust code can panic in 2 cases:
//      1. something serious happened dureing compilation/execution like index out of range
//      2. we invoke panic! macro and the program panics and stops

// 2. when rust code panics, either 2 cases happen:
//      1. default scenario is unwinding the program, which means going up the stack and cleaning
//         all the data within functiions and cleaning everything up before stopping the program
//      2. "abort" the program which means stop now and let the system clean memory you took from it
//
//    if you want your program to be less in size, you could choose "abort" by specifying this
//    inside "Cargo.toml" under [profile.releae] this: panic = "abort", its for release builds
//
//    the default way is chosen to be "unwinding the stack" where program can correctly terminate
//    proccesses and execute Drop() for the data, and anything custom you made that will work when
//    unwinding will happen which "abort" way wont do.

// 3. rust can use an env RUST_BACKTRACE=[number] to get more specific info about which function calls
//    produced the panic, its useful if panic is happening because some code from a library or a lot
//    of function chain were involved, this works if debug symbols are enabled, they are enabled by
//    default for "cargo build" and "cargo run" but without --release flag
// 3.1 there is RUST_BACKTRACE=full if you want more verbose tracing

fn main() {
    panic!("hey, stop it!");
}
