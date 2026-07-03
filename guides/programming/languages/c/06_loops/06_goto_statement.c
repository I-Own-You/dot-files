#include <stdio.h>
int main() {

    // 1. "goto" statement is literally an upgraded break/continue which has its cases but rarely used nowadays
    // 2. the way it works is that it can give control from somewhere to somewhere else inside an entire function.
    // 3. the usage is like this: you place goto <identifier>, and it gives control to that part of the function,
    //    <identifier> is literally just a label for any statement in a form: identifier : statement

    int d, n;
    for (d = 2; d < n; d++) {
        if (n % d == 0)
            // here, we prematurely give control to the "done" label inside "main" function
            goto done;
    }
    // 1. when some "goto" gives control to "done" label, it will automatically execute everything below it
    // 2. you can also include all content for "done" label inside { } to have a compound statement
done: 
    if (d < n)
        printf("%d is divisible by %d\n", n, d);
    else
        printf("%d is prime\n", n);

    // 1. goto labesl must have a statement after, but if you dont need one and need only to jump,
    //    you can do <label_name>: ;
    
    // goto is not used anymore in modern programming, so avoid it, as it creates chaos most of the time.
    
}
