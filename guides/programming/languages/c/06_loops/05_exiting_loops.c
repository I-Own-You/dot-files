#include <stdio.h>

int main() {
    
    // 1. "break" statement is used mainly inside: switch, while, do-while, for so that you can prematurely
    //    jump out of one of those statements, but only one level, it means if there are nested statements,
    //    it will jump out only from 1 level and give control to the next statement inside outer statement.
    int d, n;
    for (d = 2, n = 501; d < n; d++) {
        if (n % d == 0)
            // here, you prematurely jump out of for loop when if clause is evaluated as true(1)
            break;
        
        if (d < n)
            printf("%d is divisible by %d\n", n, d);
        else
            printf("%d is prime\n", n);
    }
    
    for (;;) {
        printf("Enter a number (enter 0 to stop): ");
        scanf("%d", &n);
        
        if (n == 0)
            // here you prematurely jump out of infinite for loop when if clause is evaluated as true(1)
            break;
        printf("%d cubed is %d\n", n, n * n * n);
    }

    // 2. "continue" statement stops the execution of "body" of the loop and goes to the next iteration of it,
    //    with the state of loop being maintained as before "continue" was hit.
    int n1 = 0;
    int sum1 = 0;
    int i1 = 0;
    while (n1 < 10) {
        scanf("%d", &i1);
        if (i1 == 0)
            // here, control goes right to the next iteration of "while" loop in our case but all the state,
            // is maintained, like variables, iterations before it, .etc
            continue;
        sum1 += i1;
        n1++;
    }
    // 2.1 "continue" statement works only inside loops.
}
