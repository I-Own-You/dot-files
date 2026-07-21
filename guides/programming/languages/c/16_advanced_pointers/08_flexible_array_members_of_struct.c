#include <stdlib.h>

#define N 5

// 1. there is a trick called "struct hack" which means you store an array inside a struct,
//    and its length

struct vstring {
    int len;
    // but here is the problem with this apporach, we always create the struct with this member,
    // having N bytes since char is 1 byte, but our string could be less than N bytes so we dont
    // need, a hardcoded string
    char chars[N];
};

struct vstring2 {
    int len;
    // now, we define a dummy value, like 1, and then, in main we will dynamically allocate,
    // new memory for our string but substracting thhis dummy value
    char chars[1];
    // this trick works with any array type
};

struct vstring3 {
    int len;
    // since this trick is so widely used C99 introduced a feature called: flexible array member,
    // it basically means if you have a member of a struct which is located as the last member,
    // you can assign 0 length for it (so it wont occupy memory) until we initialize the structure
    char chars[];
    // but there are rules for this to work:
    //    1. array must be the last member
    //    2. ther must be at least another member beside the array, so 2 members within a struct
    //    3. copying a structure with a flexible array member will copy other members but not the array itself
    //    4. structure with a flexible array member is called: an incomplete type, what it means ?
    //       structure misses information about how much memory it requires, so it has some restrictions:
    //           1. it cant be a member of another structure
    //           2. it cant be an element of an array, but array can contain as an element a pointer,
    //              of a structure with incomplete type
};

int main() {
    const int n = 5;

    // here, we define a memory with struct vstring2 size + n bytes (for the string) but substracting,
    // that dummy value, now our string can store n bytes (1 bytes - 1 character)
    struct vstring2 *vstring2 = malloc(sizeof(struct vstring2) + n - 1);

    // here is how we allocate memory for that struct with 0 length array
    struct vstring3 *vstring3 = malloc(sizeof(struct vstring3) + n);
    vstring3->len = n;

}
