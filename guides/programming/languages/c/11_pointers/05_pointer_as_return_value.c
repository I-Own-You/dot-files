#include "stdio.h"

// 1. we can also return pointers from a function, not only take them as parameters, with some rules:
//    1. the object return must exist outside the function (no local variables can be returned unless you want UB),
//       so: static local variables, external variables, pointer variables(as parameters)

// 2. you can also return a memeory address of an element inside an array since array as a parameter passed,
//    is actually a pointer itself which points to first element

int *max(int *, int *);

int *return_middle_of_arr(int n, int[n]);

int main() {
    int *p, i, j;

    p = max(&i, &j);

    int arr[5] = {1,2,3,4,5};
    // 1. now you can modify the middle element of the arary
    int *p_5_elem = return_middle_of_arr(5, arr);
    *p_5_elem = 5;
    printf("%d\n", *p_5_elem = arr[5/2]); // 1
    printf("%d\n", &arr[5/2] == p); // 1
}

// 1. you put "*" before function name
int *max(int *a, int *b) {
    if (*a > *b)
        // 1. you return the memory address itself
        return a;
    else
        return b;
}

int *return_middle_of_arr(int n, int a[n]) {
    // 1. you return the memeory address of the middle element inside the array which means, a pointer,
    //    outside the functioin can modify a[n/2]
    return &a[n/2];
}
