#include <stdlib.h>

// 1. a pointer can be restricted, which means if p points to an object that is later modified,
//    then the object can be accessed only through p pointer

// 2. having more than 1 way of accessing an object is called: "aliasing".

int main() {

    int *restrict p;
    int *restrict q;

    p = malloc(sizeof(int));

    // now, "p" and "q" are aliases, "p" to the memory of malloc returned, "q" to the same memory through "p"
    q = p;

    // UB, we have a seaparate restrict "q" which attempts to modify the same object another,
    // previous restrict pointer was assigned to, if "q" would be without "restrict" then you could,
    // modify it, but again, if you pass a pointer of a variable to a function and one argument has "restrict"
    // and second doesnt, they both are independent pointers and attempting to modify the variable,
    // through both pointers will cause UB (its a very hard theme in C, so jsut avoid it)
    *q = 0;
}

// restrict is used mostly for optimizations where you help C compiler to understand,
// which pointers are modifed only by one pointer and not a lot of them which point,
// to the same memory but except for that, its not used, so just now it exists, thats it.
