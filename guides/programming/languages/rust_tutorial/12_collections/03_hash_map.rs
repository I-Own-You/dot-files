// 1. hash map - stores a mapping of keys of some type to values of some type using a hashing
//               function which determines how keys,values are placed in memory

// 2. hash maps are usually used when you need to access some value not with an index but with
//    a key whatever type it could be

fn main() {
    use std::collections::HashMap;
    // 1. one of the way to create a hash map is by using ::new of HashMap
    let mut scores = HashMap::new(); // you need a type for HashMap unless its mutable and you add
    //                                  a key-value pair later and when you do, the type of the
    //                                  HashMap will be HashMap<FirstKeyInsertedType, FirstValueInsertedType>  

    //
    // 2. then, by using .insert() method on a hash map we can insert new key-value pairs
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    // 1. we can use .get() method to get a value using a key
    // 2. since .get() returns Option<&V> then
    // 3. .copied() maps Option<&V> into Option<V> (copies it)
    // 4. .unwrap_or(0) gets the value .copied() returned (from Some(&v) previously) and if it
    //    returned None, 0 is returned instead
    let score = scores.get(&team_name).copied().unwrap_or(0);

    // 1. we can iterate over a hash map using a for in
    for (key, value) in &scores {
        println!("{key}: {value}");
    }
    // note that you cannot omit key or value, but you can replace either with "_" which
    // lets you not use it and not cluttering namespace inside your for loop

    // 1. ownership works for hash maps too
    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");
    let mut map = HashMap::new();
    map.insert(field_name, field_value);
    // here, field_name and field_value are gone, dropped and "map" variable now owns them as keys
    //
    // 2. if you want to store references, you will need to take into account the "lifetime",
    //    a concept discussed later, but basically the "reference" you pass must be alive at least,
    //    as the hash map is alive.
    let mut map2: HashMap<&str, &str> = HashMap::new();
    let key_name = String::from("Ana-Key");
    let key_value = String::from("Ana");
    // drop(key_name); // will cause error, key_name is gone but used inside map2
    map2.insert(&key_name, &key_value);

    // 1. since a hash map can have only 1 unique key, inserting the same key with some value,
    //    will basically erase the previous value and store new one
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Blue"), 25);
    //
    // 2. what if you want to add a key-value only if key is not present ?
    //
    //    1. .entry() takes a key and returns an enum called "Entry" which represents a value that
    //                exist or not
    //    2.  .or_insert() returns a mutable reference to the value for the Entry key if it exists
    //    2.1 if the key doesnt exist, it inserts the value from .or_insert(value) for the key and
    //        returns a mutable reference for this new value
    let mut scores = HashMap::new();
    scores.entry(String::from("Yellow")).or_insert(50);
    scores.entry(String::from("Yellow")).or_insert(100); // wont change the value
    scores.entry(String::from("Blue")).or_insert(50);

    // a cool technique to count words in text
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{map:?}");

    // by default, the hash fucntion implementation is SipHash, its not the fastest but the tradeoff
    // is the security.
    //
    // if you need another hash functionality you need to specify another "hasher";
    // a "hasher" is a type that implements "BuildHashser" trait
}
