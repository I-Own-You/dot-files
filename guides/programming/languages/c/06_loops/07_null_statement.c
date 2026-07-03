#include <stdio.h>
int main() {
    // 1. a null statement basically means you remove the "body" that should otherwise be connected,
    //    which could lead to severe errors and bugs.
    
    int d, n, i;
    // 1. here, we have ";" at the end of for loop which basically means it will do its thing, and then,
    //    pass the control to next statements.
    // 2. such null statements are not necessarily better but have their places.
    for (d = 2; d < n && n % d != 0; d++);
    if (d < n)
        printf("%d is divisible by %d\n", n, d);

    // 2. but you must be aware, null statements can actually crete bugs like this:
    if (d == 0);
    printf("Error: Division by zero\n"); // will print anyway since "if" is a null statement without body
    //
    // i = 10;
    // // here, while becomes an infinite loop since its body is detached because of ";" at the end of )
    // while (i > 0);
    // {
    //     printf("T minus %d and counting\n", i);
    //     --i;
    // }
    //
    i = 11;
    while (--i > 0);
    // will print once, since its not the body of while which became null statement because of ";" at the end of )
    printf("T minus %d and counting\n", i);

    // if you dont like how null statement looks by putting ";" at the end, you could actually put:
    // "continue"/{} for loops or {} for others
}

