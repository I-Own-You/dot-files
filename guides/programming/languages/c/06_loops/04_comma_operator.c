#include <stdio.h>

int main() {
    // 1. "," operator basically allows us to "glue" expression where first expression is evaluted, then its value,
    //    is discarded, second expression is evaluated and becomes the value of both expression.
    //    it also means that if there are more than 2 epxressions glued, then all are evaluated and discard,
    //    but last will become the value of all glued expressions.
    
    int i = 1, j = 5;
    printf("what number is here ? its: %d\n",(++i, j + i)); // i = 2, j = 7, printf will output 7
    
    // 2. precedence of "," is the lowest among all C operators, being also left associative.
    
    // 3. "," operator is ually used only in first and third expressions of for loop where,
    //    we can skip initialization of a variable outside the loop and update them also:
    for (int sum = 0, step = 5; sum < 100; sum+=step, step+=5) {
        printf("sum is: %d, step is: %d\n", sum, step);
    }
    // 3.1 "," is not useful in second expressioin of for loop since it  will evaluate but,
    //     discard everything until last expression which will be the actual evaluation of true/false
}
