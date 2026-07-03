#include <stdio.h>

// switch statement is a way of choosing between options and produce something if it matches,
// so its like if/esle if/else but usually works faster.

int main() {
    int nr;
    printf("input a nubmer between 0 and 5: ");
    scanf("%d", &nr);

    // 1. expression inside switch ( expr ) must be an integer type(not conversed!), characters works aswell
    switch (nr) {
        // 1. case expression after "case" label must be a constatnt expressioon (not variables, functions), that
        // evaluates into an integer (characters work as well).
        // example: 5 + 10 is ok, some_variable + 10 is not, but if some_varible is a real constant, it will work.
        // 2. { } are not required but can be put (actually better put)
        // 2.1 case labels do not craete another scope, only if { } put
        // 3. order of case do not matter
        // 4. case duplicates are not allowd
        case 0:  
            printf("you chose 0\n");
            // 1. "break" is a way to give control back to switch after executing the case
            break;
        case 1:
            printf("you chose 1\n");
            break;
        case 2:
            printf("you chose 2\n");
            break;
        case 3:
            printf("you chose 3\n");
            break;
        case 4:
            printf("you chose 4\n");
            break;
        case 5:
            printf("you chose 5\n");
            break;
        // 1. case can "fallthrough" if you dont include "break", it means if there is case 6, it will execute,
        //    all the cases below it untill it catches some "break" and gives control to switch which then exits.
        //    its the same way with 7,8,9, 10 will break since it has break;
        case 6: 
        case 7: 
        case 8: 
        case 9: 
        case 10:
            break;
        // 1. default clause is executed if no case is matched otherwise not,
        // 1.1 you can put default everywhere you want, it can be at top, middle, .etc
        // 1.2 default is not required
        default:
            printf("you chose a greater value: %d\n", nr);
            // 1. default case doesnt need to have "break" but its better to have it as a habit
            // 1.1. :last case in a switch can omit "break", only if there is not a default label after it,
            //      :if default is somewhere else, and it doesnt have break and there is a case below,
            //      it will fall onto that case until break is found or switch ends
            break;
    }

    // 1. C compiler has a trap actually, it assumes a case is an ordinary label, so it will only udnerstand "case"
    //    and "default" to work, but any other name will also make C compiler work although only if they dont have,
    //    a constant expression as values, otherwise error BUT will work if they are a result, of a "fallthrough".
    switch (1) {
        case 1:
        // will work because of "fallthrough"
        cas:
            printf("will be printed\n");
            break;
        casesf:
            printf("will not be printed");
    }
    
}
