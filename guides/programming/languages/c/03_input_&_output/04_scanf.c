// 1. scanf lets you read input in an according format
// 2. scanf can contain both characters and conversion specifiers(the same as inside printf)

#include <stdio.h>

int main() {
    int i, j;
    float x, y;
    // 1. takes all numbers that are given as input and formats it according to conversion specifier and
    //    put them into their variables
    scanf("%d%d%f%f", &i, &j, &x, &y);
    printf("i: %d\nj: %d\nx: %f\ny: %f\n", i, j, x, y);

    // 1. as with "printf", compiler doesnt check the number of conversion specifiers match with,
    //    the number of variables assigned
    // 2. as with "printf", compiler doesnt check the number of variables assigned with the number,
    //    of conversioin specifiers
    // 3. as with "printf", compiler doesnt check the meaningful type of conversoin specifier with,
    //    the variable assigned, UB incoming.

    
    // 1. remember to not put any text inside "scanf" function, it parses only raw input,
    //    so putting a text here will mean "scanf" wants exactly that text to be entered,
    //    so: scanf("Enter a number: %d", &sphere_radius) will actually want exaclty input,
    //    inside "" or it fails and sphere_radius remains unchanged (often a default value given) 
    //    example: scanf("ab   %d", &sphere_radius) will want ab<your number here> in order,
    //    to parse the number given, also if there is a space between the placeholder(%d) in our case,
    //    and something before it and then some characters again, no matter how many spaces there is,
    //    you can just ignore it and input only characters and value of needed type like this:
    //    "ab5", "ab    5" it will work, with spaces after the placeholder it doesnt matter if you type it.
    // 2. putting a "\n" at the end in a "scanf" also makes the program wait for the input for,
    //    a non white-space character which hangs the program after a number is printed if user,
    //    didnt know about this.
    
    // 1. "scanf" not always but usually require "&" symbol in front of the variable it puts the,
    //    value from specifier conversion(in another chapter i will find out why, its related to memory address),
    //    so DO NOT FORGET to put "&" if its needed, otherwise UB incoming.

    // scanf in real world should usually be skipped and not relied on, its too easy to create bugs with it.
}
