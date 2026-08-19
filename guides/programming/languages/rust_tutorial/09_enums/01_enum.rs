// 1. enum - allow you to define a type by enumerating its possible variants

// here is how you define an enum
//
// 1. if you dont specify any type inside () after the kind name, it will be a numeric literal,
//    by default startiing from 0, V4 = 0, V6 = 1
// 2. you can make any kind start from any value you want, so if you type V4 = 6, V6, then,
//    V4 = 6, V6 = 5 or V2 = 5, V4, V6 = 3 then V2 = 5, V4 = 6, V6 = 3
// 3. enum variants are not seen outside enum scope so they dont pollute namespace in file
enum IpAddrKind {
    V4,
    V6,
}

// there is an advantage of an enum is that what if you dont know the data yet, but know its type ?
struct IpAddr {
    kind: IpAddrKind,
    address: String,
}

// actaully, we dont even need a structure to have the data in it, we can have it inside,
// enum direclty
enum IpAddr2 {
    V4(String),
    V6(String),
}

// actaully, you can have any data type in an enum, what about defining V4 as a tuple of 4 ints,
// which represent the definiton of ipaddr4 in real life ?
enum IpAddr3 {
    V4(u8, u8, u8, u8),
    V6(String),
}
// so by now you should understand that you kind have any data type inside an enum, struct, enum, .etc

// here is a more complex example
enum Message {
    // a lot of associated data under an enum
    Quit,
    Move { x: i32, y: i32 }, // like a structure
    Write(String),
    ChangeColor(i32, i32, i32),
}
// we can even have methods for enums
impl Message {
    fn message_call(&self) {
       // 1. here, self actaully is the value from the enum, its not a struct instance where you can,
       //    access enums kinds, its the kind itself as a value, self == Message, not Message::KindType,
       //    which means you could do *self = Message::Quit; even though self passed was Message::Move
       // 2. if let quit = Message::Quit, then quit.message_call() will invoke the value Message::Quit,
       //    gave to let quit, which in our case is 0
       // 3. you could change the self inside a method with dereferencing it making self mutable,
       //    so if you pass self as Message::Quit and inside you do *self = Message::ChangeColor(0,0,0),
       //    then self becomes Message::ChangeColor variant instead of Message::Quit, its a powerful tool,
       //    but dangerous since your logic is now kind of confusing but it depends on what you need
    }
}

fn main() {
    // here is how you define an instance of IpAddrKind
    let four = IpAddrKind::V4;
    let six = IpAddrKind::V6;
    // both above variables have the same type: IpAddrKind, but different values under the hood

    // here is how you pass IpAddrKind instances
    route(four);
    route(six);

    // and when you know the data, you assign the data as well as an enum variant
    let home = IpAddr {
        kind: IpAddrKind::V4,
        address: String::from("127.0.0.1"),
    };
    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };

    // now, since we have an enum which can contain actual data and not a kind, we can,
    // assign data from an enum directly
    //
    // IpAddrData::V4 or V6 is actaully a function call here like a constructor, we get this,
    // automatically by defining V4(String) insdie the enum
    let home = IpAddr2::V4(String::from("127.0.0.1"));
    let loopback = IpAddr2::V6(String::from("::1"));

    // and here we define an instance of enum with different data types
    let home = IpAddr3::V4(127, 0, 0, 1);
    let loopback = IpAddr3::V6(String::from("::1"));

    // and here is how you would define the Message enum and use its methods
    let m = Message::Write(String::from("hello"));
    // and remember, calling a method on an enum kind means you will work with the value,
    // itself(which in our case is Message::Write a String data), not an instance.
    m.message_call();

    // std has a lot of different enums predefined you can work with, but there is one enum that,
    // is very useful and will be encountered a lot, the Option enum.
    //
    // why its useful ? its used mainly when a value could be something or could be nothing, so you
    // could think of it as "null" value right ? but its not, rust doesnt have "null" keyword,
    // since using "null" as non-null value causes error by the logic itself but having a concept,
    // of a "Null" or an abscent value is still useful which Option tries to implement:
    // enum Option<T> {
    //     None,
    //     Some(T),
    // }
    // the above code is literally the Option enum immplementation from the std, and its also
    // included, in the "prelude" of std import phase, so you can use None and Some(T) without using
    // Option::None or Option::Some(T)
    //
    // usage of Option
    let some_number = Some(5); // Option<i32> because rust can infer from value inside Some
    let some_char = Some('e'); // Option<char> 
    let abscent_number: Option<i32> = None; // rust cannot infer the value since we have None, no value,
                                            // which means we need to explicitly give a type in case
                                            // value will change.
                                            //
                                            // the logic here is simple, if we have Some it means
                                            // the value is there, if we have None its not.
    //
    // why bother with all these stuff and whats even the point of comparing with null ?
    let x: i8 = 5; // i8 type
    let y: Option<i8> = Some(5); // Option<i8> type
    // this line produces compilation erorr, but why, both types have i8 inside right ?
    // i8 from x and i8 from Some(5) but y actaully has Option<i8> and not a sample i8,
    // this matters because it means y could be or could not and its up to you to handle,
    // cases where y is absecnt or is there and then decide what to do with it.
    let sum = x + y;
    // the above explanation could be summed like this:
    // 1. y: Option<i8> | None where Option<i8> is found by Some(value)
    // 2. you cannot use an option until you find out its absence or presence
    //
    // how do you handle presence/absence of option ? match patter / if let construction 
        
}

// here is how you can take a parameter of type IpAddrKind
fn route(ip: IpAddrKind) {}
