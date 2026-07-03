#include <stdio.h>

// 1. integer type is a whole number which can be both signed(-)
//    and unsigned, you can put (+) in front but it doesnt have sense since 2 is equal to +2
// 1.1 IMPORTANT: CPU + standard library + target platform decides how many bytes will a type have,
//                the compiler will choose based on them(usually cpu and target platform).

// 2. singed - from negative to positive boundary wiht left-most bit(sign bit) being 0
//    example: 16 bit number -> 0111111111111111 -> 2^15-1 -> 32767
// 2.1. unsinged - from 0 to higher, so non-negative but double the size of signed version with left-most bit being 1
//    example: 16 bit number -> 1111111111111111 -> 2^16-1 -> 32767 * 2 -> 65535
// 2.2 all integer types are "signed" by default unless specified as "unsigned"

// 3. int types are usulaly 32 bit(4 bytes), but dependent on CPU architecture, on CPU with 16 bit int will be 16, .etc
// 3.1 if you need a higher int then you can use "long" integer type (8 bytes)
// 3.2 if you must think about memory and preserve numbers in a lower memory consumption there is,
//     "short" integer type (2 bytes)

// 4. you can specify integer types with its signed version as follow:
short int a1; // same as short a1;
unsigned short a2; 
// 4.1 as you can see, "int" at the end is not mandatory and should often be avoided for verbosity
// 4.2 "unsigned" and "signed" can come before/after type, it doesnt matter, all 3 declarations are the same:
unsigned long int c1;
long unsigned int c2;
long unsigned c3;
unsigned long c4;

// 5. C standard specifies that short < int < long, but it can be not the case if CPU is 16 bit, 32 bit, 64 bit:
// 16 bit CPU:
//     type:                        smalles value:                       largest value:
//          short int                             -32,768                              32,767
//          unsigned short int                    0                                    65,535
//          int                                   -32,768                              32,767
//          unsigned int                          0                                    65,535
//          long int                              -2,147,483,648                       2,147,483,647
//          unsigned long int                     0                                    4,294,967,295
//
//  32 bit CPU:
//     type:                        smalles value:                       largest value:
//          short int                             -32,768                              32,767
//          unsigned short int                    0                                    65,535
//          int                                   -2,147,483,648                       2,147,483,647
//          unsigned int                          0                                    4,294,967,295
//          long int                              -2,147,483,648                       2,147,483,647
//          unsigned long int                     0                                    4,294,967,295
//
//  64 bit CPU:
//          short int                             -32,768                              32,767
//          unsigned short int                    0                                    65,535
//          int                                   -2,147,483,648                       2,147,483,647
//          unsigned int                          0                                    4,294,967,295
//          long int                              –9,223,372,036,854,775,808           9,223,372,036,854,775,807
//          unsigned long int                     0                                    18,446,744,073,709,551,615
// 
// 5.1 there is an additional type, "long long" it was added as an "agnostic" type for strictly being at least,
//     8 bytes so long long >= long, it was added because there were increasing of 64 bit CPUs and programmers,
//     needed more capacity, so on most 64bit long long will be 8bytes and more depending on implementation.
// 5.2 long long on 64bit on both windows and linux will be 8 bytes at least, so you cannot use long for both,
//     windows and linux thinking it will be 8 bytes since long on windows is actually 4 bytes, so long long
//     for portability is a good usage or when you must have more capacity then long and implementation,
//     allows it.
// 5.3 there is a difference between C standard and CPU capabilities, so C standard says hierarchy must be,
//     respected like short < int < long <= long long but if CPU is for example 32 bit, then data types,
//     will shrink if they are bigger than what CPU allows, so long and long long becomes 4 bytes.
// 5.4 you can extend "integer" types and make them bigger/smaller, for example on cpus with 2 bits or 128 bits.

// 6. you can check a file called <limits.h> from std lib as a "viable" way
//    to see the limitations of the current implmenetation(CPU + platform + stdlib)

// 7. integer constants - numbers that appear as text in a program (not read/writen/computed)
// 7.1 C allows octal(8), hexadecimal(16) and decimal(10) base to be written.
// 7.1.1 octal numbers are numbers that represent other numbers only through digits from 0 to 7:
//       from octal to decimal:
//          o237 -> 2 * 8^2 + 3 * 8^1 + 7 * 8^0 -> 159, // octal number 237 represents decimal number 159
//       from decimal to octal:
//          159 % 8 -> 7 (first octal nr)
//          159 / 8 -> 19
//          19 % 8 -> 3 (second octal nr)
//          19 / 8 -> 2
//          2 % 8 -> 2 (third octal nr)
//          gather all numbers from modulo from right to left -> 237 -> o237
//          
// 7.1.2 hex numbers that represent other numbers using digits from 0 til 9 + letters from A to F
//       which means A,B,C,D,E,F where A = 10, B = 11, C = 12, D = 13, E = 14, F = 15:
//      from hexa do decimal:
//          1AF -> 1 * 16^2 + 10 * 16^1 + 15 * 10^0 - > 431, // hexa 1Af represents decimal 431
//      from decimal to hexa:
//          431 % 16 -> 15 -> F (first hexa nr)
//          431 / 16 -> 26
//          26 % 16 -> 10 -> A (second hexa nr)
//          26 / 16 -> 1
//          1 % 10 -> 1 (third hexa nr)
//          gather all numbers from modulo from right to left -> 1AF -> x1AF
//
// 7.2 decimal cnstants contain digits from 0 to 9 but must not start with 0: 10 255 32767
// 7.2.1 octal constants contain digits form 0 to 7 and must begin with number 0: 017 0377 077777
// 7.2.2 hexa constants contain digits from 0 to 9 + letters form A to F and must begin with 0x:
//       0xff 0xfF 0xFf 0xFF 0Xff 0XfF 0XFf 0XFF - case insensitive
// 7.3 the representation doesnt matter, eitehr decimal/octal/hexadecimal, its just a dispaly of some form,
//     integer numbers are all stord as binary.
// 7.4 we can switch the representation and perform operations with it, it doesnt matter:
//     10 + 015 + 0x20 -> 55 decimal
// 7.4.1 octal and hexa are useful only on low level programming usually.
// 7.5 the type of a decimal constant is ually "int" if it can fit, if not, it makes it "long", if agint not,
//     compiler tries unsigned long int.
// 7.5.1 octal and hexa constants are usually assigned "int", "unsigned int", "long int", "unsinged long int"
// 7.5.2 to force the compiler to make a constant either decimal/octal/hexa of "long" type,
//       you can put after the number letter "L"/"l"(means long): 15L, 0377l, 0x7fffL
// 7.5.3 to force the compiler to make a constatn "unsigned" you can put "U"/"u" after it:
//       15U, 0377u, 0x7fffu
// 7.5.4 you can mix long and unsigned together: 15Ul, 0377uL, 0x7fffLU
// 7.5.5 "LL" or "ll" also means forcing long long int type, "U"/"u" means unsinged long long int
// 7.5.6 if a constant is too high, meaning no type covers it, compiler can provide an extended integer type
//       which will handle it, not part of C stdlib, its a compiler feature, but most stop at unsigned long long
// 7.6 hexa can also represent a floating point number: 0x1.Bp3, here p is for the exponent,
//     the hexa number can have "F"/"f" for (float), "L"/"l"(long double), omitting it,
//     default (double) is assumed.
// 

// 8. integer overflow - 2 types performed an operation an the result is higher than type itself:
//     printf("%d", 2147483647 + 1); 
// 8.1 result of integer overflow depends on the "sign" of the operands:
//     signed operands(both): result is UB. (could display wrong number, could crash, .etc)
//     unsigned operands(at least 1): we get the modulo of it by max type value starting from 0:
//                                    65535 + 1 -> 0
//                                    65535 + 2 -> 1
//                                    2_147_483_647 + 10 -> 9

int main() {
    unsigned int u = 1;
    // 1. to dispaly an unsigned "int" number you can use these placeholders:
    printf("%u", u); // reads in base 10
    scanf("%u", &u); // writes in base 10
    printf("%o", u); // reads in base 8
    scanf("%o", &u); // writese in base 8
    printf("%x", u); // reads in base 16
    scanf("%x", &u); // writese in base 16
    // actually, %o and %x works with non-negative values of octal and hex,
    // to display an negative form of it(which is rare) you will need a "-" in front
    // 
    // 1.1 to display a "short" integer you can use thsee placeholders
    short s;
    printf("%hu", s); // reads unsigned representation of "short" integer
    scanf("%hu", &s); // writes unsigned representation of "short" integer 
    printf("%hd", s); // reads in base 10
    scanf("%hd", &s); // writes in basae 10
    printf("%ho", s); // reads in base 8
    scanf("%ho", &s); // writes in base 8
    printf("%hx", s); // reads in base 16
    scanf("%hx", &s); // writes in base 16
    //
    // 1.2 to dispaly a "long" integer you can use these placeholders:
    long e;
    printf("%lu", e); // reads unsigned representation of "long" integer
    scanf("%lu", &e); // writes unsigned representation of "long" integer 
    printf("%ld", e); // reads in base 10
    scanf("%ld", &e); // writes in basae 10
    printf("%lo", e); // reads in base 8
    scanf("%lo", &e); // writes in base 8
    printf("%lx", e); // reads in base 16
    scanf("%lx", &e); // writes in base 16
    // 1.3 to dispaly a "long long" integer you can use these placeholders:
    long long f;
    printf("%llu", f); // reads unsigned representation of "long" integer
    scanf("%llu", &f); // writes unsigned representation of "long" integer 
    printf("%lld", f); // reads in base 10
    scanf("%lld", &f); // writes in basae 10
    printf("%llo", f); // reads in base 8
    scanf("%llo", &f); // writes in base 8
    printf("%llx", f); // reads in base 16
    scanf("%llx", &f); // writes in base 16
    
}
