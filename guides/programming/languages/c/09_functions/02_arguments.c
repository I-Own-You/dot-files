#include <stdio.h>

// 1. arguments of a function are passed by values and assigned to its paramter
// 1.1 any modification to that paramter inside the function wont affect the
//     passed argument

// 2. argument passed inside a function can be converted to another type explicitly,
//    but requires 2 rules:
//       1. if compiler encountered a function prototype: that argument is converted into,
//          the paramter type on fuction prototype paraemter encountered
//       2. compiler didnt encounter the function prtotoype: that arguments is explicitly,
//          converted by "integer promotion" aka default conversion hierarchy in C,
//          but this will actually give a warn/error by compiler, so always give a prototype

// 3. having an array as a parameter in a function is allowed but with some caveats:
//    1. you pass the argument without [ ] brackets
//    2. you pass the length as a paramter beside the array itself if you need its size,
//       since inside the function you cannot use sizeof() to find the array length because,
//       its a constrain from C itself, so be aware that you can actually underestimate or,
//       overestimate the amount of elements thus potentially not using them all or,
//       going above its length which causes UB.
//    3. array can be modified inside the function which will reflect outside array,
//       so be careful, modification inside the function will reflect outside of it
//    4. multi dim arrays are tricky, the first dimension (rows) you can skip, but you must always,
//       give the second dimension(columns):
//           #define LEN 10
//           int sum_two_dimensional_array(int a[][LEN], int n)
//    5. variable-length arrays can have their length as a number inside [n] when prototyping,
//       or definiton but the order matters, the length must be first, then the array, but it has,
//       3 versioin of usage:
//                           (int n, int arr[n]) - always use this if possible
//                           
//                           (int n, int arr[*]) - because paramter names are optional, and if,
//                                                 we would omit int n and leave only n, C would not,
//                                                 understand arr[n] but arr[*] understand
//                           (int, int[*])
//                           
//                           (int n, int arr[]) - yes, it understands the relationship without,
//                                                the length inside [], but this not readable
//                           (int, int[])
//       but you still could underestimate/overestimate and use less/more making UB.
//       things like this are also possible:
//           int concatenate(int m, int n, int a[m], int b[n], int c[m+n]) {}
//    5.1 multi dim arrays with variable length arrays are easy to right since we can use length,
//        inside [] in prototyping: int sum_two_dimensional_array(int n, int m, int a[n][m])

// 4. you can use keyword "static" in a declaration of array parameter length which would mean,
//    thath the array length will be at least N elements which could potentially make your program
//    faster by telling compiler to produce better intstructions by the fact that an array always,
//    has a minimum length. IT DOES NOT PROVIDE THE LENGTH ITSELF TO THE ARRAY, its only a hint,
//    for the compiler, the array can be less/more(specified by the original length at definiton)
// 4.1 you can put a number without "static" but its again, meaningless and sometimes confusing,
//     it wont event help the compiler
// 4.2 using "static" inside multi dim arrays allows you to specify the minimum length only,
//     of the second dimension(columns)

// 5. if you dont want to define an array but you need one to pass into a function, you can use,
//    a compound literal:
//          1. int my_array[] = (int[]){1,2,3}; // this is actually pointless, since my_array[] = {1,2,3};
//          2. my_function((int[]){3,4,5});
//    these arrays can have: designators, be constant, initialize a size inside [],
//    they obey, the same array rules, its just that they are not assigned initially to anything

void aloha(int x) {
    // 1. x is modigied inside function, outside this funciton the value will be that,
    //    passed inside function call aloha()
    x = 10;
}

void store_even(int nums[], int length) {
    
    for(int i = 0, j; i < length; i++, j+=2) {
        // this modifies the argument passed into our parameter
        nums[i] = j;
    }
}

// 1. its prototype would be this:  void variable_length_array(int n, int arr[n]);
void variable_length_array(int n, int arr[n]) {
    for(int i = 0, j; i < n; i++, j+=2) {
        arr[i] = j;
    }
}

int main() {
    int a = 0;
    aloha(10);
    printf("%d", a); // still 0

    int numbers[100] = {0};
    store_even(numbers, 100); // [0, 2, 4, 6, .etc]

    int length = 50;
    int length_known_ahead[length];
    // 1. here you dont need the prototype versioin: length_known_ahead[length] - wrong
    // 2. array length goes always first
    variable_length_array(length, length_known_ahead);
}
