#include <stdio.h>
#include <string.h>

// 1. array - data structure containing number of data values of the same type
// 1.1 elements within array - can be selected through their position within the array

// 2. elements within the array are arranged horizontally, one after the other: [ elem1, elem2, elemN, .etc ]

// 3. you can use a macro to specify beforehand an array size which wont require later to change,
//    its size everywhere inside the program but only in macro
#define N 15
// 3.1 any constant expressoin will work as an array size

// 4. all array elements have an index, they start from 0 and end as length - 1, why length - 1 ?
//    since elements start from 0 and not 1, having length as the final index means we will have,
//    +1 element.

int main() {
    // 1. to declare an array you must define its type and then the amount of values stored
    int array_with_10_elems[10];
    // 1.1 using a macro to define array size
    int array_with_15_elems[N];

    // 2. we can assign values to array elements by using subscripting technique:
    array_with_10_elems[0] = 1;
    // 2.1 we can print an element from an array bu using subscripting technique:
    printf("%d", array_with_10_elems[0]);
    // 2.2 we can actually do anything we want with the element:
    array_with_10_elems[0]++; 
    printf("%d", array_with_10_elems[0] - 2);

    // 3. some array techniques
    int sum;
    for (int i = 0; i < N; i++) {
        array_with_15_elems[i] = 0; // clears array, since 0 doesnt store data
    }
    for (int i = 0; i < N; i++) {
        scanf("%d", &array_with_15_elems[i]); // reads input into array element, notice the "&" before the array,
                                              // which means you write to actuall element inside the array
    }
    for (int i = 0; i < N; i++) {
        sum += array_with_15_elems[i]; // sums the elements of array
    }

    // 4. an array has a state of being overflowed and C doesnt check this, which leads to UB.
    for (int i = 0; i <= N; i++) {
        printf("%d", array_with_15_elems[i]); // you might think no problems ? but there is!
                                              // array_with_15_elems has exaclty 15 elements, when i
                                              // reaches 15, it still enters for loop because of i <= N,
                                              // and then array_with_15_elems[i] happens, but i is 15,
                                              // since we know the rule that array has size of length - 1,
                                              // which means 15 - 1, so array_with_15_elems maximum,
                                              // subscriptable element is 14!, when [15] happens, UB starts.
    }
    
    // 5. a subscriptable index can be any number, any expression that leads to integer number, .etc
    printf("%d", array_with_15_elems['A' - 'A']); // crazy, right ?
    
    // 6. we can also initialize an array using a constant expression enclosed inside curly braces:
    int initialized_array[10] = {1,2,3,4,5,6,7,8,9,10}; // [1,2,3,4,5,6,7,8,9,10]
    // 6.1 if the length of elements on the right are less then the lenght of array, remaining elements,
    //     inside the array are filled with 0 automatically
    int partially_initialized_array[10] = {1,2,3,4,5}; // [1,2,3,4,5,0,0,0,0,0]
    // 6.1.1 using this mechanic you can initialize an array with zeores
    int zero_initialized_array[10] = {0}; // {} gets the job done as well but only because compiler,
                                          // provides you with extension which would make {} working,
                                          // what {0} actually means ? it sets the first value as 0,
                                          // and then fills the entire array with 0 as well, if we,
                                          // would have {10}, it would set the first element as 10,
                                          // and then fill the entire array with 0, not 10!, so its,
                                          // always filled with 0 for remaining unset values within { }
    // 6.2 having more elements on the right is illegal 
    int overflow_array[10] = {1,2,3,4,5,6,7,8,9,10,11}; // wont compile
    // 6.3 you can actually skip the length of the array if you have elements defined on right,
    //     and compiler will set the array length based on how many elements are there on the right
    int implicit_array_length[] = {1,2,3}; // [1,2,3], implicit_array_length[3]
    // 6.4 there is a way to set elements and the rest to be filled with zeroes using "designator initializers":
    int designated_array[15] = {[2] = 29, [9] = 7, [14] = 29}; // [0,0,29,0,0,0,0,0,0,7,0,0,0,0,29]
    // 6.4.1 you dont have to write designators in ascending mode:
    int random_designated_array[15] = {[9] = 29, [14] = 7, [2] = 29}; // [0,0,29,0,0,0,0,0,0,7,0,0,0,0,29]
    // 6.4.2 you dont have to write the array length, it will be set by looking at the highest designator,
    //       assigned:
    int designated_array_without_length[] = {[5] = 10, [23] = 13, [15] = 29}; // designated_array_without_length[24]
    // 6.4.3 you can also mix designators and set numbers and also fill others with zeros:
    int mixed_designator_array[10] = {5,1,9,[4] = 3, 7, 2, [8] = 6}; // here actually there is a trick,
                                                                     // 5,1,9 are assigned to index 0,1,2 but,
                                                                     // then it goes [4] = 3, so whats for index 3 ?
                                                                     // you might think its 7, but its not, its,
                                                                     // actually 0, and 7 is for index 5,
                                                                     // so remember that if you have a designator,
                                                                     // mixed with simple elements and its higher,
                                                                     // then the amount of elements defined before it,
                                                                     // everything will be assigned just 0, so
                                                                     // [5,1,9,0,3,7,2,0,6,0]
    // 6.4.4 you can alos mix designators and set numbers and fill zeroes and not have a length,
    //       the length will be set by the highest designator if its higher than the total length,
    //       of the elements defined, if not, then the amount elements defined
    int mixed_designator_array_without_length[] = {5,1,9,[4] = 3, 7, 2, [8] = 6}; // mixed_designator_array_without_length[9]
    // 6.4.5 be aware of defining designators with an index which you alread gave an element,
    //       compilers will often warn you but here is how they work:
    int mixed_design[] = {4, 9, 1, 8, [0] = 5, 7}; // [0:4, 1:9, 2:1, 3:8, now what ?], the problem is that,
                                                   // once a designated index is encountered, it has precedence,
                                                   // so now [0] = 5 takes place which rewrites 0:4 -> 0:5,
                                                   // everything after the designator goes the next index,
                                                   // which means 7 after [0] = 5 is like [1] = 7, so,
                                                   // 1:9 becomes 1:7, and so on, if we would have elements,
                                                   // after 7 they would replace 2:1, 3:8, .etc,
                                                   // final result: [0:5, 1:7, 2:1, 3:8]
    
    // 7. sizeof can give you the amount of bytes an array uses, but dividing it by any element inside,
    //    the array gives you the actual length, right ? 
    //    example: sizeof(int[10]) / sizeof(int[0]) = 10 * 4(since int is 4 bytes) -> 40 bytes / 4 bytes -> 10
    // 7.1 this technique is slightly better than using the macro length since,
    //     length of an array can be changed and sizeof will still give the right length but macro,
    //     must be defined and remember and typed.
    for (int i = 0; i < sizeof(array_with_15_elems) / sizeof(array_with_15_elems[0]); i++) {
        array_with_15_elems[i] = 0;
    }
    // 7.1.1 there is problem here that some compiler might arise, since sizeof produces unsigned long,
    //     comparing i(int) with unsinged long can produces problems, you might have to cast,
    //     sizeof to int: (int) sizeof(array_with_15_elems) / sizeof(array_with_15_elems[0])
    
    // 8. copying an array into the other cannot be possible by assignemt operator "=" since, it
    //    has to do with the how memory works(explained later), by now you can use a for loop,
    //    or a function from <string.h> memcpy(which is potentially faster).
    // 8.1 for technique
    int orig_array[5] = {0};
    int copy_into_array[5];
    for (int i = 0; i < 5; i++) {
        copy_into_array[i] = orig_array[i];
    }
    // 8.2 memcpy
    // 1 argument: into which array we copy
    // 2 argument: from which array
    // 3 argumetn: length of the array into which we copy
    memcpy(copy_into_array, orig_array, sizeof(copy_into_array));
    
}
