// 1. string literal - a series of characters inside ""

#include <stdio.h>

int main() {
    // 1. this is a string
    // 2. without "\n" at the end, all other prints will be on the same line
    printf("To C, or not to C: ");
    // fflush(stdout);
    // 1. by putting "\n" at the end moves the stdout to the next line
    // printf("that is the question.\n");
    // 1. the program will print: To C, or not to C: that is the question.
    // 2. after first "printf", it didnt go to the next line since we have no "\n"
    // 3. at the end of the second "printf" we have no "\n" character, since its a special combination
    //    which is formatted by "printf" itself.
}
