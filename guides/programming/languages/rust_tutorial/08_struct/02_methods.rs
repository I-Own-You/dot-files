// 1. method - similar to functions.
//             1. they are defined inside a context: struct, enum, trait object
//             2. first parameter of a method is always "self" which is the instance the method,
//                is created for (struct, enum, trait object)

// 2. you cannot implementd methods for structures outside current crate, workaround is implementing
//    traits for it, if its suitable.

#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

// 1. "impl" (implementation) block for Rectangle (the name should be a sruct/enum/trait object real name)
// 2. everything inside Rectangle impl will be associated with Rectangle type
impl Rectangle {
    // we have self as the first paramter (its mandatory if you want Rectangle instaces to be able,
    //                                     to use this method)
    //
    // &self here actaully is a shortcut for self: &Self, how so ? inside impl, Self type,
    // is the type the impl block is for, which is Rectangle
    //
    // why &self and not self ? methods alsso take ownership so if you would have self,
    // then instance.area() would invalidated your instance right away, actaully it will,
    // take any ownership it can as other function do, the rules are the same
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // we can have a method name that is already occupied by a struct field inside Rectangle,
    // and it will not cause any problems because methods use () and struct fields dont
    //
    // rust do not implement getters or setter as other langauges do though
    fn width(&self) -> bool {
        self.width > 0
    }

    // you can have more parameters after the &self
    fn compare_two_structs(&self, other_struct: &Rectangle) -> i32 {
        if self.width < other_struct.width {
            -1
        } else if self.width == other_struct.width {
            0
        } else {
            1
        }
    }

    // all functions inside an impl block are called associated functions since they are made,
    // to be associated with the Rectangle type because impl Rectange {}, so it means,
    // we actaully can have functions inside without taking an insstance (self) which can be used,
    // by the type itself (Rectangle), String::from is an example of this
    fn square(size: u32) -> Self { // Self type iss Rectangle instance type
        // here we return a Self type which is Rectangle type itself
        Self {
            width: size,
            height: size,
        }
        // actaully, you can swap Self with the type of impl block (in our case Rectangle) 
        // and it will be the same, but Self is useful if you have generics or the type is complex
    }
    // we basically initialize an instance and give ownership for it, kind of like "new" keyword,
    // in other lanagues (a constructor basically) but there is no "new" keyword inside rust

    // self and any other parameters can be mutables

    // rust has automatic reference and dereference when it comes to struct fields,
    // so there are not "->" when you access through a pointer some fields like C, it automatically,
    // does it for you, so you just use "." for everyting because when you try:
    // p1.something() it actaully does (&p1).something() not (*p1).something(), p1 is a refernce,
    // to its type like &Rectangle -> &self
}

// rust allow duplicate of impl block for the same Type, it wont remove previous methods,
// from the previous impl block, so you kind of separated the location in code only,
// there isnt much benefit for this but there are some: generic traits and traits
impl Rectangle {
    fn another_method(&self) {
        println!("hey its me");
    }

    // you cant define here methods with the same name that were defined insside a previous,
    // impl block for the same type, its an error.
    
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );

    let rect2 = Rectangle {
        width: 25,
        height: 80,
    };

    // observe the fact that even if you have 2 parameters in your function, the &self itself,
    // is actaully the rect1, and &rect2 is the second parameter, under the hood actaully this
    // happens: Rectangle.compare_two_structs(&rect1, &rect2);

    if rect1.compare_two_structs(&rect2) < 0 {
        println!("rect1 width is lower than rect2");
    } else if rect1.compare_two_structs(&rect2) == 0 {
        println!("rect1 with is equal to rect2");
    } else {
        println!("rect1 width is higher then rect2");
    }

    // this is how you use an asssociated function, yes :: is also used to access a namespace
    let new_rectangle = Rectangle::square(25);

    new_rectangle.another_method();
}
