#include <stdio.h>

// 1. stream - any source of input or any destination output
//    example: files, network protocols, cd, dvd, flash drive, keyboard, screen, .etc
// 
// 2. accessing a stream in C is done through "file pointers", they have type FILE *(declared inside stdio.h header),
//    some files are represented as FILE *, but we can declare them ourselves if needed:
FILE  *fp1, *fp2; // we can open any amount of streams we want, but OS usually limit the number

// 1. stdio.h provides us 3 streams that are ready to use, we dont need to declare/open/close them:
//    stdin -  standard input  (usually keyboard)
//    stdout - standard output (usually screen)
//    stderr - standard error  (usually screen)
// 
// 2. we can redirect the input stream(stdin) which gets the data:
// process_data <in.data, where:
//                              "process_data" - our program name (binary)
//                              <              - input redirection, instead of keyboard, program will consume the file
//                              in.data         - our file name which contains data to be consumed
//
//                              the most important thign here, is that our program "process_data" doesnt know it gets,
//                              the data from a file, it thinks it gets from the keyboard still.
//
// 3. we can also redirect the output stream(stdout) which gives the data:
// process_data >out.data, where:
//                               "process_data" - our program name (binary)
//                               >              - output redirection, instead of screen, program will output into a file
//                               out.data       - out file name which contais the data we passed it
//
// 4. we can actually combine both input redirection + output redirection:
// process_data <in.data >out.data
// process_data < in.data > out.data
// process_data >out.data <in.data
// these above are all the same, the order doesnt matter, either input first or output second
//
// 5. there is a problem with above example, sice we redirected everything into a file, wht about errors ?
//    this is handled by having third stream: stderr, whenever we have errors we will still see it on the screen,
//    instead of the file, but the stderr itself can be redirected as well (OS allows it)

// 1. stdio.h allows 2 kinds of files:
//    text files - bytes inside the file represent characters for a human readable format to view and edit ex: (.c files)
//    binary file - bytes inside the file dont necessarily represent characters; groups of byte can even,
//                  represent other data types(int, float, .etc)  ex: (obj files after compiling .c files)
//              
// 2. text files - 
//                  1.   are divided into lines
//                  1.1. each line ends with 1 or 2 special characters 
//                  1.2. special characters which divide the lines depend on the Operating System
//                  1.3. in Windows its 2 characters: cariage-return '\x0d' followed by line-feed '\x0a'
//                  1.4  in UNIX and Macintosh its 1 character: line-feed '\x0a'
//
// 3. binary files - 
//                   1. are not divided into lines
//                   1.1 there are no special characters for the end of line, all bytes are equal
//
// 4. why not all in text files ?
//    you have a number: 32767, in a text file each digit is a byte, so you need 5 bytes right ?
//    in a binary file, it can be represented as 0111111111111111, 2 bytes, understand now ? efficiency.
//                  
