#include <stdlib.h>

// 1. array benefit from dynamic allocation the same as strings, allocate as much as you need,
//    then shrink/extend if needed

// 2. since arrays wont neccessarily be of char type, we cant just use a plain number inside malloc,
//    since int, double, float .etc types dont have 1 bytes so we would need sizeof function to get the amount,
//    of bytes for a single element and then multiply by the desired amount of elements that array will hold

int main() {

    // 1. initial array length we know will be enough
    int n = 5;
    // 2. actual array
    int *a;
    // 3. a now points to the first element of anewly allocated array inside memory
    a = malloc(n * sizeof(int)); // sizeof(a) == 5 * sizeof(int) == 5 * 4 == 20
    // 4. once we got our array, we can use it either as a varible name or with pointer aritmetic
    for (int i = 0; i < n; i++) {
        a[i] = 0;
    }
    for (int *p = a; p < a + n; p++) { // p < &a[n] will work as well
        *p = 0;
    }
    
    // 1. alternatively, you can use calloc function which wants 2 arguments, the amount of elements,
    //    inside the array(since remember, malloc/calloc allocate something as an array of something),
    //    and the second argument is the amount of bytes each element has
    // 1.1 another thing about calloc is that it clears the memory it allocates, which means it gives,
    //     the default values of the type of the left variable you assign to
    a = calloc(n, sizeof(int)); // [0,0,0,0,0]
    
    // 1. you can actually have a an array of any data type and length
    struct point {int x, y;} *p;
    // 2. what happened here ?
    //    1 stands for one element inside the array alloccated by the memory,
    //    sizeof(struct point) stands for the amount of bytes the elements will have
    //
    //    so, in our case we have an array of type struct point with exactly 1 element and that element,
    //    has sizeof(struct point) which means sizeof(int) + sizeof(int), since int x and int y
    //    
    p = calloc(1, sizeof(struct point)); // [{p.x = 0, p.y = 0}]
                                         // 
    
    // 1. using realloc we can shrink or expand a previously allocated array, the realloc takes 2 arguments,
    //    the first is a pointer of a previously created array using malloc/calloc/realloc (if not, its UB),
    //    and the second argument which represents new size in bytes
    // 1.1 there are some rules and knowledge about realloc:
    //     1. pointer passed to realloc must be a result of previous malloc/alloc/realloc or UB incoming
    //     2. if realloc cannot do its operation either shrink/expand, it returns a null pointer,
    //        but the old data of the pointer is unchanged, so be cautious when you use realloc,
    //        since if you do my_pointer = realloc(my_pointer, new_size), you can lose data,
    //        but if(realloc(my_pointer, new_size)) {} is just checking for success 
    //     3. if realloc has a null pointer passed as its first argument then it behaves as malloc
    //     4. if realloc is called with 0 as second argument, then it frees the memory,
    //        but it depends on the C standard and realization, it could be: free(my_pointer) or,
    //        something else, so if you use realloc this way, try to put my_pointer = NULL as well after realloc
    //     5. when expanidng, it doenst initialize the newly added blocks of memory (there is garbage)
    // 1.2 when shrinking memory, realloc should do that in place without moving the data in the block
    // 1.3 when expanding memory, realloc should try to do it in place as well, but if it cant, and the next,
    //     block of memory is alrady occupied then, realloc will allocate a new memory block elsewhere,
    //     and copy old data from previous block into newly allcated block, and be sure to also,
    //     update the pointer since realloc could move the data from old blocks of memory to somewhere else,
    //     this is why earlier i told that you can do my_pointer = realloc(my_pointer, size) or realloc(my_pointer, size)
    //
    // this way we expanded the a array with 2 more elements, we also ensure that if realloc needed,
    // to move the old data to new memory ddress we update the pointer through a temporary varible,
    // remember why ? if realloc fails we lose data if assign directly to the pointer
    int *temp = realloc(a, (n + 2) * sizeof(int));
    if (temp) {
        a = temp;
    }
}
