#include <stdio.h>

// 1. escape sequnces - a way to include meaningful characters or format a string in some way that compiler
//                      wont complain

int main() {
    // 1. \a will "beep" a sound when printing
    printf("hey, bepp ? \a\n"); 
    // 2. \n advances the cursor(caret) to start of the next line
    printf("move cursor to the start of the next line!\n"); 
    // 3. \t makes cursor go one tab further, \t is usually 8 characters forward but it depends on the OS, not C.
    printf("i am here\tnow here\n"); 
    // 4. \b moves cursor back one position (basically removes previous character)
    printf("who ate my letter X\b?\n"); 
    // 5. \ - the most powerful one which lets us print literally nearly anything we want, otherwise,
    //        compiler would complain.
    // 5.1 printed ", which starts the string
    printf("\"\n"); 
    // 5.2 printed \ itself
    printf("\\\n"); 
    // 5.3 printed \n as characters instead of formatters, you can any escape sequence instead of \n actually
    printf("\\n\n");

    // 1. you cant escape "%" with "\" since "\" is a mechanism at compile time, but % is part of "printf",
    //    which is running at runtime, so it sees \% and UB incoming, so to escape "%" you just need to,
    //    prepend it with another "%", like this: 
    printf("%%\n"); // will print %
}
