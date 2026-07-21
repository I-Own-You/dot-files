#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. malloc/calloc/realloc obtain their memory blocks from a storage pool known as "heap"
// 1.1 calling these functions too often or asking for large blocks of memory exhaust that "heap" which,
//     causing it to return a null pointer

int main() {

    // allocate memory
    int *p = malloc(sizeof(int));
    // allocate memory
    int *q = malloc(sizeof(int));
    // make p point to q, what happens to memory allocated for p ?
    // GONE FOREVER -> you cant use anymore -> GARBAGE -> wasted memory -> heap exhaustion
    //
    // a program leaving garbage behind is has a "memory leak"
    p = q;

    // 1. but there is actually a wait to prevent such leaks, using the free function,
    //    the only argument of free function is a pointer of previously allocated memory,
    //    ONLY WITH: malloc/calloc/realloc otherwise UB, passing a null pointer has no effect
    int *a = malloc(sizeof(double));
    int *b = malloc(sizeof(double));
    // memory released, we made a "dangling pointer"(memory is no longer owned by our code)
    free(a);
    // accessing/modifying a dealocated memory is UB
    *a = 5; //           do not do this!!
    printf("%d", *a); // do not do this!!
    // "a" itself points to the same memory it pointed to, but memory is no longer owned by our code
    // which means its safer to add a = NULL afterwards(which removes dangling pointer)
    a = NULL;
    // actally, if you try to modify "a" now, after you set NULL, usually something like this will happen:
    // 1. segmentation fault
    // 2. access violation
    // which means our program tries to access memory it doesnt have rights on, its also UB, as without a = NULL,
    // but its safer because modifying a null pointer usually crashes your  program which means,
    // 
    // instead of "quiet" dangling pointer free(my_pointer) which can give bugs we have a my_pointer = NULL,
    // which gives obvious and evident bug since my_pointer = NULL means my_pointer = 0x0(the null pointer)
    // and most OS protects 0x0 this memory block from being accessed,
    // 
    // it actually doesnt have to be a null number, its just a special value of nullable pointer, but usually 0x0
    //
    // now, safer
    a = b;
    
}
