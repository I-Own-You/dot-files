

// 1. we can have structures whose member are bit-fields
struct file_date {
    // eacch number of the member at the end specifies the length in bits
    unsigned int day : 5;
    unsigned int month : 4;
    unsigned int year : 7;
    // the type of the fileds with bit lengths must be either:
    // int, unsigned int, signed int, _Bool
    // try to void int, since its ambiguous by some compilers because of the sign so either unsigned int or signed int
    //
    // there is a restriction to bit fields members though:
    //      1. we cant have a pointer to a bit field opeartor, so no & is allowed on this
    //
    // how bit-fields are stored if we know that memory has a storage unit(implementation defined, 8,16,32,.etc)
    // while a structure declaration is processed, the compiler packs bit-fields 1 by 1 into a storage unit with
    // no gaps between the fields until there is not enough room for the next field.
    // at that point some compilers skip to the beginning of the next storage unit,
    // while others split the bit-field across the storage units (depends on the implementation of the compiler
    // which approach will be used, the order of members allocation is also implementation defined,
    // either left to right or right to left, usually right to left).
    //
    // struct bit fields are not portable free since the storage units of bit fields are implementation defined.
};
// did you realize the idea ?
// 5 bits 11111, max number is 31 as our max day counts in a month
// 4 bits, 1111, max number is 15, since we cant have exact 12 field width we have 15 but it can store 12 months
// 7 bits, 1111111, max number is 127, but out year is even more right ? in ms-dos time start from 1980, so
//         1980 + 127 is max for now

// we could redefine our structure since all members have same type
struct file_date2 {
 unsigned int day: 5, month: 4, year: 7;
};

// we can actually have an unnamed bit field just for the purpose of padding in memory, and alignment of structure
// its still allocated, its just that we wont use it
struct file_time {
    unsigned int : 5; /* not used */
    unsigned int minutes: 6;
    unsigned int hours: 5;
};

// we can specify a bit field with 0 length, and depending on the storage unit(implementation defined),
// if its 8 bit, then it will allocate 4 bits for "a", skip another 4 bits, then allocate 8 bits for "b"
struct s {
    unsigned int a: 4;
    unsigned int : 0; /* 0-length bit-field */
    unsigned int b: 8;
};

int main() {
    struct file_date2 fd;
    fd.day = 28;
    fd.month = 12;
    fd.year = 8; // 1988, since time in computers start from 1980
    // fd structure will have this length: 0001000 - year 1100 - month 11100 - day, 0001000110011100

    // you can take a number, and create a pointer at the address of that number
    int *p;
    p = (int *)1000; 
    // p points to memory address 1000 in memory, something like 0x1000 in memory
    // this is useful in low programming since sometimes you will have programs that will tell you,
    // were to look for it to control it or use it somehow:
    //      BYTE *p; 
    //      p = (BYTE *) 0x1000; // p containns address 0x1000
}
