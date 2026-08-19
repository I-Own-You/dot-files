// 1. rust has 3 type of loops: loop, while, for

fn main() {
    // 1. loop executes code indfinetly until you stop it
    loop {
        println!("hey");
        // 1. this loop will execute forever, but you can use "break" to exit it,
        //    or "continue" to skip all the code below and go to next loop iteration
        // 2. break and continue works on the innermost loop at 1 level, so if you have 5,
        //    nested loops and you have either break/continue inside the innermost, it will,
        //    break/continue from innermost up by 1 loop at a time, not all of them
        if true {
            break;
        } else {
            continue;
        }
    }

    // 1. you can also return from a loop either with break or return
    let mut counter = 0;
    let result = loop {
        counter += 1;

        if counter == 10 {
            // 1. this way you can terminate a loop and return a value from it
            break counter;
        }

        // 1. you cant return from a loop with an expression like this since loop return type,
        //    is always ()
        // 5 // error

        // 1. since you can use "return" inside a loop, the only thing it will do is,
        //    stop the loop and exit not only the loop but also the function its within,
        //    in our case "main"
        // return;
    };
    println!("Result is: {result}");

    // 1. you can actaully have loop labels which you can then break/continue,
    //    labels are created with: 'label_name: loop {}
    let mut count = 0;
    // 'counting_up is a label
    'counting_up: loop {
        println!("count = {count}");

        let mut remaining = 10;

        loop {
            println!("remaining = {remaining}");

            if remaining == 9 {
                // 1. this will exit the current loop only
                break;
            }
            if count == 2 {
                // 1. this means we break the 'counting_up loop which is outside current loop
                break 'counting_up;
            }
            remaining -= 1;
        }

        count += 1;
    }
    println!("End count = {count}");
}
