#include <stdio.h>

int main() {
    // 1. relational operators are an expression produces either 0 or 1: <, >, >=, <=.
    //    usually they are used to test something inside an if statement
    printf("%d", 2 > 1); // will print 1, since 2 is greater than 1
    printf("%d", 2 < 1); // will print 0, since 1 is lower than 2
    // 1.1 precedence of relational operators are lower than arithmetic once and are left associative
    printf("%d", 1 + 2 < 3 - 1); // means (1 + 2) < (3 - 1)
    // 1.2 be aware of such tricks:
    //    here, it doesnet check if 2 is greater than 1 and smaller than 3, its (1 < 2) < 3,
    //    and since (1 < 2) produced 1 since 1 is smaller than 2 (which is true), then its 1 < 3, so
    //    dont chaing things like this, its not what you want most of the time.
    printf("%d", 1 < 2 < 3); 

    // 2. equality operators is an expression which test if something is equal to something else and,
    //    produces 1 or 0: ==, !=, usually used inside an if statemetnt
    printf("%d", 2 == 2); // here, it checks if 2 is equal to 2 as a value and produces 1(true)
    // 2.1 precedenceo fequality opeartors is lower than relational operators and is left associative:
    printf("%d", 2 < 3 == 3 < 4); // (2 < 3) == (3 < 4), 1 == 1, 1(true)

    // 3. logical operatos is an expression to create complex expression (usually inside if statements)
    //    which also produces 1 or 0: &&, ||, !.
    // 3.1 any non-zero operand will be treated as 1(true) and any zero operand as 0(false)
    //
    // 3.2 ! operator makes an expression 1 if its 0 and 0 if its 1:
    printf("%d", !0); // produces 1, since its 0
    printf("%d", !1); // produces 0, since its 1
    // 3.3 && operator checks if both expression are 1:
    printf("%d", 1 && 1); // produces 1
    // 3.4 || oeprator checks if either expression is 1 or both:
    printf("%d", 1 || 0); // produces 1
    // 3.5 && and || oeprators perform a "short-circuit" operation which means:
    // 3.5.1 && will check if left, expression is right, and only then evaluate the right expression,
    //       but if left expression, is false, it doesnte even start to evaluate the right expression and produces 0.
    // 3.5.2 || operator will check the left expression and if its true, it doesnt evaluate the right expression,
    //       since it needs only one true expression, but if left is false, it evalutates the right expression.
    printf("%d", (0 != 0) && ( 2 / 1 > 0)); // first expression (0 != 0) is false, the right expression is dropped.
    // 3.6 precedence:
    // 3.6.1 ! operator is unary, it has same precedence as unary + and - and is right associative
    // 3.6.2 && and || operators is lower than relational and equality operators and are left associative
    // 3.6.3 && has higher precedence than ||
    
}
