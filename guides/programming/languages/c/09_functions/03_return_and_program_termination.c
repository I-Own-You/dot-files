// 1. non-void function must always has return of that funciton type

// 2. you can use construction to choose either to return:
//    return 0 > 1 ? 1 : 0;

// 3. if return type is not the same as function type, return type is either from prototype or 
//    gets converted, into the function type by default hierarchy of numbers in C

//4. void functions can have empty return like so: return;
//   but usually they are omitted.

// 5. if a non-void function fails to return, UB happesn.

// 6. "main" function always has "int" function type
// 6.1 "main" function usually doesnt have paramters so its useful to put "void" inside ( ),
//     avoiding it is legal but better be explicit about it.
// 6.1.1 "main" actually sometimes does have paramters like argc, argv[]
// 6.2 return statement inside "main" is often a number which in some OS means different things,
//     like success/fail/.etc
// 6.2.1 return 0; means program finished successfully, other than 0 means something is not okay,
//       its better to always return a status code (this is how its called among developers) since,
//       having a status code you can test a prgram in either ways.
// 6.3 "main" is assumed to return 0; by default, if a programmer didnt put it
// 6.4 "main" actually can have other than "int" function type but its not portable, so better,
//     dont do it if you dont need to

// 7. beside "main" function return, there is also another way to terminate a program using
//    "exit" funciton from <stdlib.h>, the argument for "exit" is same as for return inside "main",
//    a stataus code (just a number):
//    exit(0); - okay
//    exit(EXIT_SUCCESS); - okay (its actually a constant defined insdie <stdlib.h> header as a number)
//    exit(EXIT_FAILURE); - something failed
// 7.1 actually exit(status_code); somewhere in code is the same as return status_code in "main",
//     the difference is that "exit" termiantes the program regardless of where it was in function,
//     calls(either 1 or million), return inside "main" only when it reaches the statement inside "main"
