#include <stdio.h>

// 1. an array, actually, can have any amount of dimensions.

int main() {
    // 1. defining a multidimensional array with 5 rows and 9 elements within each
    // row:
    int m[5][9]; // 5 rows and 9 colums, [ [], [], [], [], [] ] with 9 elements inside each "[ ]"
    printf("%d", m[0][1]); // second element within first row

    // 2. we can initialize a multi. dim. array as well as a single array
    int init_m[5][9] = {{1, 1, 1, 1, 1, 0, 1, 1, 1},
                        {0, 1, 0, 1, 0, 1, 0, 1, 0},
                        {0, 1, 0, 1, 1, 0, 0, 1, 0},
                        {1, 1, 0, 1, 0, 0, 0, 1, 0},
                        {1, 1, 0, 1, 0, 0, 1, 1, 1}};
    // 2.1 all the rules of initializing an array from single aray also works for multi. dim.
    // 2.2 a particular exception is that we can omit braces { } when initializing an array,
    //     but its very confusing, and if you put more or less values, it can produce,
    //     very confusing results, AVOID THIS.
    int init_m_without_braces[5][9] = {1, 1, 1, 1, 1, 0, 1, 1, 1,
                                       0, 1, 0, 1, 0, 1, 0, 1, 0,
                                       0, 1, 0, 1, 1, 0, 0, 1, 0,
                                       1, 1, 0, 1, 0, 0, 0, 1, 0,
                                       1, 1, 0, 1, 0, 0, 1, 1, 1};
}
