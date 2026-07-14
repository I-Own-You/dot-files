#include <stdio.h>
#include <string.h>

#define NAME_LEN 25

// 1. there is a problem defining plain strctu and variable at the end, if you will define all,
//    your variables there, then its fine, but if more variable of that struct type appear,
//    you would need to create the struct again and put the varible name at the end, so the struct,
//    in previous examples was nameless or you can call "anonymous", why its bad ?
//    1. you cant assign new variable of that struct type
//    2. you cant copy into other variables of that struct type since they all are anonymous so,
//       C interprets them as different
//    3. using variables as function arguments wont be possible since they dont have compatible type
//
//    there are 2 solutions:
//       1. structure tag - name to identify a particular kind of strucutre
//       
struct part {
    int number;
    char name[NAME_LEN + 1];
    int on_hand;

    // you dont have to assign variables here anymore, but you can, if you want, and then,
    // you can also assign this struct type to other vriables somewhere else
};
//
//       2. declaring struct as typedef
//       
// "typedef" before "struct"
typedef struct {
    int number;
    char name[NAME_LEN+1];
    int on_hand;
    // the name of the struct comes here, but it is not a variable, its the structure name now
    //
    // if you use this style (but you wont, you will always do: typdef struct [name] {...} [name]),
    // be aware that the same name will create 2 seaprate namespaces which means shadowing first with the latter,
    // and it wont compile the program, struct part {...};, typedef {...} part; is error, but again,
    // you wont do such things usually
} Part;

// 2. functions can have structures as arguments
void print_part(struct part p) {
    printf("Part number: %d\n", p.number);
    printf("Part name: %s\n", p.name);
    printf("Quantity on hand: %d\n", p.on_hand);
}
// 2.1.  and return values
struct part build_part(int number, const char *name, int on_hand) {
    struct part p;
    
    p.number = number;
    strcpy(p.name, name);
    p.on_hand = on_hand;
    return p;
}

// 3. sometimes you will want to initialize a structure with data from a function parameter which has same,
//    structure type, there is a rule though, the created variable must not have been declared as 
//    "static" since "static" variables are created once for whole program before even the function its declared,
//    in is invoked, you cant invoke more than 1 time since it means redeclaring the alreaddy "globally" local,
//    to this functioin variable (as we know about static rule)
void f(struct part part1) {
    struct part part2 = part1;
}

int main() {

    // STRUCT TAGS
    // 
    // 1. this way, you can create variables of "part" struct type, you cant drop the "struct" at the begining 
    struct part part1, part2;
    struct part part3 = {.number = 2, .name = "ala", .on_hand = 5};
    // 1.1 part is not a type name, it works because of "struct" at the begining, so it wont conflict with a
    //     a separate variable names "part"
    int part = 2;
    //
    // 2. all variables of type "part" are legal to copy into each other
    part1 = part3;
    part2 = part1;

    // TYPEDEF STRUCT
    // 
    // 1. now, you dont put "struct" before a chosen identifier as "part" in above example, instead,
    //    you put the structure name which was defined at the bottom "Part"
    Part part4, part5;

    // 1. this is how you call a function with a structure as an argument
    print_part(part3);
    // 2. this is how you call a function which returns a structure
    part1 = build_part(528, "Disk drive", 10);

    // 1. passing structures to function or returning a structure from a function  means copying actual data,
    //    which means it creates overhead for large data, in this case its better to pass a pointer to a structure
    //    (disscussed later in chapters)

    // 1. you can use compound literal for struct creation
    //
    // 1.1 here we use it to pass into a function which wants a struct part type argument
    print_part((struct part) {528, "Disk drive", 10});
    // 1.2 here you can assign a struct compound literal to a variable
    part1 = (struct part) {528, "Disk drive", 10};
    part2 = (struct part) {5, .name = "Disk drive"}; // number = 5, name = "Disk drive", on_hand = 0
    // 1.3 you can use a pointer to a compound literal structure as well
}

// you can share structure types between different source .c files by placing the declaration of a struct,
// inside .h file and then including the header in .c file (same goes with typedef)
// inside header file:
//     struct part {
//         int number;
//         char name[NAME_LEN+1];
//         int on_hand;
//     };
//  inside .c file
//     #include "[header_file_name].h"
//
//     struct part variable_name;
