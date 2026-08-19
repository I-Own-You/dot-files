fn main() {
    // 1. to have a variable be able to change you must define it as mutable
    let mut y = 5;
    println!("{y}");
    y = 6; // no error, y is mutable
    println!("{y}");
}
