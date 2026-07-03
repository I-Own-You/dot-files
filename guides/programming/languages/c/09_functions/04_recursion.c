#include <stdio.h>

// 1.  recursion - when a function call itself

int factorial(int x) {
    if ( x == 1 ) {
        return 1;
    } 
    return x * factorial(x - 1);
}

int power(int x, int exp) {
    if (exp == 0) {
        return 1;
    }

    return x * power(x, --exp);
}

int main() {
    int result_of_5;

    result_of_5 = factorial(5);
    printf("factorial of 5: %d\n", result_of_5);

    int five_powers_3;

    five_powers_3 = power(5, 3);
    printf("5 power 3 is: %d\n", five_powers_3);
}


