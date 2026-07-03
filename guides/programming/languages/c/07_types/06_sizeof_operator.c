#include <stdatomic.h>
#include <stdio.h>

// 1. C provides a way to determine the amount of bytes a value rquires to be stored,
//    "sizeof" operator like so: sizeof (type-name)

// 2. sizeof can be applied to constants, variable and expressions.

// 3. precedence of sizeof is as unary operators + and - so sizeof i + j is actually (sizeof i) + j
// 3.1 you can drop paranthesis but its a good readability to always have them.

// 4. value of sizeof is guaranteed to be unsigned int and higher

// 5. sizeof cant determine the value of a type only in once case:
//    variable-length array, because the number of elements may change during runtime.

int main() {
    // 1. displaying a value of sizeof requires usage of %z placeholder and followed by a letter,
    //    which represents an integer code(usually "u" for unsigned)
    printf("Size of int: %zu\n", sizeof(int));
}
