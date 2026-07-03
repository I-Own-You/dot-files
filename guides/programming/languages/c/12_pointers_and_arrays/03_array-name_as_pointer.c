#include <stdio.h>

// 1. array itself can be used as a pointer since it points to the first element memory anyway

void slice(int *a, int nr_of_elems);
void my_func(int *);

int main() {
    int arr[16] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16};

    *arr = 10;       // *(a[0]) = 10;
    *(arr + 1) = 20; // *(a[0+1]) = 20; same as arr[1]
    1[arr] = 20; // why works ? arr[1] == *(arr + 1) == *(1 + arr), but never do this
    
    // 1. you cannot increment array itself though since arr is defined as int[5] after all
    // *arr++ = 100;

    // 2. above doesnt seem useful right ? its just a[i] after all, its equivalent,
    //    but now we now we can use array itself as pointer so arithmetic gets easier:
    int *p;
    // p = &arr[0], memory of [0] < memory of [5](&arr[0+5])
    for (p = arr; p < arr + 5; p++) {
        *p++ = 0;
    }

    my_func(arr);
    
    slice(&arr[4], 10);
    
    // 1. actually, pointers can subscript too p[i] same as arr[i] so *(p + i) same as *(arr + i)
    int *pk = arr;
    printf("%d", pk[0] == *(pk + 0));
}

// 3. since array itself can be used as a pointer, you can define a pointer parameter as well,
//    but dont do this, its always better to point out its just an array by: int arr[] instead of
//    int *arr
void my_func(int *a) {};

// 4. you could actually use a trick to start looking from some index till the other inside an array,
//    like a slice by sending the memory address into a function from some index, and a number
//    which, will define how many elements to look:
void slice(int *a, int nr_of_elems) {
    // 1. if we pass into slice(&arr[4], 10) we basiclly start from 5th element and look for 10 elements,
    //    within the array and print them
    for (int *p = a; p < a + nr_of_elems; p++) {
        printf("%d ", *p);
    }
}
