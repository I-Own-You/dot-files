#include <stdio.h>

// 1. conversion specifier has a form of %m.pX, where:
//    1. m - minimum width field, which means by default it will align the value to the right,
//           and adds spaces if value is less than "m" specified.
//    2. .p - precision, which is dependent on the conversino type("X") that we chose
//    3. X - conversioin type which adjusts the values represenation inside a string

int main() {
    // examples:
    printf("%.1d\n", 2); // .p here is "1" which means exactly 1 digit will be printed, same as "%d" actually
                         // same as printf("%d", 2); actually.
                         // 
    printf("%.2d\n", 2); // .p here is "2" which means additional leading zeroes "0" will be added in front,
                         // if of the value if there are less than 2 digits.
                         //
    printf("%.2e\n", 25300000); // .p here is 2 which means only 2 digits will be printed after decimal,
                                // if it would be 0 like %.0e then no digits printed after decimal at all,
                                // by default if omitted like %e then 6 digits will be printed after decimal.
                                //
    printf("%.2f", 32.534f); // .p here works the same as for %e
                             // 
    printf("%g\n", 832.2); // .p here would mean the maximum amount of significant digits to be displayed,
                               // its not about digits after decimal or after but rather all of them.
                               // "%g" doesnt show trailing zeroes, and if there are no digits after decimal point,
                               // it will not display the decimal point at all.
                               // "%g" is usally used for displaying a very small number or very big one,
                               // when its a small one it display in a fixed decimal format like like "%f" with its .p,
                               // and if its a big one then it shows in an exponent format like "%e" with its .p.
}
