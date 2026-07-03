// boolean values:
// 1. boolean values dont have their own type as it is but they are representd as 0 and 1:
//    0 is false, 1 is true.
// 2. in C99 there was added a _Bool type which is an unsigned int:
//    1. _Bool can be assigned only 0 or 1
//    2. any non-zero values assigned to _Bool will be replaced by 1
//    3. you can perform arithmetic operations on _Bool types (but better dont)
//    4. printing _Bool type variable will display 0 or 1
//    5. _Bool type can be tested with "if " clause
// 3. in C99 there was added a new header <stdbool.h> which helps with boolean types:
//    1. bool type which is just _Bool underneath
//    2. true value which is 1 underneath
//    3. false value which is 0 underneath
