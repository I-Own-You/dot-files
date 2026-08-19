fn main() {
    // 1. using a tuple destructuring we can take multiple values from a function return
    let (x, y) = get_two_values();
}

// 1. this way, by defining N types we can return more than 1 value
fn get_two_values() -> (i32, i16) {
    return (2, 5);
}
