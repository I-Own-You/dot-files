#include <stdio.h>

// 1. you can use assignemnt operator "=" to copy pointers of same type

// 2. any number of pointer variables can point to the same object

int main() {
    int i, j, *p, *q;

    p = &i;
    q = p; // you copy p pointer into q which means q now holds the memory address of "i"

    *p = 2;
    printf("%d", *q == *p); // 1
    printf("%d", q == p);   // 1
    
    *q = 5;
    printf("%d", *p == *q); // 1
    printf("%d", p == q);   // 1
}
