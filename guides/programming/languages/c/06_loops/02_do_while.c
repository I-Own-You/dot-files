
#include <stdio.h>

int main() {
    
    // 1. do (statment) while (expression); is basically a "while" loop but with at least 1 execution without,
    //    evaluating expression for the first time only.
    do {
        printf("i will always execute at least 1 time");
        // evaluation is false(0), but because of "do", we have at least 1 execution (the only one in our case)
    } while(0);
    // 2. do - while loops are handy when you need at least on execution.
}
