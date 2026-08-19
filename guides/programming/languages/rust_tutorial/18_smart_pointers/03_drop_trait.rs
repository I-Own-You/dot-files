// 1. "Drop" trait lets you customize code when data is about to leave scope

// 2. "Drop" can be implemented on any type, usually work in pair with smart pointers

// 3. when data goes out o scope, compiler automatically inserts a drop invokation

struct CustomSmartPointer {
    data: String,
}

impl Drop for CustomSmartPointer {
    // drop method takes a mutable reference
    fn drop(&mut self) {
        println!("Dropping CustomSmartPointer with data `{}`!", self.data);
    }
}

fn main() {
    let c = CustomSmartPointer {
        data: String::from("my stuff"),
    };
    let mut d = CustomSmartPointer {
        data: String::from("other stuff"),
    };
    println!("CustomSmartPointers created");

    // result will be:
    //
    // CustomSmartPointers created
    // Dropping CustomSmartPointer with data `other stuff`!
    // Dropping CustomSmartPointer with data `my stuff`!

    // 1. .drop() cannot be manually called on a type, but you can call a helper from std,
    //     std::mem::drop which is different from .drop() method in Drop trait
    drop(d);
    println!("we dropped d");

    // result will be:
    //
    // CustomSmartPointers created
    // Dropping CustomSmartPointer with data `other stuff`!
    // we dropped d
    // Dropping CustomSmartPointer with data `my stuff`!
}
