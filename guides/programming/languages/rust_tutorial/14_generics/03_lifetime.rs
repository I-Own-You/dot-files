// 1. lifetime - kind of generic, but instead of ensuring that a type has a behaviour it instead
//               ensures that references are valid as long as we need them to be

// 2. every reference in rust has a "lifetime" which means it has a scope in which its valid
// 2.1 most of the time lifetiimess are implicit and inferred
// 2.2 we must annotate lifetimes when the lifetimes of the references could be related in a few
//     different ways
// 2.3 annotatin the relationship is done through generic lifetime parameter to ensure that
//     the reference we are using will be valid at runtime

// 3. rust has a concept for comipler "lifetime ellision" when compiler can infer the lifetime of
//    references, its not something a programmer should follow but the compiler can address and
//    infer without needing to explicitly set a lifetime, and when it cant, you must set it explicitly.
//
// 3.1 "input lifetime" - lifetime on parameters
// 3.2 "output lifetime" - lifetime on return value
//
// there are 3 rules, 1 is applied on "input lifetimes", 2 and 3 on "output lifetimes", they apply
// to function signatures and impl blocks
//
// RULES:
//
//        1. compiler assigns a lifetime parameter to each parameter that is a refernce, which means
//           1 parameter -> 'a, 2 parameters -> 'a, 'b where &'a first_param, &'b second_param, .etc
//
//        2. if there is only one "input lifetime" parameter, its lifetime is assigned to all
//           "output lifetime" parameters
//
//        3. if there are multiple "input lifetime" parameters but one of them is &self or &mut self
//           (so its about methods) the lifetime of self is assigned to all "output lifetime" parameters

fn main() {
    // 1. introduction to lifetime
    let r;
    {
        let x = 5;
        r = &x;
    } // x here is dropped
    //   but r scope is in main() not inside this block, so it lives but points now to dead x
    //   reference which is an error, so lifetime of "r" is longer than "x"
    println!("r: {r}");

    // 2. another example
    let string1 = String::from("abcd");
    let string2 = "xyz";
    let result = longest(string1.as_str(), string2);
    println!("The longest string is {result}");

    // 1. we have here 2 lifetimes, string1 which is longer and string2 which is shorter,
    //    this code will execute since "result" will get a reference which lifetime will be based on
    //    string2 and not string1 because string2 is shorter and "result" being used is not out of
    //    string2 scope.
    let string1 = String::from("long string is long");
    {
        let string2 = String::from("xyz");
        let result = lifetime_longest(string1.as_str(), string2.as_str());
        println!("The longest string is {result}");
    }
    //
    // 2. now, "result" will again contain a reference of string2 since its shorted thatn string1
    //    but it will not compile and give us an error, why ? because "result" is being used
    //    outside of "string2" scope, this is all because we had 1 lifetime defined for both objects
    //    passed into and the rule says that the shortest lifetime takes preference.
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = lifetime_longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {result}");

    // 1. lifetime for a struct field which points to a reference
    let novel = String::from("abcd");
    let i = ImportantExcerpt {
        // this basically means an instance of this struct cannot outlive "novel" data
        part: &novel,
    };

    // 1. there is a thing called "static lifetime" which means data lives during the entire program
    //    execution, &str types have them by default, since string literals are stored inside the
    //    program binary and are always available
    //
    // 2. dont make everything &'static if compiler says so, you dont actaully want all your
    //    lifetimes to live during the whole program execution, fix the logic flow first.
    let s: &'static str = "I have a static lifetime.";
}

fn longest(x: &str, y: &str) -> &str {
    // wheres the problem actually ? the thing is, we return a reference we borrowed from another
    // scope, we return the exact same reference, but for how long will it live, whats the lifetime of it ?
    //
    // sure, you can say it will live as long as "x" and "y" since we didnt "move" them, we borrowed them
    //
    // but this is true to you, not to the compiler, for a compiler to know, you must tell it
    if x.len() > y.len() { x } else { y }
}

// 1. rust basically sees this and understands that function takes 2 parameters that live at least
//    as long as lifetime 'a and the return value will live as long as lifetime 'a
//
//    basically you bound some lifetime from parameter to the return value which makes compiler
//    happy since it will know how long the return value will be valid for
//
// 2. by specifying a lifetime, you dont change the lifetime of the parameters itself, but tell the
//    borrowcheker that any value that do not respect this lifetime, should not be accepted and the
//    function doesnt even need to know the lifetime of the parameters
//
// 3. since we used only 1 lifetime for all objects, this means borrowchecker addresses to the
//    lifetime which is the shortest, so if you pass 2 different lifetimes, the shortest will be as
//    the main factor
fn lifetime_longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

// 1. you can have a lifetime only to some parameters and bound the return value lifetime to it
fn single_lifetime_longest<'a>(x: &'a str, y: &str) -> &'a str {
    x
}

// 1. returning a reference from a function means you must have a lifetime bound to a parameter
//    lifetime, if its not, it must be referred to a local object created withing the function, but
//    a reference to a local object means "dangling" reference sine the object is destroyed after
//    the function call ends.
//
//    lifetimes are always about connecting parameters lifetime to return values.
fn no_lifetime_assigned_longest<'a>(x: &str, y: &str) -> &'a str {
    let result = String::from("really long string");
    result.as_str()
}

// 1. you can have fields of structures which point to a reference, but you will need lifetime for it
struct ImportantExcerpt<'a> {
    part: &'a str,
}
// 2. lifetime on methods of structure, in this case lifetime after "impl" and ImportantExcerpt are
//    required since the structure itself has lifetime
impl<'a> ImportantExcerpt<'a> {
    // because of the 1 and 2 ellision lifetime rules, we dont need explicit lifetime
    fn level(&self) -> i32 {
        3
    }
}
// 3. another example were now the method takes 2 parameters, by 1 rule of ellision, they both have
//    a lifetime assigned, the 2 rules cannot apply, but the 3 can, since we have "&" near self,
//    the return value of the method is assigned the lifetime of &self, so its actually -> &' str
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {announcement}");
        self.part
    }
}

// 1. now, a summary of all you learned:
fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: std::fmt::Display,
{
    println!("Announcement! {ann}");
    if x.len() > y.len() { x } else { y }
}
