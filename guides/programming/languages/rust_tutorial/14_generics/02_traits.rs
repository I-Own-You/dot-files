// 1. trait - defines a functionality a type has and can share with other types
//
// 1.1 usually used to define a shared behaviour for types

// 2. there is a technique called "traid bounds" used to specify that a generic type can be any type
//    that has certain behaviour
//
// 2.1 a type has behaviour consisting of methods we can call on it
// 2.2 different types share the same behaviour if we can call the same methods on all those types

// 1. this is how you define a trait, usually it will be inside lib.rs for all binary crates,
//    or inside a module so that others can use it if they need
//
// 2. it consists of function declarations without implementation
//
// 3. every type implementing this trait must have a definition of it with its implementation
//
// 4. you cannot implement a trait from another crate to a type from another crate,
//    this basically means you can:
//          1. implement trait from current crate to a type defined in current crate
//          2. implement trait from current crate to a type from another crate
//          3. implement trait from another crate to a type defined in current crate
//
//          nothing more is allowed.
trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    location: String,
    author: String,
    content: String,
}

struct SocialPost {
    username: String,
    content: String,
    reply: bool,
    repost: bool,
}

struct Random {
    code: f64,
}

// 1. this is how you implement a trait
impl Summary for NewsArticle {
    // basically define the function declaration with the same name, parameters (and its type) and reutn type
    // with an implementation
    //
    // notice that we have & and self, so its kind of the same as defining a method;
    // you call such functions as methods;
    //
    // if you define a function without self, it becomes a simple function that can be called only,
    // by the type you implemented this trait for, in our case NewsArticle::my_function()
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

// another structure implements the same trait as above structure with its own implementation,
// notice that the function declaration is the same
impl Summary for SocialPost {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}

// 1. you can have a trait with default implementation for all types if they decide to not
//    implemente specific trait function
trait DefaultSummary {
    // in this version, when you give a default implementation you have an actaul body { }
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
// 2. and this is how you wold implement this trait for a type
// 2.1 notice that we dont need to have anything inside { }, but this works only if you have
//     function definition with a default implementation, if you would have another function
//     declaration beside the default implementation, you would need to define it inside { }
impl DefaultSummary for NewsArticle {}
// 3. did you understand why this is commented ? because SocialPost already has implemented the
//    Summary trait which already has "summary" function which SocialPost implemented earlier above,
//    and in this case it would have 2 sources of truth, the default one which is implemented inside
//    the trait itself and the one it implemented separately so compiler cannot compile because it
//    doenst know what to choose.
//
// 3.1 actually NewsArticle also has the SocialPost problem, but we dont have an object of
//   NewsArticle type inside main() which calls .summarize() method, if we would, its an error as well
//
// 3.2 usually you will not implement traits which have same name functions or even default
//   implementation and same name function, you will usually just override the function inside the
//   original Summary trait and add { } body with its logic
// impl DefaultSummary for SocialPost {} // error

// 1. you can override even a default implementation and when you call it, it will invoke your
//    version instead of default implementation within the trait
impl DefaultSummary for Random {
    fn summarize(&self) -> String {
        String::from("something else")
    }
}

// 1. you can call functions within the same trait which either if it has defualt implementation or not
//
// here, it doesnt have a default implementation, so it will call the implemented function from the
// type which implements this trait
trait Summary2 {
    fn summarize_author(&self) -> String;

    fn summarize2(&self) -> String {
        // we call the function within this trait with "self.func_name"
        // it will call the below implementation of SocialPost which impementes Summary2 trait and
        // implements the "summarize_author" function
        format!("(Read more from {}...)", self.summarize_author())
    }
}
impl Summary2 for SocialPost {
    fn summarize_author(&self) -> String {
        format!("@{}", self.username)
    }
}
//
// here, it has a default implementation, and will call it instead
trait Summary3 {
    fn summarize_author(&self) -> String {
        format!("random name")
    }

    fn summarize2(&self) -> String {
        // self.summarize_author() here will call the default implementation within Summary3
        //
        // but, if a type implements .summarize_author() somewhere, then self.summarize_author()
        // will call that instead of the default implementation within Summary3.
        format!("(Read more from {}...)", self.summarize_author())
    }
}

fn main() {
    let post = SocialPost {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        repost: false,
    };

    // 1. and this is how we call the implemented trait for SocialPost type
    println!("1 new post: {}", post.summarize());
}

// 1. and this is how you can pass a type that implements some trait into a function
// 2. notice & neat "impl", without it, we "move" the type and datat is dropped
fn notify(item: &impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
//
// 1. an example of "trait bound", basically we can pass any type that implementd "Summary" trait
fn notify2<T: Summary>(item: &T) {
    println!("Breaking news! {}", item.summarize());
}
// 2. this is convenient since if we would have a lot of parameters which would require only types
//    that implemeted "Summary" trait, it would become tedious to type, but this way you could have:
fn notify3<T: Summary>(item1: &T, item2: &T) {}
// 3. this actually works the same for any generic function, but here is especially useful since
//    typing i32 or f64 is kind of easy for like 4 parameters, but &impl SomeTrait is not...

// 1. rust provides a shortcut to specify a parameter which implements 2 or more traits
// 2. "+" basically says any type that implementes both "Summary" and "Display"
fn notify4(item: &(impl Summary + std::fmt::Display)) {}
//
// 3. above technqiue works with generics too
fn notify5<T: Summary + std::fmt::Display>(item: &T) {}

// 1. above function signatures can become very verbose if inside < > you will have a lot of trait
//    bounds, so rust provides another shortcut so its easier to read the function
//
// this function is just unbearable
fn some_function<T: std::fmt::Display + Clone, U: Clone + std::fmt::Debug>(t: &T, u: &U) -> i32 {
    2
}
// now its more nice, bassically added a "where" clause and after it we specify our types
fn some_function2<T, U>(t: &T, u: &U) -> i32
where
    T: std::fmt::Display + Clone,
    U: Clone + std::fmt::Debug,
{
    2
}

// 1. we can return a type from a function which implements a trait as well
// 2. notice the return type of the function: impl Summary
// 3. this is useful since you can return any type that implements "Summary" trait
fn returns_summarizable() -> impl Summary {
    SocialPost {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        repost: false,
    }
}

// 1. there is also a technique called "blanket implementation" which basically means we can define
//    functionality for a type which satisfies another trait
// 
// 1.1 for example, the .to_string() method, it works on numbers as well, not only on &str, why ?
//     because there is a "ToString" trait whih is defined on every type that implementes "Display" trait:
//
//                 impl<T: Display> ToString for T {
//                     fn to_string(&self) { code }
//                 }
//
//     this is how internally it looks, basically any type which implements "Display" trait will
//     implement "ToString" trait and have its functionality.
