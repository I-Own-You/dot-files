#include <stdio.h>

#define NAME_LEN 25

// 1. structure - collectioin of values(members), possible of different types

// this is how you would define a structure
struct {
    // members of the structure, just as you would define a type and its identifier
    //
    // these members are stored in memory in the order they are declared:
    // 4 bytes (for int) | 26 bytes (for char) | 4 bytes (for int), everything is contiguous, no
    // gaps
    //
    // for now, members are empty, no values were given, UB if try to access
    //
    // names inside a strcutre are in a separate scope so they dont conflict without outside
    // identifiers
    int number;
    char name[NAME_LEN + 1];
    int on_hand;

    // part1 and part2 are just global variables of this struct type
} part1, part2;

struct {
    int number;
    char name[NAME_LEN + 1];
    int on_hand;

    // the above example has no initialized members with given values, this examples hows how you
    // can give, members values (aka default values)
    //
    // 1. values must be of the same type as members order inside the struct
    // 2. initializers for structure member typically follow rules as array initializiers
    // 3. values given to members must be constants, so simple variables cannot be used, but *const*
    // ones can
    // 4. members that wont be given values will receive default 0 value of its type, and no,
    //    you cannot skip values like this: { , , } its not allowed
} part11 = {528, "Disk drive", 10},
  part22 = {914, "Printer cable", 5};

struct {
    int number;
    char name[NAME_LEN + 1];
    int on_hand;

    // 1. in previous example its sad you cant skip values and order in which you give values,
    //    but there is a way with the usage of designators, basically [.][member_name],
    //    and you dont have to follow the order of members now, but you must be cautious though,
    //    if you have a designator and then a value without desginator, that value will be,
    //    assumed to be assigned to the member after that designator, dont mix them though, less
    //    bugs.
} part111 = {.number = 528, .name = "Disk drive", .on_hand = 5},
  part222 = {.number = 914, "Printer cable", .on_hand = 5};

int main() {

    // 1. this way you can access struct members, not by [index], but by [struct_variable][.][member_name]
    printf("Part number: %d\n", part1.number);
    printf("Part name: %s\n", part1.name);
    printf("Quantity on hand: %d\n", part1.on_hand);

    // 2. since struct members are lvalues, they can appear on the left side of an assigment or +,- operators,
    //    basically an identifier variable
    part111.number = 258;
    part111.on_hand++;

    // 3. "." operator is actually part of C operators with precedence same as postfix ++,--
    printf("%p", &part111.on_hand); // &(part111.on_hand)
    
    // 4. you can also assign structs to other structs of the same structures,
    //    this copies all part111 members into part222, part222.number = part111.number, .etc,
    //    yes arrays are copied too (dont overuse this technique to just copy arrays...),
    // 4.1 "=" works only on compatible structures: (structure inside must be same and name of struct too)
    //     1. 2 variable of same structure as part111 and part222 of same structure
    //     2. structures with same "structure tag"
    //     3. same type name (typedef)
    // 4.2 "=" is the only operator workiing with strutctures, ther are no more.
    part222 = part111;
}

// size of the structure is not always the same as members combined, some compilers will actually,
// make smaller types into the largest member type to accomodate it and leave holes at the end of structure or,
// even holes between members but never at the beginig.
