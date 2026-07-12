#include <stdio.h>

// 1. to write a string you can either use printf or puts(from stdlib)
// 1.1. to read a string is harder but you can use scanf or fgets(from stdlib)
// 1.2. you could actually read a character 1 by 1 as well

int main() {
    char str[] = "Are we having fun yet?";

    // WRITING STRINGS
    // 
    // 1. %s placeholder is used when printing a string, it works by writing a character one by one,
    //    until it finds a NULL CHARACTER, if there is not one, it will print until found somewehre in memory
    printf("%s\n", str);

    // 2. we can actually print less characters if desired by using %.ps where p is the number,
    //    of characters allowed starting from the left
    printf("%.6s\n", str); // "Are we"

    // 3. we can also specify the width field
    printf("%10.6s\n", str); //  "    Are we"
    printf("%-10.6s\n", str); // "Are we    "

    // 4. puts(stdlib) has only one argument which is the string printed with an addition of \n 
    puts(str);

    // READING STRINGS
    // 
    // 1. you can use %s inside scanf to read a string, it skips whitespaces before any character, and when,
    //    a character is found, then it reads untill a whitespace is encountered and stops reading,
    //    it also adds NULL CHARACTER at the end
    char str1[80];
    scanf("%s", str1);
    printf("%s\n", str1);
    // 1.1 using scanf with strings you will never have a string with whitespace,
    //     ' ', '\n', .etc since scanf stops when it sees one after reading at least 1 non-whitespace char
    
    // 2. we can use fgets(stdlib) to read a string it differs from scanf:
    //    1. fgets doesnt skip whitespace before any character read
    //    2. fgets stops when '\n' is encountered, and instead of '\n' a NULL CHARACTER is appended
    fgets(str1, sizeof str1, stdin);
    printf("%s\n", str1);
    // 2.1 be aware that you earlier have scanf, and if there happens to be 'a b', scanf will consume 'a',
    //    and will stop on ' ', then fgets starts on ' ' and reads ' b', usually scanf is not used with fgets
    //    together
    
    // 3 be aware of the fact that you actually can bypass the array length with scanf and gets(deprecated since C11),
    //   you could input, a longer string and it will go outside [80] and you could str1[81, .etc]
    //   and it would show the characters but its straigh UB, modifying memory which doesnt belong to you
    // 3.1 scanf can mitigate such things by using %ns where n is a number of maximum allowed characters to read
    // 3.2 gets(deprecated) was unsafe by default
    // 3.3 fgets has a second parameter which is the amount of allowed characters being read
    
    // READING STRINGS CHARACTER 1 AT A TIMIE
    //
    // 1. people usually make their input reading for strings since scanf and gets are risky and not that,
    //    flexible, it usually will consist of rules, here are some defaults to think of:
    //    1. should it skip whitespace before any non-whitespace character ?
    //    2. what character stops the reading and should it be appended to the string ?
    //    3. what should happen if the string is too long, discard the rest characters or leave for next read ?
}

