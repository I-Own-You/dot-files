#include <stdio.h>

// 1. you can actually take arguments when you run a C program by adding,
//    (int argc, char *argv[]) inside int main()
//    argc - counter of how many arguments were provided including program itself (program.c -l, 2
//    arguments here) argv - array of pointers to string literals as our arguments passed includiing
//    program itself
//
//    argv[0]                    - our program taking the arguments
//    argv[1] until argv[argc-1] - remaining arguments
//    argv[argc]                 - points to NULL POINTER(disscussed later) it basically points to
//    nothing
//
//    ls -l remind.c  means argv[0] = ls, argv[1] = -l, argv[2] = remind.c but,
//    program name (in our case ls) is not always accessible since it can be actually a path
//    somewhere, on the system which we could not have access, in this case argv[0] would be "",
//    just empty string ['\0']
//
//    argc and argv are jsut a convention, you can name them anything you want

int main(int argc, char *argv[]) {
    int i;
    for (i = 1; i < argc; i++) {
        printf("%s\n", argv[i]);
    }

    // 1. why **p ? argv[] already holds pointers to string literals, which means that argv[1] would get the first,
    //    element of string literal, and p++ would give us next element in that string literal,
    //    but &argv[1] gives the pointer of a pointer to string literal and p++ would go to next pointer of,
    //    string literal rather than next element of a string literal
    char **p;
    // 2. checking != NULL is ok since argv[argc] points to it
    for (p = &argv[1]; *p != NULL; p++)
        // 3. *p literally is the first element of a string literal, %s prints starting from that element,
        //    untill \0 is found
        // 3.1 (*p) first letter, ++(*p) second letter, .etc, but you can go untill NULL actaully, so you can,
        //     traverse to next actual pointers of argv
        printf("%s\n", *p);
    // actually:
    // *a == a[], so **a == *a[], so **argv == *argv[], **argv == *argv[0]
}
