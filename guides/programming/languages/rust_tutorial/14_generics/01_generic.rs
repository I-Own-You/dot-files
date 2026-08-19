// 1. generics - definitons for items like functions, structs, .etc which can be used on
//               multiple data types

// 1. T type goes inside <> between function name and (
//
// 2. this T type is actually the type which will be inferred from parameter,
//    and you need it before the parameter so that compiler knows how many generic types
//    does this function has.
//
// 3. types can be used on parameters as types of parameters and as return types
//
// 4. pay attention to the fact that we retunr & for T
fn largest<T>(list: &[T]) -> &T {
    let mut largest = &list[0];

    for item in list {
        // this code actually will not compile and we will have an error because of the ">"
        // operator because not all types can implement ">"
        //
        // we would need to implement std::cmp::PartialOrd trait on types to achieve this or
        // just restrict what types can our function take, like:
        //                                                       <T: std::cmp::PartialOrd>
        // this would mean only types that implement std::cmp::PartialOrd trait can be passed into function
        if item > largest {
            largest = item;
        }
    }

    largest
}

// 1. here how you define a generic struct
// 2. the type must be the same for both fields
struct Point<T> {
    x: T,
    y: T,
}
// 3. we can have generic methods as well
//
// 4. generic methods without concrete type are defined for all types, but if you have a concrete
//    type, like imple<f32> Point<32>, this will work only for f32 types and the generic one will not work
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

// 1. we can have multiple types defined and use them, this fixes the above problem where
//    you must have only 1 type for both fields
struct Point2<X1, Y1> {
    x: X1,
    y: Y1,
}
//
// 2. we can have generic methods for multiple types as well, and even construct,
//    return types from it
impl<X1, Y1> Point2<X1, Y1> {
    // self in our case is Point2 instance with 2 generic types
    // other is the parameter which has X2, Y2 types since we know Point2 has 2 generic types
    fn mixup<X2, Y2>(self, other: Point2<X2, Y2>) -> Point2<X1, Y2> {
        Point2 {
            // self.x from Point2 which is X1
            // other.y from Point2 which is Y2
            //
            // we basically constructed another object using types, we broke nothing
            x: self.x,
            y: other.y,
        }
    }
}

// 1. enums can be generic as well
enum GenEnum<T, E> {
    Data(T),
    Error(E),
}

fn main() {
    let number_list = vec![34, 50, 25, 100, 65];
    let char_list = vec!['y', 'm', 'a', 'q'];

    // 1. because our function iss now generic, we can use any type we want, in our case Vec<i32>
    let result = largest(&number_list);
    println!("The largest number is {result}");
    //
    // 2. here we pass the Vec<char> type and it works
    let result = largest(&char_list);
    println!("The largest char is {result}");

    // 1. since our Point struct has only 1 type and its assigned to both fields,
    //    we must give same type for both fields
    let integer = Point { x: 5, y: 10 }; // T: i32, T: i32
    let float = Point { x: 1.0, y: 4.0 }; // T: f64, T: f64
    // 2. what about givign different types ?
    //    this would not work, 5 is i32, y is f64, our T type from struct first sees i32
    //    but then you give f64, T cannot be i32 and f64 at the same type
    let wont_work = Point { x: 5, y: 4.0 }; // error
    // 3. but we can mitigate the above error by having multiple types defined on a structure,
    //    which allows us to have different types for each field
    let both_integer = Point2 { x: 5, y: 10 }; // i32 i32, X1: i32, Y1: i32
    let both_float = Point2 { x: 1.0, y: 4.0 }; // f64 f64, X1: f64, Y1: f64
    let integer_and_float = Point2 { x: 5, y: 4.0 }; // i32 f64, X1: i32, Y1: f64
    // 4. invoking methods for single struct type
    let x = integer.x(); // &i32 == &T
    // 5. invoking methods for multiple struct types
    let mix_them = both_integer.mixup(both_float); // Point2<i32, f64>, X1: i32, Y2: f64

    // 1. and here is how we would have different enum variant types
    let string_data = GenEnum::Data(String::from("abc"));
    let numeric_data = GenEnum::Data(100.0);
    // 2. the same way you can give these variable some error value like GenEnum::Error(some error)
}

// generics do not impact runtime performace in any way since generics construct all versions of
// types used in code during compilation time, so any invokation of a generic construction by some
// type will just be constructed as a separate thing, so you will basically have 5 structs for
// different types that you used instead of a generic one in source code.
