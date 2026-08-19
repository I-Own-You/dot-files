fn main() {
    // 1. array a collection of consecutive values of the same type with a fixed length
    let a = [1, 2, 3];

    // 1. you can define the type and length as well, neither can be ommited
    let b: [i16; 5] = [1, 2, 3, 4, 5];

    // 1. you can initialize an array with the same value for all elements
    let c = [3; 5]; // [3, 3, 3, 3, 3]

    // 1. you can access elements within an array by its index
    let first = a[0];
    let second = a[1];

    // 1. if you access an index outside the array, rust will panic at runtime, how ?
    //    when you access an array by index it checks if 0 <= index < len

    // 1. arrays are usually used if you want a fixed length or want them on a stack rather than heap
}
