#include <stdio.h>

// 1. there are library functions that uses the format string to control read/write.
//    these functions have the ability to convert data:
//          1. during input:  character -> numeric
//          2. during output: numeric   -> character

// 1. "fprintf" and "printf" both writes a variable number of data items to an ouput stream using a format string,
//    aka placeholder to control the appearance of the output.
// 
// 2. both functions have "..."(elipsis) argument as the last which means variadic argument which accepts,
//    any amount of arguments
//
// 3. both functions return the amount of characters written or a negative number if error occured
//
// 4.  "printf" always writes to stdout
// 4.1 "fprintf" writes to whatever stream you idicate
// 4.2 "frpintf" is equal to "printf" if stream passed for "printf" is stdout
//
// 5. "fprintf" is not only for writing data to disk files, it can write to any stream you give it,
//    the most popular is stderr, which guarantees errors will be seen even if stdout is redirected from screen
// 
// 6. there are other 2 functions that can write formatted output to a stream: "vfprintf", "vprintf"

// 1. both "printf" and "fprintf" have a conversion specification:
//    %#012.5Lg  where:
//    % - start of a conversion specifier
//    #0 - flags (there are 5 different ones: minus sign, plus sign, space, diez, zero(- +   # 0))
//    12 - minimum field width 
//    .5 - precision 
//    L - length modifier (lf, Lf, ud), l, L, u is the length modifier
//    g - conversion specifier, d,f,e, .etc

int main() {
    int total = 10;
    
    FILE *fp = fopen("kek.txt", "w");
    
    printf("My output: %d\n", total);
    fprintf(fp, "My output: %d\n", total);
    
    fprintf(stderr, "Error: data file can't be opened.\n");
}
