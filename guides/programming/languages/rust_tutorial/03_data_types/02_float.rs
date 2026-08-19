fn main() {
    // 1. rust has only f32 and f64 types with support for "unstable" f16, f32, f128
    
    // 1. all numertic literals wiht a decimal are by default promoted to float64 type 

    let float_64 = 25.5; // f64
    
    let float_32: f32 = 25.5; // f32

    // operations on numbers of different type (whole and decimals) are not allowed
    let result = 25.2 * 5; // error
    
    // rust chose to promote to f64 by default because on modern CPU difference in speed,
    // is basically near the same for both types in terms of operations
}
