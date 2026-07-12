

// 1. string literal - sequence of characters enclosed inside "": "a string"

// 2. stringl literal can contain same escape sequences as characters constants, those inside '',
// 2.1 be cautious with octal and hexa sequences indie strings, octal
//     1. octal sequences are limited to 3 characters from 0 to 7 starting with \, so \1274,
//        means string constaints 2 characters, \127 and 4, \189 constains 3 characters, \1 8 9,
//        since 8 and 9 is out of range so string cant proccess it as octal system
//     2. hexa sequence also has caveats like \xfcber, with 4 characters \xfc b e r,
//        range for hexa sequences is typically from \x0-\xff
//        
//     often, only character escape sequences are used that like \t, \n, .etc, not octal/hexa

// 3. you can split a string using "\" at the end of a statement without anything else:
//    printf("dfadfsadsfdfs.  \
//    ")
// 3.1 "\" technique has 1 drawback, when splitting a string, the next line must be a new string,
//     or string ending, which breaks the UI of a program in terms of indenting since any space,
//     before "\" and any space before string on next line(s) will count in the final output result
// 3.2 there is a better way to split strings accross program:
//     printf("alo, its you ?"
//            ", yes its me!");
//     compiler will join string and thats it, no need to worry about spaces or indent layout
// 3. you can actually split C code with \, not just string:
//    int \
//    a;

// 4. how strings are stored ? actually, its just an array of characters....
// 4.1 when C encounters a string literal of n length, it sets n+1 length in memory for it,
//     that memory area will store the actual string, but why +1 ? the extra length is for the,
//     NULL CHARACTER, why do we need it ? its a mark which represents an end of a string.
//     NULL CHARACTER is of 1 byte length which all bits are 0, and its an escape sequence '\0',
//     ITS NOT THE '0' FROM ASCII WHICH IS 48 IN DECIMAL.
// 4.2 "abc", its stored as an array with 'a', 'b', 'c', '\0', string elements can be empty '',
//     empty elements are stored as a single null character \0, IT DOESNT MEAN '' == '\0', empty here,
//     meant that we can literally have '\0'(NULL CHARACTER) at different positions inside the array,
//     because 'a b' where ' ' between 'a' and 'b' IS NOT EMPTY, ITS SPACE, 'a\0b' '\0' is empty here;
//     the whole string, literal is of type char*, so char *my_str = "abc";
//     
//     since empty elements are just \0 under the hood, an array of chars that was not given,
//     the default value then C compiler will not append a \0 at the end, and it will read,
//     your array of string literals until it finds a 0 byte somewhere in memory (UB);
//     
//     
//     also, "\0" is not the same as '\0', '\0' is character constant which means 0, whereas,
//     "\0" - string literal with char[2] where first element is \0 and second is the appended,
//     by C compiler \0, yes they both are null character but just bear in mind this, this means,
//     the end of a string is checked by '\0' and not "\0" since "\0" is a whole string literal
//
// 4.3 stirng literal cannot be modified, attempting to do so causes UB

// REMEMBER, char *p = "a"; IS A STRING LITERAL, NOT ARRAY. (its an abstraction, since "a" == char[2], ['a', '\0'])

// 5. where is the string literal stored ?
//    its memory address resembles in a special memory layout which is READ-ONLY,
//    
//    its for performance reason, its like a constant, you can access and put it everywhere its needed,
//    but cant modify it
//
//    its not created everytime at runtime, memory is not allocated for it and its not copied through
//    the program code
//    
//    its put inside "compiled binary" typiclly inside .rodata, and when you run the,
//    program, .rodata is mapped into memory layout of C, and our pointer just points to the,
//    string literal it was assigned to.

int main() {
    char *p;
    // it doesnt copy "abc" into p, it jsut passes the pointer to first element 
    p = "abc"; // *p = 'a', *(++p) = 'b', *(++p) == 'c', *(++p) == '\0', *(++p) == UB

    // under the hood, a string literal, in our case p points to first element in "abc" array,
    // it gets 'a' character, since characters in C are ints, it gets the decimal value of 'a',
    // adds 2 and returns.
    int result = *p + 2; // 'a' == 97, 97 + 2 = 99, result == 99
    
    char ch;
    // yes you can subscript string literals since they are arrays of chars
    ch = "abc"[1];
}

