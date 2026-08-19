// if let construction allows to match against a single pattern but ignoring all the other ones;
// its mainly needed to not use match since its too verbose for single case;

// you should use if let only for single cases since it works only with matching 1 patter,
// but you loose the "exhaustive" pattern matchign of "match" where you must match against all
// posibilities, so which one should you use you must decide yourself.

fn main() {
    let config_max = Some(3u8);
    // straighforward right ? but its kind of, useless for second match since we dont even use it
    match config_max {
        Some(max) => println!("The maximum is configured to be {max}"),
        _ => (),
    }
    // this is way better, riht ?
    //
    // 1. config_max must exist before if let construction and be of Option<T> type in our case,
    //    since we use Some()
    // 2. Some(max) is the pattern we match against
    // 3. max binds to the value inside Some() which then can be used inside the code block
    if let Some(max) = config_max {
        println!("The maximum is configured to be {max}");
    }

    // you can also have an "else" block in "if let" construction which resembles the "catch all"
    // matches in "match" which executes only if the previous "if let" pattern didnt match
    if let Some(max) = config_max {
        println!("The maximum is configured to be {max}");
    } else {
        // do whatever you want with config_max or with anything else
    }

    // "if let" is also an expression so can return values
    let x = Some(5);
    let nr = if let Some(5) = x {
        5
    } else {
        55
    };

    // rust also has "let else":
    // 1. which basically lets you bound a value right away instead of returning it
    // 2. or if the pattern is not matched, returning from it (inside the function it is defined),
    //    so if you are main, you will exit main actaully
    // 3. you can do whatever you want in else but you still have to return from else
    let x = Some(8);
    let Some(nr) = x else {
        return;
        // return (); // same as above
        
        // you cannot return None since we are in main() and it expects a unit return type
        // return None;
        
        // a function with Option<T> return type can have a return type of None
    };
    println!("{nr}");

    // if you use if let / let else / match with complex types and for example an enum which,
    // has a tuple variant, you would need Enum::Kind(0,2,5) or Enum::Kind(_,_,_) or even,
    // a more powerful approach, skipping some value Enum::Kind(0,_,5)
    
}
