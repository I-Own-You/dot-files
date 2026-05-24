// [3]. linking: a linker combines the object code produced from compiling,
//               with any other code needed to be able to exeucute a program,
//               examples: library functions such as "printf" from <stdio.h> header(file) which
//                         contains declarations("printf", "scanf", .etc) and during compilation,
//                         "printf" is like an unresolved symbol since compilare doesnt now what it is,
//                         so linker searches library like "glibc,uClibc,.etc" finds the implementation,
//                         patches the address(where "printf" in obj code)
//                         with actual "printf" location implementation address.
//                         (but in modern approaches, its not really hardcoded memory address
//                         but rather offsets, relocation entrie, symbol references, .etc)
//                         
//  linking comes in:
//                    dynamic: executable uses shared library at runtime
//                    static:  library code is copied into executable
