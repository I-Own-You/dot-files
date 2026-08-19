// 1. iterator patterns allows you to perform some task on a sequence of items in turn

// 2. iterator is responsible for the logic of iterating over each item and determining when the
//    sequence has finished.
//
//    tip: if you use builtin iterators, you dont need to manually implement that logic

// 3. iterators in rust are "lazy" which means they have no effect until you call methods that
//    consume the iterator to use it

fn main() {
    // 1. this code itself does nothing
    let v1 = vec![1, 2, 3];
    // 2. v1_iter now stores an iterator to v1 data
    let v1_iter = v1.iter();
    // 3. and now, for loop is using that iterator to take each item one by one
    //
    //    under the hood, for loop works on iterators everytime it can on any data
    for val in v1_iter {
        println!("Got: {val}");
    }

    // 1. all iterators implement a trait "Iterator" from std, it looks like this
    //              trait Iterator {
    //                  type Item; // dont look here yet
    //                  fn next(&mut self) -> Option<Self::Item>;
    //                  ...other code
    //              }
    // 2. this trait requires on all types to define only one method, "next" which must return one
    //    item at a time, wrapped inside Some(value) and if no more values, then None

    // 1. we can even call .next() on our iterators, but it must mutable sine calling .next()
    //    changes the internal structure which keeps track of where in the sequence the data is.
    let v1 = vec![1, 2, 3];
    // .iter() actaully returns an immutable references to values of data
    // .iter_mut() returns a mutable references to values of data
    // .into_iter() would take ownership of data and return owned values
    let mut v1_iter = v1.iter();
    v1_iter.next();
    // the for loop behind the scenes takes the ownership and makes it mutable implicitly

    // 1. Iterator trait provides a lot of methods where a lot of them call "next()" which means
    //    they are "consuming adapters" which means they use the iterator up and exhaust it
    let v1 = vec![1, 2, 3];
    let v1_iter = v1.iter();
    let total: i32 = v1_iter.sum(); // v1_iter is moved and also consumed by .sum()
    //
    // 2. "iterator adapters" - methods on "Iterator" trait which dont consume the iterator, instead
    //    they change the original iterator wihtout consuming it and giving back a new iterator
    let v1: Vec<i32> = vec![1, 2, 3];
    // but here is a catch, iterators are lazy, .map() method gets the closure but it wont do
    // anyhting with it, for it to consume and execute the closure, the iterator must be consumed
    v1.iter().map(|x| x + 1);
    // .collect() method helps us by consuming the iterator (takes ownership) and gives the result back;
    //
    //  the type of the variable in our case is Vec<_> so we omit the vector type, why ? because the
    //  .collect() method doesnt care about the result type, it cares about the type and data of the
    //  iterator it was invoked on, in our case it goes from the original type "v1" which alreay
    //  has a type, so .iter() and .map() already work on a known type so .collect() knows the type too
    //
    //  this way, you can chain a lot of iterators that return another iterator and so on, but
    //  remember to consume the iterators since they are lazy. 
    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();
    // you might stil ask, where does |x| comes from ? from the closure environment!
    // where is its environment ? in our case it comes from .iter() which .map() takes and gives to
    // our closure to use.
}

// performance:
//
// choosing between loops or iterators in rust is more of a style choice than performance wise,
// since iterators under the hood in many cases are compiled into roughly the same
// low level instructions as loop or manually written in assembly.
//
// ierators in rust are 0-cost-abstractions under the hood, so choose whatever you like more, but
// if you notice it takes too much time, still test a for loop version or anything else and adjust
// as needed.
