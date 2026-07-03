#include <stdio.h>

// 1. function - small program with its own declarations and statements

// 2. using functions we can divide program into smaller piece and reuse them
//    (avoiding duplication), inside other programs (other functions)

// 1. "double" first word is the return type of a function, its what a funciton will return, a "double" type
// 2. (double a, double b) - "a" and "b" are "parameters" of a function
//    with its types before the name "double", both should have a type, "double a,b" is not allowed,
//    these are basically variables which vlaues will be initialized on function calling
// 3. "average" is the function name which you use to call it
double average(double a, double b) {
    // 3. statements inside { } of a function is called "body" of a function, after "body",
    //    is executed, it returns in place where it was called
    return (a + b) / 2;
}

// 4. if you need a function that returns nothing, there is a special type, "void"
void print_count(int n ) {
    printf("t minus %d and counting\n", n);
    // 1. you dont need return in side "void", but you can if its closed right after: return;
}

// 5. from history of old "C", without "void" inside function paramters, you can actually call,
//    a function with any arguments, but the meaning of it will literally be nothing,
//    you cant access them, you cant use them, .etc.
//    later "C" added a technique to actually tell the compiler that a function should not,
//    take any parameters and not compile the program if paramteres are added
void something_else(void) {
    printf("whats here ?");
}

// 6. general form of a function:
//    return-type function-name ( parameters )
//    {
//       declarations
//       statements
//    }
//
//    RULES:
//       1. return-type: is the type of value the function returns with some rules:
//          1. "void" function type means no values are returned
//       2. function name:  has rules as of variables name
//       3. parameters rules:
//          1. each parameter should be preceded by a type,
//          2. each parameter is separarted with a comma ","
//       4. variables inside a function are tied to its function and cannot be accessed,
//          outside its function
//       5. functions with "void" type can have empty body, which makes sense onnly,
//          if developing will occur later, in terms of function with non-void types,
//          you can just put return 0 and come back later for devleopment
//       6. a non-void function can be called without its paramters and ( ) but its meaningless,
//          a compiler will usually warn you.
//       7. actually, you can explicitly ignore a return value from a functioin so that it,
//          will be more clear for other that we do not need a value by putting (void) before,
//          the function call like so: 
//          (void) printf("abcd\n");
//          printf() as a function actually returns the amount of characters it printed,
//          now you explicity told that its return value is not needed, though most of the time,
//          you wont probably do it for builtin functions.
//       8. you cannot use functions before their declaration, so like a function after "main",
//          used inside "main" is not allowed, but "C" gives a technique "function declaration" which,
//          is actually also called a "function prototype", it basically means creating the function,
//          without its body and possible parameters names(you can alter them later if you want so)
//          
//          void a();
//          int b(int nr, int nr2);
//          double c(int, double);
//
//          main() {
//              a();
//              b(2,3);
//              c(5, 2.5);
//          }
//
//          void a() { printf("alo\n");}
//          int b(int nr, int alo) { return nr + alo; }
//          double c(int bbb, double ccc) { return 2 + 3.5; }
//
//          so, the only thing that doesnt change from function prototype is:
//             1. function type,
//             2. function name,
//             2. paramter types,
//             4. parameter count
//       8.1. actually double average(); omiting parameters is a old way, where you can,
//            define parameters when defining the function body after "main" its still allowed,
//            nowadays, but dont do this.
//            this is used when a macro has the name of the paramter that could replace the paramter name
//            ;;;; this is treated as non-parameter function in modern C
//       8.2 defining the parameters type on the second line is also supported but dont do this:
//       double average(a, b)
//       double a, b;
//       ;;;;; this is deprecated in modern C
//          
//       9. you can have functioin prototypes inside other functions (without the body) which,
//          can help others see which functions can be called only inside parent function,
//          but its very hard to maintaing such thing, better always put functions outside:
//          int main(void)
//          {
//           double average(double a, double b);
//           …
//          }
//
//        10. you can combine function prototypes if they have the same type and variables:
//            void print_pun(void), print_count(int n);
//            double x, y, average(double a, double b);
//            ------------better dont do such things-------------------------

// 7. functions cannot be inside other functions

int c(int a, int b);
int main() {
    // 1. to call a function we type its name with ( ) at the end and type "arguments"
    //    inside ( )
    // 2. typing arguments to a function means suplying information to a specific function,
    //    by copying the value of that argument and passing to its parameter in that place
    //    a = 2, b = 3
    // 2.1 arguemtns of a function can be any value of that type, either constant, variable,
    //     array subscription, .etc
    int avg = average(2, 3);

    // 3. average(2.5,3) returns the value and value becomes an argument itself for printf
    printf("%lf", average(2.5, 3));

    // 4. you cannot assign a void function to a variable, it can only be called
    // int someting = print_count(2); // error
    print_count(99); // not error
}
