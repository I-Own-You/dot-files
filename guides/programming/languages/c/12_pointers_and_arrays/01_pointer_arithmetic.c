// 1. you can use pointers to access array elements, it was widely used as a way of perfomrance increase,
//    but since compilers beccame better, this technique remains now only a niche and occasionaly used

// 2. performing pointer arithmetic is allowed only in 3 forms:
//    1. adding an integer to a pointer
//    2. substracting an integer from a pointer
//    3. substracting a pointer from another pointer

// 3. we can compare pointers using the relational(<, >, <=, >=) and equality(==, !=)

// 4. pointers can point to arrays created without a variable(compound literals)

#include <stdio.h>
int main() {
    int a[10], *p, *q, i;

    // 1. adding an inteer to a pointer
    p = a; // *p == a[0]

    p = &a[2]; // *p == a[2]
    
    q = p + 3; // *q == a[2+3] == a[5] or q == &a[5]

    p += 6; // *p == a[8] == a[2+6] == a[8]

    p += 8; // *p == a[2+8] == a[10], but a[10] is out of boundary, UB.

    // 2. substracting an integer from a pointer
    p = &a[8]; 
    
    q = p - 3; // *q == a[5] or q == &a[5]
    
    p -= 6; // *p == a[2]
    
    // 3. substracting pointer from pointer
    p = &a[5];
    q = &a[1];
    
    i = p - q; // 5 - 1 = 4, i == 4
    
    i = q - p; // 1 -5 = -4, i == -4, but a[-4] is underflow, UB.
    
    // 4. comparing pointers with relational operatos is useful only if both point to same array,
    p = &a[5];
    q = &a[1];

    printf("%d", p > q); // 1, since 5 > 1 is true
    printf("%d", q > p); // 0, since 1 > 5 is false
                         
    // 5. pointers can point to compound literal arrays which help if you cant define an array earlier
    int *cmp_p = (int []){1, 2, 3, 4, 5}; // *cmp = [0]
    *cmp_p++; // *cmp_p = [1] or cmp_p = &[1]
    
    // 6. what if your pointer does not point to an array but a variable ?
    int my_var = 0;
    int *mv_p = &my_var;
    *mv_p++; // not an erorr huh ? but what is here ? liteerally anyting it will point to the next memory,
             // after the my_var type, so int == 4 bytes, *mv_p++ means next 4 bytes never do this,
             // it leads to UB.  
}
