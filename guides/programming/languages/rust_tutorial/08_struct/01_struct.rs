// 1. struct - group of realted data

// struct Name
struct User {
    // struct fields -> struct_field_name: type
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}

#[derive(Debug)]
struct User2 {
    k: bool,
}

fn main() {
    // this is how you define a user struct instance:
    //    1.you need the field names
    //    2. values for field names
    //    3. you cant omit the field name so the order of defining doesnt matter
    let user1 = User {
        active: true,
        username: String::from("someusername123"),
        email: String::from("someone@example.com"),
        sign_in_count: 1,
    };

    // to access a field from a struct isntance we use "." between variable containing the,
    // struct instance and its field name
    user1.email;

    // if a struct instance is mutable, you can change it by the same "." and just assign new data;
    // you cannot have a specific field of a struct be mutable, the whole instance should be mutable;
    let mut user2 = User {
        active: false,
        username: String::from("fdsdf"),
        email: String::from("fsdf"),
        sign_in_count: 5,
    };
    user2.email = String::from("sfsdf");

    // how would you create another struct instance with sosme fields changed ? like this:
    let user3 = User {
        active: user1.active,
        username: user1.username,
        email: String::from("another_email"), // we need another email in this instance
        sign_in_count: user1.sign_in_count,
    };
    // but above syntax is kind of tedious no ? what if we just update whatever fields we need,
    // and then just assign the rest with the values from other struct ? you can, its called:
    // "struct update syntax":
    let user4 = User {
        email: String::from("another_email"),
        // this part is important, above you can redefine whatever fields you need, but once,
        // you are done, all the rest fields should go as the last struct field with this notation:
        // ..struct_instance_name
        ..user3
    };
    // by the way, in the above example you did username: user1.username in a variable which has,
    // let user3 = User, hmmmm, the "=" moves ownership right ? but is a struct, not a variable,
    // so it means user1.username ownership is moved towards user3.username so cant be used anymore,
    // but user1.email can, since user3.email got a new String type, user1.active and user1.sign_in_count,
    // are not moved since they are scalar type and implement Copy trait so they can be used as well,
    // so the user1 variable itself is not moved, only its .username field is moved,
    //
    // let user4 = user3; would move user3 entirely as a variable not struct fields
    //
    // ..user3 above moved all its struct fields it could as well, so user3.username cannot be used,
    // but user3.email, user3.active, user3.sign_in_count can be used.

    // rust gives you the ability to create "tuple struct" where you dont have struct field names,
    // and only specify types:
    //
    // these 2 variables are of different types although have same structure inside,
    // so a function that would take Color type wont take Point type, theis rules apply,
    // for struct instances as well.
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
    // why even bother ? well, you could destructure a tuple struct the same way you would desstructure,
    // a simple tuple but you need to put in fron the actual type you destructure since the tuple structure,
    // on the right iss not enough.
    let Point(x, y, z) = origin; // x,y,z are now of i32 type, not Point type
    // you can also access values inside a tuple structure by index as you would with a simple tuple
    black.0;

    // rust also allows you to have a unit-like struct, it has no fields and needs no values,
    // to be defined with:
    let subject = AlwaysEqual;
    // whats the point of it ? well, if you want to define a trait (discussed later) on a type,
    // you wouldnt need any data, you would need just the trait implemented, this is why such thing,
    // exists.

    // if you try to print a structure, it wont, because println macro can print only types,
    // that implement Display trait, struct dont implement them
    println!("{user1}"); // error
    // we could use a Debug trait(gives useful info for debugging code) by specifying :? inside { }
    // but its again an error since our struct doesnt implement Debug trait
    println!("{user1:?}");
    // so what we can do ? actaully Rust gives us a way to opt in for a debug information,
    // by specifying a derivative above our struct like so: #[derive(Debug)] where "derive" is an
    // attribute, and "Debug" is the trait.
    // now it will work!
    let user_from_debug_info_struct = User2 {
        k: false
    };
    println!("{user_from_debug_info_struct:?}");
    // if you have a large struct and you want more nice output you can usse :#? inside { }
    println!("{user_from_debug_info_struct:#?}");
    //
    // there is another way to get debug information by using dbg! macro but it takes ownership,
    // from your struct, prints file name, number on which debug was invoked and gives the result,
    // of the expression you gave to dbg!() and then returns the ownership back
    dbg!(user_from_debug_info_struct);
    dbg!(2 * 15);
    // whats the difference ? dbg! output to stderr instead of stdout as println! macro does;
    // dbg! is a powerfull tool for debuggin.
    //
    // rust has a lot of traits you can use other than Debug;
    // rust has a lot of attributes you can use other than derive;
    //
    // but there is a way to implement custom traits on your own which is discussed later
    
    // also, if you intent to use &str instead of String, this would require addition of 
    // "lifetime" feature of russt, its not about ownership or borrowing, its about,
    // how long should a reference live, since it must have a lifetime and be valid,
    // its discussed in a later chapter.
}

struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

// this kind of structures kind of behave like (), just empty data/type needed for trait
struct AlwaysEqual;

// you can also return a struct instance for example (basically initializing and returning an instance)
fn build_user(email: String, username: String) -> User {
    User {
        active: true,
        username: username, // username from the parameter initializing username struct field
        email: email,       // email from the parameter initializing email struct field/
        sign_in_count: 1,
    }
}
// usually, when you create a functioin with parameters which will initialize/change data,
// inside a struct you will give the same name for parameters as structure fields, so,
// because of this, rust allows us to have a shorthand for assigning data to a struct field
// like this: struct_field: struct_field becomes struct_field
fn build_user_shorthand_name(email: String, username: String) -> User {
    User {
        active: true,
        username, // intead of username: username
        email,    // instead of email: email
        sign_in_count: 1,
    }
}
