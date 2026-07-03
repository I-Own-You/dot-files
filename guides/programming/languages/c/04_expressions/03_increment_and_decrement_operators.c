// 1. increment and decrement operators are a way to add or substract 1 from its value,
//    but they are very tricky.
// 2. they have 2 forms:
//                      1. prefix: --5, ++5
//                      2. postfix: 5--, 5++

#include <stdio.h>

int main() {
    int a = 1;
    
    // 1. prefix "yields" the variable, increments it right away and assigns it to the variable
    printf("a is: %d\n", ++a); // 2
    printf("a is: %d\n", a);   // 2
    // 2. postfix doesnt "yield" the variable right away but rather its value, increments it,
    //    and assigns it afterwards, on the next line (kind of).
    //    there isnt a timing as "when" the new value will be assgined to the variable but,
    //    its safe to say that before the next statement executes the variable will be upated.
    printf("a is: %d\n", a++); // still 2
    printf("a is: %d\n", a); // 3, now it assigned the value
    // -- opeartor works the same.

    // 1. postfix: [value]++, [value]-- are left associative and higher precdence than unary +, -
    // 2. prefix:  ++[value], --[value] are right associative and same precedence as unary +, -
    
    // in modern world compilers, ++, -- are not faster than v = v + 1 by any mean.
}
