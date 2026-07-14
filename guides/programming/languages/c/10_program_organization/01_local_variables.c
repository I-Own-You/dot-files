#include <stdio.h>

// 1. local variable:
//    1. defined inside a function is known only to that function
//    2. has automatic storage duration (means the lifecycle of the variable is automatically handled by C),
//       which means after function returning the value is automatically freed of resources by C, which also,
//       means that executing the function again, wont give you the old value inside it.
//    3. block scope, which means its seen inside its scope, usually a function ending, also,
//       if you have a { } inside a function, its also creating a scope
//    4. are created everytimie a function copy is executed on recursive usage
//
// 2. static local varaibles: (with "static" before variable type)
//    1. has a static storage duration which means it has a permanent duration through the whole program,
//       execution which means if you call function multiple times, the value will be persisted,
//    2. it still has block scope, so other functions will not be able to use it, so its a way to hide,
//       data from other function but still persists it and use it for future calls
//    3. dont create new variables for recursive functions, its shared among all copies of function, why ?
//       because the variable declared "static" is created before even the function is invoked,
//       so its "global" but local scope within the function

// 3. parameters:
//    1. have automatic static duration
//    2. have scope within its function

void lol() {
    // 1. value will be persisted untill program finishes
    static int a = 0;
    a++;// 1 2 3 4 5
    printf("%d",a); // 1 2 3 4 5
}

int main() {
    lol(); // 1
    lol(); // 2
    lol(); // 3
    lol(); // 4
    lol(); // 5
}
