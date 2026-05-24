#include <stdio.h>

// 1. you can create a constant using a "macro definition" like this, a "macro definitoin" is basically,
//    a preprocessor text substitution rule 
// 2. preprocessor which handles directives will replace all INCHES_PER_POUND in the program
//    with value "100" as if we would type "100" in the first place in stead of the constant name
#define INCHES_PER_POUND 100
// 3. value of a cosntant can be an expression too, and if it contains an operator, it must be put inside ( )
#define K_OF_PI (1.0f / 3.14f)
// 4. constants must not be CAPITAL_CASE but its a convention among programmers, so you do to

int main() {
    int a = 2;
    // 1. preprocessor will replace INCHES_PER_POUND with value "100" during prerprocessing phase
    printf("%d", a + INCHES_PER_POUND);
    // 2. another interesting thing is that constant itself does not have a type, its literally just text,
    //    the compiler is the one checking whats the type of value and then performs whats best,
    //    in this case the 100 itself is "int" but we add 100 to 2.f of type float, so in this case,
    //    compiler performs "implicit type conversion" where smaller type in our case "int" converses into,
    //    higher type in our case "float" which results into 2.f + 100.f, this applies to all types where,
    //    conversioin is possible (for example numeric types)
    printf("%f", 2.f + INCHES_PER_POUND);

    // 1. preprocessor will repalce K_OF_PI with expressioin (1.0f / 3.14f), NOT THE VALUE of this expression,
    //    preprocessor does not compile or run anything, it only replaces, remember this, and then
    //    the compiler will evaluate the constant IF IT CAN OPTIMIZE it.
    printf("%f", K_OF_PI);
}
