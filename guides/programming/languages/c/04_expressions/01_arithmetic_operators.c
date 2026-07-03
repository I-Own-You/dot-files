// 
// 1. unary plus: +, -
// 2. binary: (they are called binary since it rquires 2 operands instead of 1)
//           1. additive:        +, -
//           2. multiplicataive: *, /, %

#include <stdio.h>

int main() {
    int a, b, c, d;
    // 1. unary opeartors
    // 2. a == 1, this example does nothing in fact, "+" in front of a number means number itself,
    a = +1; 
    // 1. b == -1, "-" in front of a positive number makes it negative.  
    b = -a;
    // 1. / operator on integer types drops the decimal part no matter of storage type you assign to
    c = 1 / 2;
    // 2. % operator requires both integers or it wont compile
    d = 12 % 5; // d == 2, since 12 / 5 = 7 / 5 = 2, basically how many times you can fit 5 and the rest is the result
    
    // you cant divide/remaind by 0, it results in UB
    // int error_1 = 1 / 0;
    // int error_2 = 1 % 0;
    
    // division/remainder with negative numbers is tricky, the final result is dependent on the C core
    // implementation, and compiler, you should always avoid code which relies on undefined implementations.

    // you can grouup operands with operators and put parantheses to know its order of execution,
    // but if there are not, there are rules of precedence, like this:
    // 1. highest: (unary operators: +, -), no matter the order of them
    // 2. middle: (binary opearators: * / %), no matter the order ofthem
    // 3. lowest: (binary opeartors: +, -), no matter the order of them
    int strange_example = - + 1; // equivalent to -(+1)
    
}
