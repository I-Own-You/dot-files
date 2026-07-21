#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 1. malloc takes as an argument: size_t(unsigned int to represent size of any object in bytes) type value,
//    and returns the pointer to it

// 2. since we know char type has 1 byte, we can easily allocate size for a string this way,
//    char *p = malloc(n + 1); where n is the maximum length of the string + 1 for NULL CHARACTER,
//    malloc will return the generic pointer and it will be casted into pointer of type char,
//    now p will point to an unitialized array with garbage inside, so you would need to give value to p,
//    this is one way: strcpy(p, "abcd"), null character will be after 'd' element, if the length of p is greater,
//    then after '\0' element there will be garbage, whats the point if we could have char *p = "abcd"; ?
//    the point is that p now  points to an array that can be modified, its not a string literal,
//    and you actaully can increase the length of p if the string must be larger later

// 3. you can actaully create a string and return it and it will be alive during the program in the program,
//    memory, tahts the whole idea of dynamic storage allocation (create data during the program that will persist)
char *concat(const char *s1, const char *s2) {
    // here is our variable of char* type
    char *result;
    // here we get the length of the 2 string variables we will concatenate + null character
    result = malloc(strlen(s1) + strlen(s2) + 1);
    // check for null, although usually you need to recover and not just exit the program
    if (result == NULL) {
        printf("Error: malloc failed in concat\n");
        exit(EXIT_FAILURE);
    }
    // copy first string into our variable
    strcpy(result, s1);
    // copy second string into our variable
    strcat(result, s2);
    // and just return the LOCALLY created variable of char* type as a pointer (our function has char * type)
    return result;

    // but wait, isnt returning a local pointer UB ? yes it is, but not if its dynamically allocated during,
    // the program, or it existed before the function.
    //
    // but you must be very cautious with LOCALLY dynamically allocated data, once you return it and use,
    // later in program, once you dont need it, you must release the memory you took from the memory,
    // with free(our_variable); if you dont do this, you will basically run out of memory since dynamically,
    // allocated data IS NOT RELESED BY ITSELF, its the programmer duty to release it.
    
    // did you realize why dynamically allocated string are useful ? its the fact that now you have,
    // an array based string that can be modified but has an exact length of how much we need instead of,
    // a hard coded number as length inside [] for an array and you can extend/shrink this dynamic string
    // however you need, and it also lives as long as you need, but eventually must be freed when not needed anymore
}
int main() {

    char *p = concat("abcd", "efgh");
    
}
