#include <stdio.h>

// 1. actually, the length of the array, sometimes can have NOT a constant expressio,
//    and use a technique called "variable array length" (VLA)

// 2. as you understood, variable length is computed on program run and not compile

// 3. using "goto" is not allowed to bypass a declaration of a variable length array since,
//    we could skip the creation of it and access elements which are not created yet.

int main() {
   int some_length; 

   printf("Enter desired array length: ");
   scanf("%d", &some_length);

   // 1. this is how its used, of course if some_length changes, array length will not.
   int my_computed_length_array[some_length];

   // 2. you can compute the length however you want
   int my_number = 5;
   int my_array[my_number * 5 - 2];

   // 3. VLA can be multi. dim. array too
   int multi_arr_vla[my_number * 2][my_number - 5];
}

// disantvanges of VLA:
//     1. arrays cant have static storage duration, basically there are 2 storage durations:
//           1. automatic storage duration:
//                   variable exists during the execution of its block/function.
//                   Typically allocated on the stack.
// 
//           2. static storage duration:
//                   variable exists for the entire lifetime of the program.
//                   Created before main starts(except static variables) and destroyed when program exits.
//     
//     2. arrays cant have initializers on the right.

// adavantages of VLA:
//    1. if you have a function with a VLA array, you can call that function with different value,
//       which means you can have different length arrays everytime.
