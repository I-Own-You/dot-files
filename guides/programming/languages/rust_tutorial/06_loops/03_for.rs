fn main() {
    // 1. a third type of loop is "for" loop but its not the same "for" from other languages, it,
    //    rather operates on a collection(iterator) to retrieve its values then having an index,
    //    a condition and a statement for incrementing that index
    let a = [10, 20, 30, 40, 50];
    for element in a {
        println!("the value is: {element}");
    }
    // 2. there is another technique to use for loop with a Range provided from std,
    //    (1..4) generates a Range from 1(inclusive) to 4(exclusive), you would need (1..=4) to include 4
    //    .rev() reverses the range so its 3,2,1
    for number in (1..4).rev() {
        println!("{number}!");
    }
    println!("LIFTOFF!!!");
}
