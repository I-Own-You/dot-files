#include <stdio.h>

// 1. character type "char" represents values that a speicifc computer character set,
//    the most popular being ASCII(7 bit code capable of 128 characters)
// 1.1 ASCII is often extende to 256 characters by extending to Latin-1

// 2. character constants have "int" type and not "char"

// 3. C treats characters as small integers, and use it instead of the character represented
// 3.1 charcter type can also be:
//     signed - from -128 to 127
//     unsigned - from 0 to 255
// 3.2 C standard doesnt tell if char is singed or unsigned, depending on the compiler it can be either,
//     but programmer usually can choose as an option of the compiler or
//     programmatically defining the sign: signed char ch; unsigned char ch;

// 4. C also has a historical weird thing called multi-character constant, basically you,
//    have '27', its actually possible to compile if you make compiler to, but its invalid,
//    from our perspective of "char" type, compiler usually will warn and not let you compile it,
//    under the hood it does this: '2' -> 50(integer representation of character '2') * 256 +
//                                 '7' -> 55(integer representation of character '7') so 50 * 256 + 55 -> 12855
// 
// 4.1              AVOID THIS AT ALL COST, ITS MAINLY LEGACY.

int main() {
    // 1. NOTICE the ' ' single quote isntead of double " ", its IMPORTANT, because
    //    as a seaprate type, "string" doesn not exist, but can be only deducted as something,
    //    printf, scanf, .etc
    char ch1 = 'a'; // lower-case a, value is 97
    char ch2 = 'A'; // upper-case A, value is 65
    char ch3 = '0'; // zero,         value is 48
    char ch4 = ' '; // space,        value is 32
    
    // 2. since characters are just integers, we can do anything with it, but it will still,
    //    represent the character version of that integer:
    char ch; 
    int i;
    i = 'a'; // 65
    ch = 65; // 'A'
    ch++; //    'B'
    ch++; //    'C'
    //
    if (i < 'B' && ch == 'C') {
        printf("this will print.\n");
    }
    //
    for(ch = 'A'; ch <= 'Z'; ch++); 

    // 3. to write a numeric escape to a particular character(control characters, they are not printable)
    //    you must have its integer representation, as decimal, octal or hexa
    // 3.1 an octal escape sequence of "escape" is \033, 0 in escape sequences is not mandatory,
    //     octal numbers can have maximum of 3 digits since char is "unsigned char"
    // 3.2 a hexa escape sequence of "escape" is \x1b or \x1B, "x" is mandatory lowercase, "b/B" is not,
    //     the amount of digits after \x can be any but it must be "unsigned char" so
    //     no higher than "FF" for 8bit characters
    // 3.3 often you can define a macro so it would be easier placing a name then everywhere typing,
    //     a number, #define ESC '\33'
    
    // 4. you can use %c placeholder to read/write characters in printf/scanf:
    // 4.1 actually, there is a problem, now, scanf does not skip whitespaces as it skipped 0 and whitescapes,
    //     it means if it encounters a whitespace, ch will be assigned to it.
    scanf("%c", &ch);
    printf("%c", ch);
    // 4.2 to actually skip whitespaces you need to put a whitespace before the %c
    scanf(" %c", &ch);
    // 4.3 here is how to check every character before going to new line
    do {
        scanf("%c", &ch);
    } while (ch != '\n');
    // if you would call here another scanf, it would write charcter from the next line

    // 5. there are better ways to read/write characters than printf/scanf, its called
    //    putchar(reading), getchar(writing) from stdlib.
    // 5.1 getchar reads by 1 character and returns it, so you need a varible if you need to store it,
    //     the returning type is "int" and not "char".
    // 5.2 putchar/getchar do not skip whitespaces
    // 5.3 putchar/getchar are faster then printf/scanf, as they were made for it
    do {
        ch = getchar();
    } while (ch != '\n');
    //
    while ((ch = getchar()) != '\n'); // ch will be first '\n' encountered
    // 
    while (getchar() != '\n');
    //
    while ((ch = getchar()) != ' '); // ch will be the first non " " character
    // 5.4 you must be aware of using scanf and getchar together since scanf can peek to a character,
    //     but not read it, and getchar will get the leftover of what scanf didnt consume:
    int command;
    printf("Enter an integer: ");
    scanf("%d", &i); // if input is abc2, i becomes 2, "abc" are skipped as not consumed by scanf("%d")
    printf("Enter a command: ");
    command = getchar();
    printf("%c", command); // "a"
    command = getchar();
    printf("%c", command); // "b"
    command = getchar();
    printf("%c", command); // "c"
    command = getchar();
    printf("%c", command); // "2"

    // 6. now you can calculate the length of a message with a simple while
    int len = 0;
    while(getchar() != '\n') {
        len++;
    }
    printf("len of message is %d", len);
}
