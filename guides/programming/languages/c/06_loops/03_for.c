
#include <stdio.h>

int main() {

    // 1. for statement is basically an upgraded "while" loop with a form: for (expr1; expr2; expr3) { }
    
    int i;
    // 1. there are 3 steps in for loop:
    //    1. expr1 is evaluated, i = 0;
    //    2. expr2 is evaluated, i < 10; if its evaluated as true(0) then for "body" is executed
    //    3. expr3 is evaluated, i++;
    //
    //    expr1 is evaluated only once, otherwise we would have an infinite loop,
    //    expr2 and expr3 are evaluated untill loop cancelation.
    for (i = 0; i < 10; i++) {
        printf("i now is: %d\n", i);
    }
    // 2. so its basically a while with the expr1 being outside and expr3 being inside:
    //    expr1;
    //    while ( expr2 ) {
    //     statement
    //     expr3;
    //    }

    // 3. the flexibility of for loop though is that you can even omit all 3 expression at once or selectively,
    //    which severely affects its execution, but you always need to put ";" after first and before third expression:
    // 3.1 without expr1 you would have to define the expr1 outside of ( ), so in this case for loop,
    //     doesnt have an initialization step.
    int j = 0;
    for (; j < 10; j++) {
        printf("i now is: %d\n", i);
    }
    // 3.2 without expr3 it means you would have to control the state of initialized variable inside for loop,
    //     or somewhere else
    for (j = 0; j < 10;) {
        // without i-- we would have an infinite loop since j < 10 is always.
        printf("i now is: %d\n", i++);
    }
    // 3.3 without expr1 and expr3 we basically converted for into while
    for (; j < 0;) {
        printf("i now is: %d\n", i++);
    }
    // 3.4 omitting all expresssion we basically have an infinite loop:
    // for (;;) {}
    // 3.4.1 we could also have omitted expr2 but have expr1 and expr3 but it looks weird and no logical sense,
    //       but it would make an infinite loop aswell.
    // for (j = 0; ;j++) {
    //     printf("i now is: %d\n", i);
    // }

    // 4. there is a trick about initialization step (expr1) of for loop,
    // you can actually shadow an outside variable, making it avaialble only inside the for loop.
    for (int i = 0; i < 10; i++) {
        // 1. here, "i" varaible is a brand new variable assigned to value 0 which shadows the outside "i" used,
        //    above in other for loop.
        // 2. why does it matter ? because if you wouldnt put "int" in front of "i", it would reuse the variable,
        //    outside and reassign a new value which basically wipes the old value which we might knew below this,
        //    for loop itself.
        // 3. so there is a rule: if you need some old value before this for loop, use it without "creataing"
        //    a new one with a type in front of it, if you dont, create a new one, this way you will avoid,
        //    additional overhead when you overwrite some old variables which are used further in the program.
        printf("i now is: %d\n", i);
    }

    // modern compilers demolished the difference between while(1) and for(;;) in speed comparisons, 
    // so wether you use its up to you, but be consistent.
}
