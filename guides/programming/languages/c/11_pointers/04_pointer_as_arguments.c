// 1. C passes arguments by values, this is where pointers can help with passing a pointer to a variable,
//    instead of its copy of value, my_func(&x); means passing a pointer to x into a function, and
//    since a pointer holds the memory address(a copy), a functin will be able to both read/write the
//    variable

// 2. remember, the rule is stil the same: passing pointers to functions passes A COPY OF THE POINTERS VALUE,
//    WHICH IS THE ADDRESS IT POINTS TO, not the actual variable, you cannot change the variable,
//    as a whole just through the pointer, only the variables value

void decompose(double, long *, double *);

int main() {
    double x = 3.14159;
    long i_part;
    double frac_part;

    // 1. since we pass a pointer to the variable, it will now pass the memroy address of it
    decompose(x, &i_part, &frac_part);

    // 1. but if you pass not the a variable, pointer or a real memory address that you know belong,
    //    to the program, oh boy... remember ? an indirected pointer must have a real address to
    //    work with, and known to your program, what is yours, but if its not and pointer happens to
    //    have a real used address, in either your program or whatever is on your pc, you are doomed
    //    (UB)
    // 1.1 one way to avoid this kind of thing is to always declare a prototype of a function where
    //     the compiler, clearly see that the parameter is a pointer which wont let you pass non-pointers
    decompose(x, 2, 2.22);
}

// 1. parameters must have "*" if its arguments is a pointer
void decompose(double x, long *int_part, double *frac_part) {
    // 1. real addresses are indirected and changes apply to the original variable outside the
    // function
    *int_part = (long)x;
    *frac_part = x - *int_part;
}

// 1. actually, you could need a ponter inside a function but not change it, just read it,
//    but why would you pass pointer then if you can pass a copy ? for efficiency, copying a big
//    data, requires time, a pointer is instant lookup at that address and thats it, but you want,
//    pointer to become non-modifieable, right ? you can use "conts" for this, like wiht const
//    variables, it will make a pointer to point to a constant variable of some type but cannot be
//    modified
void alo(const int *p) {

    // 1. not allowed
    *p = 5;

    // 1. but here is the truth, the pointer itself is not const right... so it can be modified, and
    //    now, you can assign other objects to it and change...
    int i = 0;
    p = &i;
    // 1.1 but you still cant modify the pointer value since its declared const in function
    // parameter
    *p = 5;

    // 1.2 to actually make the pointer itself const (so that the memory cannot be chaned) you must
    //     put "const", before the pointer variable name: int *const p but be aware, you must give it an address
    //     at declaration, not after, since after it cannot be modified whichc is UB in the end
    int j;
    int *const pp = &j;
    // 1.3 value of j still can be modified since we made only the pointer const
    *pp = 5; // j = 5

    // 1.4 to make both value and pointer const so they both cant be modified you must define "const"
    //     before type of variable and before pointer name and pointer type
    const int k = 100;
    const int *const pk = &k;
    // its unusual for such things, since k will never be modified and pk always points to k

    // 1.5 one important distinction is that you can make a pointer address constant so you cant modify it,
    //     through a pointer but the variable which pointer points to can be modified:
    int free = 0;
    const int *p_free = &free;
    *p_free = 5; // not allowed
    free = 5; // allowed

    // 1.6 so now you now you can combine these modifiers to produce desired logic
}
