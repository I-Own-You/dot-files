fn main() {
    let signed_int_1_byte: i8 = 5;
    let signed_int_2_byte: i16 = 5;
    let signed_int_4_byte: i32 = 5;
    let signed_int_8_byte: i64 = 5;
    let signed_int_16_byte: i128 = 5;
    let signed_architecutre_dependent_size: isize = 5;

    let unsigned_int_1_byte: u8 = 5;
    let unsigned_int_2_byte: u16 = 5;
    let unsigned_int_4_byte: u32 = 5;
    let unsigned_int_8_byte: u64 = 5;
    let unsigned_int_16_byte: u128 = 5;
    let unsigned_architecutre_dependent_size: usize = 5;

    // 1. both signed and unsigned are platform dependent, so if its x64 or x32 it matters for type

    // 1. integers default to i32 type

    // 2. there are 5 form repressentations of a numeric type:
    let decimal = 95_222; // you can use _ between numbers to represent how big it is
    let hex = 0xff; 
    let octal = 0o77;
    let binary = 0b1111_0000;
    let byte = b'A'; // only u8 type can take a byte form

    // 1. numeric literal can have type assigned ahead which alsso impacts expression, variable types, .etc
    let decide_ahead_i64 = 590i64;
    let decide_ahead_u8 = 255u8;

    // 1. integer overflow has 2 behaviours:
    //    1. compiling within debug mode:
    //       rust includes checks for itneger oveflow which cause the program to panic at runtime,
    //       panic means it will crash unexepectedly
    //    2. compiling with release mode:
    //       rust doesnt inlcude checks for integer overflows and perform complement wrapping,
    //       which bassically means when you surpass maximum amount a type can handle it wraps from
    //       end to start untill the desired number is fulfilled:
    //             for u8, 256 -> 0 since 255 is max, 257 -> 1, .etc
    //    
    //    tehre are methods that can handle your overflow cases in release mode:
    //    wrapping_*, checked_*, overflowing_*, saturating_*

    // 1. operations on different integer types are not allowed if they differ 
    //    (numbers with a decimal and whole numbers)
    let result = 1 / 5.0; // error

    // 1. if you dont provide a type to a variable but you have ssome numeric literals,
    //    on the left and one of them has a type like 5i16, the variable type will be infered,
    //    to i16, works for all numeric types
    let what_is_the_type = 5 * 2i16;
    
}
