#include <stdio.h>

// 1. main memory of a computer is divided into bytes, each byte can store 8 bits.
//
// 1.1 each byte is distinct from other bytes so that you can distinguish them

// 2. an executable program consists of both code(machine instruction which relates to
//    statements in C program) and data(variables)
// 2.1 each variable occupies 1 or more bytes of memory
//
// 2.2 the address of the first byte is said to be the address of the variable
//
// int i; "i" occupies 4 bytes(32+cpu) like 2000 and 2001, 2000 is considered the address of "i"

// 3. addresses are represented by numbers but they can differ from the "int" range, so you cant
//    store, them , in an int variable, but we can store them in special variables: "pointer variables"
//
// 3.1 if we would store the address of variable "i" into pointer variable "p" it means "p" now,
//     points to "i" which means "p" is just an address(a copy of "i" address), the same one which holds "i"
//
// 3.2 declaring a pointer variable differs form simple variables through the fact that a pointer,
//     variable has an asterisk after the type of before the variable name: int *p;
//     this means varialbe "*p" can point to objects of type "int", why "object" and not variable ?
//     because a pointer variable can point to an adress which is not a variable(later we will see
//     how)
//
// 3.3 C requires a pointer to point only to something of its type, but in reality a pointer doesnt care,
//     it can point to another pointer if you want, or even other type, so its powerful, but you
//     must, always point to its type(and it must exist in your program) to not encounter UB behaviour.

// 4. you can use %p placeholder inside printf to print an address of a pointer or variable

int main() {

    // *p, *q - pointer variables which point to int type
    int i = 0, j, a[10], b[20], *p, *q;
    p = &i;

    printf("%d\n", *&p == &i);
    printf("%p\n", &p);

    // KEY POINT TO UNDERSTAND:
    // pointers value inside the pointer varialbe IS A COPY OF THE MEMORY ADDRESS OF WHAT IT POINTS TO,
    // so: int i, *p = &i;
    // here, p doesnt become i itself, p just hold as a value a copy of the &i value, changing p,
    // will not change the "i" itself as a variabe, only "i" value
    
}
