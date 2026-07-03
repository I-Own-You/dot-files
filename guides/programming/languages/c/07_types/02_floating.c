// 1. floating types are useful when you need an insane big number or you need to store digits,
//    after the decimal "." so like: 2.5, 32.222, 35.123456

// 2. there are 3 floating types:
//    float - single-precision floating point (usually 32 bit)
//    double - double-precision floating point (usually 64 bit)
//    long double - extended-precision floating point (varies by computer, but usually from 80 til 128 bits)
// 2.1 when to use what:
//    float - is useful when precision after "." is not critical
//    double - enough precision after "." for most tasks
//    long double - ultra precision after "." which is rarely used, like rarely or not at all.
// 2.2 C standard doesnt specify the amount of digits after ".", it depends on the implementation,
//     of the computer, but there is a standard which computers follow: IEEE Standard 754 (aka IEC 60559)
// 2.2.1 float - usually has 6 digits after the "."
// 2.2.2 double - usually has 15 digits after the "."

// 3. floating vlaues:
// type:           smalles positive value:                     largest value:                    precision:
//      float                             1.17549 * 10^-38                   3.40282 * 10^38               6
//      double                            2.22507 * 10^-308                  1.79769 * 10^308              15
//      long double (N/A) it varies from 80 to 128 bit so its very very large

// 4. you can check for floating types defined by macros inside <float.h> header

// 5. floating constants:
//    57.0   57.   57.0e0   57E0   5.7e1   5.7e+1   .57e2   570.e-1
// 5.1 a floating constant must have a decimal point or "e"/"E"(exponent),
//     "e"/"E" represents the power of 10 by which the number is scaled, - or + can appear after "e"/"E"
// 5.2 when compiler encounters a floating point constant, it actually considers it as a "double" and not "float",
//     but there is no problem since "double" floating points are automatically converted into "float" when needed
// 5.3 if you need to make a floating constatnt either single precision(float) or extended precision(long double),
//     you can assign "F"/"f" for single precision and "L"/"l" for etended precision: 59.2f, 62.5L
// 5.4 a floating point number can be writen as hexa using 0x as with integer numbers (this is rarely used)

// 6. always try to put "F"/"f" to represent a floating value of type float

#include <stdio.h>
int main() {
     double d = 2.0;

    // 1. writing a double number requires you to add "l" in fornt of either "e","f","g"(floating values)
    scanf("%lf", &d);
    // 2. for printing a double number you dont need the usage of "l", but you can put it anyway for readability
    printf("%lf", d); // "l" here actually has no effect but its valid
    
    long double l_d = 2.0;
    // 1. for writing a long double number it requires you to add "L" in front of either "e","f","g"(flaoting values)
    scanf("%Lf", &l_d);
    // 2. for printing a long double number you NEED the usage of "L"
    printf("%Lf", l_d); 
    
}
