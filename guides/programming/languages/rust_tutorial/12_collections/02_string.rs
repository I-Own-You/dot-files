// 1. string - collection of bytes

// 2. rust has only 1 core string type: str
// 2.1 String is actually a collection provided by the std library which can grow/shrink/owned,
// 2.2 and yes, String is stored on the heap
// 2.3 and String is also utf8 encoded as &str is

// 3. when you refer to string, you either refer to &str or String

// 4. String collection is actaully implemented as a Vec<u8> but with extra:
//    guarantees, restrictions, capabilities.


fn main() {
    // 1. this is how you create a mutable string
    let mut s = String::new(); // its empty for now

    // 2. if you have initial data, you can use .to_string() method on any type that
    //    implements Display trait because all string literals implement them
    let data = "abcd";
    let str1 = data.to_string();
    let str2 = "abcd".to_string(); // also works
    //
    // 2.1 you can also use String::from() function which is equivalent to .to_string()
    let str3 = String::from(data);
    let str4 = String::from("abcd");

    // 1. string are utf8 encoded characters, it will keep and display right utf8 symbols
    let hello = String::from("السلام عليكم");
    let hello = String::from("Dobrý den");
    let hello = String::from("Hello");
    let hello = String::from("שלום");
    let hello = String::from("नमस्ते");
    let hello = String::from("こんにちは");
    let hello = String::from("안녕하세요");
    let hello = String::from("你好");
    let hello = String::from("Olá");
    let hello = String::from("Здравствуйте");
    let hello = String::from("Hola");

    // 1. you can push into String with push_str or push
    let mut str5 = String::from("ab");
    str5.push_str("cd");
    let data = "ef";
    str5.push_str(data);
    //
    str5.push('f');
    let chr1 = 'g';
    str5.push(chr1);

    // 1. you can concatenate string with either: + or format! macro
    // 
    // "+" works by taking the first String data ownership and enforcing you to give only references
    //     to String or &str directly after "+" and returns String type.
    // 
    //     it works like this because the "+" operator uses interally "add" method which is a
    //     generic method for multiple data types and in case for String it looks like this:
    //
    //     fn add(self, s: &str) -> String { code }
    //
    //     as you see, self lacks & which instantly takes ownership, rest parameter is &str,
    //     internally it takes a lot of parameters actually but they all are &str anyway
    //
    //     so its kind of not that easy to spot behaviour when using "+" for string
    //
    //     tip: "+" operator is more efficient than copying a string.
    let s1 = String::from("Hello, ");
    let s2 = String::from("world!");
    let s3 = s1 + "-" + &s2; // note s1 has been moved here and can no longer be used, 
    //                          result: Hello, -world!
    //
    // "format!" works the same as println! macro but insead of printing, it formats the string,
    //           and just returns it as String type, all the string inside it takes as references: &str,
    //           so it doesnt take any ownership
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let s = format!("{s1}-{s2}-{s3}");
    
    // 1. rust doesnt allow indexing into string, since they are utf8 encoded, some utf8 symbols
    //    could take more than 1 byte, and making string[0] when the first symbol is actually a
    //    3 byte utf8 encoded symbol would give what ? the symbol, the first byte from overall 3 bytes?
    //
    //    this is why rust restrict such thing, but there are ways to find symbols that you need
    //    with the usage of methods on strings or doing it manually(dont do it manually):
    //
    // 2. but rust allows you to look at string from its language perspective in 3 ways:
    //    for example indian word: नमस्ते”
    //    1. bytes: [224, 164, 168, 224, 164, 174, 224, 164, 184, 224, 165, 141, 224, 164, 164, 224, 165, 135]
    //    2. scalar value(char): ['न', 'म', 'स', '्', 'त', 'े'] 4 and 6 are diacritics, not even
    //                                                        symbols we would need to think of
    //    3. grapheme clusters(letters basically): ["न", "म", "स्", "ते"]
    //
    // 3. you can use slices to take bytes from the string and store them in a variable
    //    which then can be used as utf8 letters
    let hello = "Здравствуйте";
    let s = &hello[0..4]; // Зд
    // 3.1. but be cautious, if you start or end on a malformed position of 2+ byte symbol,
    //    rust will panic
    let s1 = &hello[0..3]; // error, cyrillic letters take 2 bytes
    let s2 = &hello[1..4]; // error, cyrillic letters take 2 bytes
    //
    // 4. how can you access then strings safely with utf8 in mind ? by using builtin functions
    //    defined on strings:
    //
    //    you cannot use string literals or String type data, they are not iterators themselves
    for b in "Здравствуйте - kek".bytes() {
        println!("{b}"); // will print bytes one by one
    }
    for chr in "Здравствуйте - kek".chars() {
        println!("{chr}"); // will print as chars, so a valid utf8 symbol range
    }
    // 
    // what about getting letters ? we know chars have diacritics, they are not useful right ?
    // implementing a functionality for letters is hard, so you sould look into crates.io for it
    
}
