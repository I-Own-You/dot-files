#include <stdio.h>
#include <stdlib.h>

#define FILE_NAME "example.data"

// 1. input/ouput redirection is easy, you dont need to open/close a file or any othe roperation,
//    but its too limited, why ? by redirectioning we dont have control over our file or even its name,
//    worse then, if we have to read from 2+ files or write to 2+ files, what we do ? we cant.
//
// 2. this is why we msut stdio.h functiionality to open/close/rename/delete/edit a file

// 1. opening a file - we use "fopen" function:
//                    1. first argument is a string (the name of the file to open or a path to it), be aware on windows,
//                       since the path on windows is "\" instead of UNIX like "/," so you either escape \\ or just use "/",
//                       since windows will work with "/" instead of "\" anyway
//                    2. second argument is a string (mode string which specifies what operation we will perform on a file)
//
//                    "fopen" -  returns a FILE pointer that the program can save in a variable(usually will) and,
//                               use later whenver it needs to perform an operation on it and,
//                               if the file somehow cant be opened(doesnt exist, no permission, wrong place) then,
//                               a NULL pointer will be returned, never assume a file has been opened until checked
// 
// 2. modes of file opening(text files):
//                          "r"  -  open for reading       (file must exist)
//                          "w"  -  open for writing       (truncate file if exists, create if not)
//                          "a"  -  open for appending     (append at the end if file exists, create if not)
//                          "r+" -  open for read & write  (starts at the beginning of a file, file must exist)
//                          "w+" -  open for read & write  (truncate if file exists, create if doesnt exist)
//                          "a+" -  open for read & write  (append if file exists, create and append if not)
//
// 3. mode of file opening(binary files):
//                  "rb"           -  open for reading       (file must exist)
//                  "wb"           -  open for writing       (truncate file if exists, create if not)
//                  "ab"           -  open for appending     (append at the end if file exists, create if not)
//                  "r+b" or "rb+" -  open for read & write  (starts at the beginning of a file, file must exist)
//                  "w+b" or "wb+" -  open for read & write  (truncate if file exists, create if doesnt exist)
//                  "a+b" or "ab+" -  open for read & write  (append if file exists, create and append if not)
// 
// 4. we cant switch from read to write without calling a file-poisitioning function unless reading the file,
//    encountered end of the file.
// 4.1 we cant switch from write to read without calling "fflush" or calling a file-positioning function

// 1. closing a file - we use "fclose" function:
//                      1. it has only one argument which is the FILE pointer obtained through "fopen" or "freopen"
//                         functions.
//
//                      "fclose" returns 0 if file was closed successfully or error code "EOF" from stdio.h (macro)

// 1. attaching a file to an open stream - we use "freopen": (it take a file and attaches it to an open stream)
//                  if (freopen("foo", "w", stdout) == NULL) {
//                      ;
//                  }
//                  stdout output will now go into "foo" as well, stdout itself still outputs to the screen
//
//                  if "freopen" cant open the file it returns a NULL pointer, in C99 you can have a mode,
//                  which will try to create the file if it doesnt exist, it depends on C99, go read if interested

// 1. obtaining the file name to a program, how ? from cmd line arguments of course, argc, argv is your friend

// 1. temporary files - we use "tmpfile" with "tmpnam": (we often need temporary file while program works)
//                      1. "tmpfile" creates a temporary file with "wb+" mode that exitst until its closed,
//                         or program ends.
//                      
//                      "tmpfile" returns a FILE pointer that can be used to access it later, if it fails to create,
//                      then it return a NULL pointer
//
//                      "tmpfile" has drawbacks:
//                                      1. we dont know the name of the file "tmpfile" creates
//                                      2. we cant make it permanent later if we would need to
//                                      so if thse 2 drawbakcs are major, use "fopen" instead
//                      
//                      "tmpnam" (helps with creation of different filenames for temporary files since you dont want,
//                               all of them to have the same name):
//                               
//                               if the argument of "tmpnam" is NULL, it stores the file name in a static variabe,
//                               and returns a pointer to it otherwise it stores the filename in a character array,
//                               and returns a pointer to the first character
//                               
//                      be aware that there is a max number of temporary files to be opened, just dont open too much
//                      be aware if you store the temp file name from "tmpnam" in a character array, it msut have a,
//                      minimum length specified by "L_tmpnam" constant

// 1. file buffering, why its needed ? accessing all the time data from a hard drive is slow, so we can use a technique,
//    like "buffering" which makes this process faster:
//       1. data written to a stream is stored inside a buffer area in memory
//       2. when buffer is full or stream is closed the buffer is "flushed" (written to the actaul output device)
//
//    input streams can be buffered in a similar way: 
//              1. the buffer contains data from the device 
//              2. input is read from the buffer instead of the device
//
//    why "buffering" wins ? a block of data relying inside memory is accessed faster then multiple calls to a device for it
//
//    stdio.h performs buffering automatically if it seems it will be an advantage, so we usually dont care about it,
//    but sometimes we might need to operate it, we can do so with: "fflush", "setbuf", "setvbuf".
//    
//    when a program writes output to a file, normally it goes into a buffer first, when the buffer is full,
//    or the stream is closed, the buffer is flushed automaitcally.
//    but we can do it manually if needed:
//           fflush(fp); // flushes buffer for fp
//           fflush(NULL); // flushes all buffers
//    "fflush" returns 0 if its successful, EOF if any error occured
//
//    "setvbuf" allow us to change the way a stream is buffered and control the size and location of the buffer:
//          char buffer[N];
//          setvbuf(stream, buffer, _IOFBF, N);
//
//          setvbuf must be called after a stream was opened but before any operations are performed on it.
//          be sure to close the strem before buffer is deallocated
//
//          setvbuf is kind of advanced thing so you must inspect its reference to understand how ti works,
//          i wont explain the arguments of it, im not interested in it, i just know it exists, its enough

// 1. removing/rename a file: (both work with strings and not FILE pointers)
//    removing: 
//             1. remove("foo"); // removes file named "foo"
//             2. you can use remove on temporary files while the program hasnt yet terminated if the temp file,
//                was created with "fopen" but the file must be closed to be removed (if not cloed, its impl-defined)
//    
//    rename: 
//            1. rename("foo", "bar"); // renames "foo" file ito "bar"
//            2. you can use rename on temp files if they were created with "fopen" if you need that temp file,
//               permanent, if new file name given already exists (its impl-defined)




int main() {
    FILE *fp = fopen(FILE_NAME, "r");

    if (fp) {
        printf("cant openn file\n");
        exit(EXIT_FAILURE);
    }

    fclose(fp);

    FILE *tempptr = tmpfile();
}
