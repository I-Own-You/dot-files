#include <stdio.h>
#include <string.h>

#define TITLE_LEN 50
#define AUTHOR_LEN 50
#define DESIGN_LEN 50

// 1. union consist of one or more members, possible of different types

// 2. compiler allocates only enough space for the largest of the members which overlay each other,
//    on that allocated space

// 3. assigning a value to a member alters the value of other members

// 4. properties of unions are the same as those of strucutres, like structure tags, typedefs, "=", .etc,
//    aside from 1 difference, initializing the union can be done only for the first member:

union {
    int i;
    double d;
} u;

union {
    int i;
    double d;
    
    // only first member can get a value when initializing (other will have its default value of their type though)
} u1 = {0};

union {
 int i;
 double d;

 // but we can break the previous example rule by using designators to initialize another member
} u2 = {.d = 10.0};

// an example of nested union inside a structure
struct catalog_item {
    int stock_number;
    double price;
    int item_type;
    union {
        struct {
            char title[TITLE_LEN+1];
            char author[AUTHOR_LEN+1];
            int num_pages;
        } book;
        struct {
            char design[DESIGN_LEN+1];
        } mug;
        struct {
            char design[DESIGN_LEN+1];
            int colors;
            int sizes;
        } shirt;
    } item;
};

// union which will be an array type giving the option holding either int/double
typedef union {
    int i;
    double d;
} Number;

int main() {
    // 1. here is how you can access members of a union
    u.i = 82;
    u.d = 74.8; // assigining this we will loose u.i, accessing u.i will have data, but meaningless

    // 2. here is how you access a nested union
    struct catalog_item c;
    strcpy(c.item.book.title, "hey");
    printf("%s", c.item.book.title);

    // 3. a cool way to use union is imagine an array which can store as its element either int or double
    Number generic_array[1000];
    generic_array[0].i = 5;
    generic_array[1].d = 23.5;

    // 4. if you need a way to know which member of a unoin is now active you could add a separate
    //    member like "kind" and check in your logic with predefined behaviour like,
    //    if kind == 0, its int, if kind == 1 its double, .etc, 
    //
    //    or use macros like:
    //    #define INT_KIND 0
    //    #define DOUBLE_KIND 0
    //    
    //    union.kind = INT_KIND;
    //    union.int_member = 2;
    //
    //    but be aware, with macro approach you have to set/unset everything, the first approach with,
    //    predefined behaviour is more appealing to me
}

