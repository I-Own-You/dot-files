#include <stdio.h>

// 1. C provides 2 operators to work with memory:
//    1. &(address) - to find a memory address of a variable, int x; &x = address of x in memory
//    2. *(indirection) - gain access to an object that pointer points to, int *p = &x; *p = x itself

int main() {
    int i;

    // 1. creating a pointer reserves space for this pointer of type int, but it doesnt point,
    //    to anything yet, but it still dose occupy space.
    // 2. its crucial to create a pointer before you use it
    int *p;

    p = &i; // p points to i know, p is an adress which is the same one as &i

    // 1. you can actually combine them for structure, but same thing in the end
    int j = 0, *pp = &j;

    // 1. to access the actual value from an address you use "*"(indirection), this will print,
    //    the value of that memory address and not the address itself.
    printf("%d\n", *pp);

    // 1. actaully "*" is kind of reverse of "&", so *pp above is like an alias
    printf("%d\n", *&j); // (*(&j))

    // 1. so p hold the address of j right ? since they both hold the same address in memroy,
    //    it means modifying either variable which holds the address will update both
    int k, *b = &k;
    printf("%d\n", *b); // since k wasnt given a value, both *b and k have garbage value that is taken,
                      //   from the memroy address which it was reserved for "k" variable
    k = 2;
    printf("%d %d\n", k, *b); // both print 2
    *b = 5;
    printf("%d %d\n", k, *b); // both prints 5

    // 1. you must never access a raw pointer without assigning a memeory address ot it first:
    int *raw_pointer;
    printf("%d", *raw_pointer); // what will happen ? UB
    *raw_pointer = 2; // UB: if somehow our pointer contains a valid address, it could modify,
                      //     data at that address(which is reserved for something else)
    
    
    // 1. pointer variable itself has a different address then what it points to, though,
    //    you will also get a warning from compiler since you compare address of what holds an address,
    //    so its like double indirection
    printf("%d\n", &b == &k); // 0
    // 1.1 but indirecting the address of pointer variable itself give the value of pointer variable,
    //     which is the memory address it points to
    printf("%d\n", *&b == &k); // 1
    // 1.2 taking the address of the k variable through the indirected pointer is also possible,
    //     since *b is the actuall k itself(adress in memory)
    printf("%d", &k == &*b); // 1
}
