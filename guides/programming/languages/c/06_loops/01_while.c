

#include <stdio.h>
int main() {

    int i;
    int n = 10;

    // 1. while loop is a form of loop which allows to run code if the expression inside ( ) is evluated as true(1),
    //    and finished when expression evaluates to false(0).
    // 2. after the ) goes the "body" of the loop which executes the statement/s.
    while (i < n)
        i = i * 2;
    // 3. you can also add { } for loop "body" so you could execute more than 1 statement 
    while (i < n) {
        i = i * 2;
        printf("i is: %d\n", i);
    }
    // 4. while loop can also skip the "body" entirely if expression is evaluated as false(0) since first evaluation,
    //    of expression
    while (1 == 0) {
        // this content wont even be reached since evaluation is false.
        printf("this wont be printed");
    }
    // 5. "infinite" loops are possible as well, they will execute "body" until some form of cancelation is used,
    //    like: break, goto, return, or invokation of a function which terminates the program of while loop itself.
    // while(1); while(1) {}
    // 5.1 infinite loops have cases, but you must be aware about its cancelation technique.

    // so, as you might think, the "while" loop is best suited for cases when you dont really know the amount
    // of iterations you need.
    
    
}
