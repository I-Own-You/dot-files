// 1. "printf" is a function that prints a string in a format style where data is replaced by actual values,
//    usually from variables or expression and formatted accordingly
// 2. "printf" doesnt have a limit of the length of string to be printed
// 3. "printf" takes "conversion specification" that start with "%" like this: %d, %f, .etc which 
//    represents certain data type and is filled with the value/s given as second argument to "printf"
// 4. "printf" itself does not know anything about value type which is given as secnd argument,
//    it only trusts the "conversion specification", so it doesnt convert anything, just adjusts the type.

#include <stdio.h>

int main() {
    int i, j;
    float x, y;
    i = 10;
    j = 20;
    x = 43.2892f;
    y = 5527.0f;
    
    // 1. %d = adjusts i variable of type int into a string representation
    // 2. %d = adjusts j variable of type int into a string representation
    // 3. %f = adjusts x variable of type float into a string representation
    // 4. %f = adjusts y variable of type float into a string representation
    printf("i = %d, j = %d, x = %f, y = %f\n", i, j, x, y);
    // 5. i = 10, j = 20, x = 43.289200, y = 5527.000000 - this gets printed
    // 6. characters are printed as they are without any conversion

    // 1. C compilers do not require the number of "conversion specifications" aka "placeholders" to be,
    //    the same as values given,
    //    example below will replace first "%d" with value of variable "i", but second "%d" will get a,
    //    meaningless int number, which is wrong, usually there will be warnings for such things, 
    //    but the code itself will compile.
    printf("%d %d\n", i);
    // 2. C compiler also do not require the number of variables to mach the number of "placeholders",
    //    example below will replace first "%d" with variable "i" but wont show variable "j", bad,
    //    but the code itself will compile.
    printf("%d\n", i, j);
    // 3. C compiler also do not require that "conversion specification" is right for the given value
    //    example below will replace "%f" with variable "i", but "i" is int and since now this situation,
    //    is called UB(undefined behaviour - literally anything can happen) the modern compilers however, 
    //    will put "i" variable into second "%d" placeholder and "x" variable into first "%f" placeholder,
    //    which is a very bad code that still compiles on some compilers, and some dont.
    printf("%f %d\n", i, x);
 
}
