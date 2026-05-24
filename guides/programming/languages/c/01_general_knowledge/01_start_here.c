#include <stdio.h>
// 1. we need to include <stdio.h> so that C program is aware of I/O(input/output) library,
//    this way we can use functions from that header, "printf()" in main() function below.
// 2. everything that starts with "#" is named "directive"


// 1. "main" is where executable code is put, so its the entry where all executes.
int main(void) {
    // 1. "printf" is a function from standard library included at the top of the program
    // 2. "\n" inside the string means "printf" will go to the next line after printing characters
    // 3. this is also a statement and also a function call, statement - a command to be executed when program runs
    // 4. each statement must end in a ";" with the excption of the "compound statement",
    //    ";" is need so that compiler understands a statement has ended since statement can span,
    //    across multiple lines.
    printf("To C or not to C: that is the question.\n");
    // 3. returning 0 from "main" means the os gets "0" as termination which as a standard means "no errors",
    //    its not mandatory but just common sense between programmers.
    return 0;
    // 4. there is also exit(0) instead of return 0; mostly its the same thing, so its a matter,
    //    of taste what to use, but better return 0; as most programmers do it.
    // 5. if you return statement is missing in "main", the program still finishes and depending on its TYPE
    //    returns "0" for "int" or unspecified value for anything else.
}

// to execute this code we need to transform it into a machine code so it could be executed, we need 3 steps:
//      [1]. preprocessing: a preprocessor handles directives and also can add/modify things to the program,
//                          basically it inlines code from library into your .c program so you could use
//                          functions, .etc and alters text(tokens) into what it knows to alter,
//                          like "#define BAD +", in your code "BAD" will be replaced with "+",
//                          example: int x = 5 BAD 3 becomes int x = 5 + 3;
//                          it doesnt care about errors, its not his job.
//      [2]. compiling: modified program after "preprocessing" goes to the compiler
//                      which translates the program into machine instructions(object code),
//                      the program inst ready to be executed yet.
//      [3]. linking: a linker combines the object code produced from compiling,
//                    with any other code needed to be able to exeucute a program,
//                    examples: library functions such as "printf" from <stdio.h> header(file) which
//                              contains declarations("printf", "scanf", .etc) and during compilation,
//                              "printf" is like an unresolved symbol since compilare doesnt now what it is,
//                              so linker searches library like "glibc,uClibc,.etc" finds the implementation,
//                              patches the address(where "printf" in obj code)
//                              with actual "printf" location implementation address.
//                              (but in modern approaches, its not really hardcoded memory address
//                              but rather offsets, relocation entrie, symbol references, .etc)
//                    linking comes in:
//                        1. dynamic: executable use shared library at runtime
//                        2. static:  library code is copied into executable
//
// 1. usually this flow is automated and preprocessor is integrated inside the compiler so you wont even do step [1].
// 2. but to perform compiling[2] and linking[3] usually depending on the platform you are on, assume linux:
//    you do: cc <your filename>.c
// 3. after "cc" program compiled and linked the program,
//    it created "a.out" file which contains the executable of our program "cc",
//    it also has an argument "-o" which gives us an option to name the executable file produced by "cc",
//    example: cc -o new_name my_file.c,
//    where "new_name" is the same "a.out" but with other name, ".out" extension is not necessary
