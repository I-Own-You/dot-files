// 1. one way of a safe concurrecny is message passing where threads communicate by sending each
//    other messages containing data
// 1.1 to achieve this techniqe rust std has an implementation of "channels"
// 1.2 "channel" - a general programming concept by which data is sent from thread to thread
// 1.3 a "channel" has:
//          1. transmitter - the one giving data
//          2. receiver - the one getting data
// 1.4 "channel" is closed if either transmitter/receiver is dropped

// mpsc - multiple producer single consumer
//
// rust implements channels by allowing multiple senders but only 1 receiver
use std::{
    sync::mpsc::{self, Receiver, Sender},
    thread,
    time::Duration,
};

fn main() {
    // 1. mpsc::channel() creates a new channel.
    // 2. mpsc::channel() returns a tuple of (Sender<T>, Receiver<T>)
    let (tx, rx) = mpsc::channel();

    // 1. we use "move" for the closure so that "tx" transmitter will be moved to the other thread
    //    because to send data over threads it needs to own the transmitter so it could be sure that
    //    other threads wont have access to it
    thread::spawn(move || {
        let val = String::from("hi");
        // 1. here, we try to send data to the receiver using .send() method
        // 2. .send() takes data and returns a Result<T, E> because sending data can fail because of
        //    variours reasons, one of them is receiver being dropped and we getting an error,
        //    in our case it will panic since we use .unwrap() but in real program we would hanle it
        tx.send(val).unwrap();
    });

    // 1. a receiver has .recv() and .recv_try()
    // 2. in our case, .recv() will block the current thread ("main" in our case) and wait until a
    //    value is sent onto the channel
    // 3. once value is sent, it will be wrapped inside a Result<T, E> and returned
    // 4. if the transmitter closes, .recv() will return an error Result<T, E> which means no more
    //    value will be sent
    // 5. if we would use .try_recv(), then the current thread will not be blocked, instead it will
    //    get a returned value Result<T, E> where Ok() would mean there was a value on a chanel
    //    waiting to be received or there was no value at the moment to be sent.
    //
    //    .try_recv() is useful because it doesnt stop the current thread which means we can get
    //    data from a transmitter(if it has it) inside a loop and let other work be done
    //
    let received = rx.recv().unwrap();
    println!("{received}");

    // 1. ownership rules works for thread as well
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let val = String::from("hi");
        // 1. we move "val" here by sending it over a channel
        tx.send(val).unwrap();
        // 2. we try to use the moved "val" here, error
        println!("val is {val}");
    });
    let received = rx.recv().unwrap();
    println!("Got: {received}");

    // 1. we could clearly show that 2 threads are talking to eachother
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];
        // 2. here we send values from our "vals" vector into the channel
        for val in vals {
            tx.send(val).unwrap();
            // 3. we wait 1 second between each send
            thread::sleep(Duration::from_secs(1));
        }
    });
    // 4. here, we receive the value from the channel
    //
    //      1. for-loop treats the receiver here as an iterator
    //      2. .recv() is called implicitly on the receiver
    //      3. current thread is blcoked because of implicit call to .recv()
    for received in rx {
        println!("Got: {received}");
    }

    // 1. lets implement multiple transmitters for a single receiver
    let (tx, rx) = mpsc::channel();
    // 2. we make a clone of our oriignal transmitter which returns a new related to the channel Sender<T>
    // 2.1 everything else remains the same
    let tx1 = tx.clone();
    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];
        for val in vals {
            tx1.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
    thread::spawn(move || {
        let vals = vec![
            String::from("more"),
            String::from("messages"),
            String::from("for"),
            String::from("you"),
        ];
        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });
    for received in rx {
        println!("Got: {received}");
    }
}
