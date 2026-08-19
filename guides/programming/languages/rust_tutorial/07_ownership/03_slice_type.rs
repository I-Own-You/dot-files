// 1. slice - reference of a contiguous sequence of elements in a collection,
//            so it doesnt have an ownership by default

fn main() {
    let mut s = String::from("hello world");
    // 1. word will contain 5, since ' ' is on 5 index which is returned by first_word func,
    let word = first_word(&s);
    // 2. .clear() empties the string which makes its length 0, but the word has 5,
    //    they are out of sync, they are not even related in the first place, this is bad
    s.clear(); 
    println!("{word}");

    // 1. to fix above issue, Rust provides slices
    // 2. internally, slice data stores:
    //    1. starting position (which is the start index inside [])
    //    2. length of the slice (which is the end index - start index inside [])
    //
    //    there is obviously a pointer that points to the underlying string under the hood,
    //    which points at the base memory address of the string + start index, like s + 0 or s + 6,
    //    so its not a new heap data, its a new reference to taht heap data
    //    
    // 3. now, here, we will have an error if we try to take a slice on a range,
    //    that is no longer valid in length, and it will persist if the underlying value changes "s"
    let hello = &s[0..5]; // 0 start (inclusive), 5 end
    let world = &s[6..11]; // 6 start (inclusive), 11 end
    // 3. you can drop the start index and it will default to 0
    let start_default = &s[..5];
    // 4. you cant drop the end index as well and it will default to string.len()
    let end_default = &s[0..];
    // 5. you can even drop both start/end indexes to take a slice of whole string
    let whole_string = &s[..];
    // there is an important rule for Ranges when it come to slice:
    //      1. if you create a slice in a middle of a multi-byte character (unicode symbol 2+bytes)
    //         either from start or end indexes, the program will crash with an error at runtime

    // 1. now, since you have the slice version of function, you return a slice, and its immutable,
    //    and then you try to do s.clear() which clearly wants "s" as mutable but you have an
    //    immutable slice poiting to it, so its a logic error wanting to empty the string,
    //    which will imply destyroying the immutable slice referencing "s"
    let mut s = String::from("hello world");
    let word = first_word_slice(&s);
    s.clear(); // error, but only because you use the slice above in a function below
    println!("{word}"); // but if you comment this, or never use the immutable slice referencing 
                        // then s.clear() above wont produce error
    // 2. so the impoetant thing here is:
    //     1. rust disallows mutable reference(s.clear) and the immutable reference (in our case slice)
    //        from existing at the same time, its illogical to remove something which is tracked by
    //        other something which cannot be even changed (even if it can be changed, it wont work)

    // 1. now, the culmination, string literal itself is a slice.... yes... it has &str type...,
    //    this is why you cant change them, string literal is a reference to the memory block,
    //    which contains data "hello world" and is actually stored inside program read-only memory block
    let s = "hello world";
    // 2. and now, since you have a more general function parameter, the maddnes beggins:
    let my_string = String::from("hello world");
    let word = first_word_slice_literal(&my_string[0..6]);
    let word = first_word_slice_literal(&my_string[..]);
    let word = first_word_slice_literal(&my_string); // passing a whole reference to a String type means you
                                                     // access the data "my_string" holds on the heap which
                                                     // means "hello world" in our case which is a
                                                     // string literal itself which is a slice,
                                                     // which means we can just pass it as a reference but,
                                                     // with & in front since its defined as String type
    let word = first_word_slice_literal(&my_string[..]); // same as above
    // string literal usage
    let my_string_literal = "hello world";
    let word = first_word_slice_literal(&my_string_literal[0..6]); // & is needed for new slice
    let word = first_word_slice_literal(&my_string_literal[..]);
    let word = first_word_slice_literal(my_string_literal); // works without & since its already a slice
    let word = first_word_slice_literal(&my_string_literal[..]); // same as above in case of a
                                                                 // literal itself
}

fn first_word(s: &String) -> usize {
    // 1. we convert our string into a collection of bytes
    let bytes = s.as_bytes();

    // 2. we take the index and the byte reference from the .iter() which gives each element,
    //    and then .enumerate() (an iterator which packs elements in a tuple
    //                           with its index position in a collection and a reference to the value)
    //    and just destructure the tuple into 2 variables: index and reference to the value
    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            // 3. we return the index of the found character, which is space
            return i;
        }
    }

    s.len()
}

// 1. now we redefine the above functioin with the knowledge of a slice data
//
// &str type is defined as "slice type"
fn first_word_slice(s: &String) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            // 1. now, we return a slice with the actual word
            return &s[0..i];
        }
    }

    // 2. but here, if no ' ' was found we return a slice of whole word
    &s[..]
}

// 1. now, since you know string literals are itself slices, you can make your parameters,
//    more general which can take both slices and String types:
//    1. when you pass a slice(string literal) you can pass it right away or as a new slice &var_name[start..end]
//    2. when you pass a String type, you just pass a slice like &var_name[start..end] or &var_name
fn first_word_slice_literal(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            // 1. now, we return a slice with the actual word
            return &s[0..i];
        }
    }

    // 2. but here, if no ' ' was found we return a slice of whole word
    &s[..]
}
