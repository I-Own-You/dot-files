#include <string.h>

// 1. dynamic storge allocation - ability to locate storage during program execution, it means
//    we can have data structures that can grow/shrinnk as needed

// 2 dynamic storage allocation can be used for every type of data, but its mainly used for: strings, array, structures

// 3. there are 3 functions responsible for dynamic storage allocation:
//    1. malloc - allocates a block of memory but doesnt initialize it
//    2. calloc - allocates a block of memory but clears it
//    3. realloc - resize a previously allocated block of memory
//
//    malloc is the most efficient since calloc clears the memory it allocates
//
// 3.1 a block of memory doesnt know the type it will store, so you cant assign the result of,
//     one of those functions to a simple type like int, double, array, string, .etc, instead,
//     one of those functions returns a special type: void* which is basically a generic pointer(just a memory address)
// 
// 3.2 there will always be a posibility taht one of those 3 functions wont be able to locate a block of memory,
//     which means it will return a NULL POINTER, its a pointer to nothing, a special value that can be,
//     distinguished from other pointers which you can test with NULL constant (its just a macro like this ((void*)0)  ),
//     accessign a pointer through NULL POINTER is UB

int main(void) {
    // 1. here is how you can test for NULL pointer
    int *p;
    //
    // pointer test true or false the same numbers do, all none null pointers are true, except null pointers 
    if (p) {
        // here actually its neccessary ";" but its put by the compiler anyway so better put it
    }
    if(p != NULL) {
        ;
    }
    if (!p) {
        ;
    }
    if (p == NULL) {
        ;
    }
}
