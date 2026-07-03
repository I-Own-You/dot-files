#include <stdio.h>

int main() {
    int a, b;
    a = 5;
    b = 6;
    
    float c;
    c = 2.0;

    int d = 5;

    // 1. %d is a placeholder where data from variable "b" will be printed, without it, compiler will warn
    //    and not compile
    // 2. %d works only for "int" variables
    printf("d is: %d\n", d);
    
    // 1. %f is for "float" variables
    printf("c is: %f\n", c);
    // 2. by default "%f" displays a number of 6 digits after "." decimal point so if you need to force it,
    //    to display any other amount, you can put a number between "%" and "f"
    c = 23.45;
    // here only 2 digits after "." will be printed instead of deafult 6
    printf("fixed c is: %.2f\n", c);

    // 1. this way you can put any amount of variables and print them and mix, .etc
    printf("d is: %d, c is: %.2f\n", d, c);

    // 1. printing expressions is also possibles, anything that yields as a value in the end
    printf("sum(a + b + d) is: %d", a + b + d);

    // 1. one note, there is also a way to align a variable at least(meaning minimum):
    //    1. by N columns by putting a NUMBER between "%" and placeholder TYPE (d,f,.etc):
    //        1. to the right(by default)
    //        2. to the left (by putting a minus sign):
    //           1. in terms of float, the NUMBER stays between "%" and "." in case you have "."
    printf("d is 5 columns wide aligned to the right: %5d\n", d);
    printf("d is 5 columns wide aligned to the left: %-5d\n", d);
    printf("c is 15 columns wide aligned to the right: %15f\n", c);
    printf("c is 15 columns wide aligned to the left: %-15f\n", c);
    printf("c is 15 columns wide aligned to the right with 2 fixed decimals: %15.2f\n", c);
    printf("c is 15 columns wide aligned to the left: with 2 fixed decimals: %-15.2f\n", c);
}

