#include <stdio.h>

// 1. C provides 6 bitwise operators which operate on integer data ath the bit level

// bitwise shift operator - can transform binary representation of an integer by shifting
//                          bits to the left or right: <<(left shift), >>(right shift)
//
//                          1. operands of shift operator can be any integer type, integer promotion,
//                             is done on both operands and the result has the left operand type:
//
//                             example: 
//                                      1. i << j, bits in "i" are shifted left by "j" places, for each bit that,
//                                         goes left, a 0 bit enters at the right
//                                      2. i >> j, bits in "i" are shifted right by "j" places.
//
//                                      rules: 
//                                            1. if "i" is "unsigned" type or the value of "i" is not negative, then,
//                                               0 bits are added at the left if needed
//                                            2. if "i" is negative, the result is implementation-defined, some add,
//                                               0 at the left end, or add 1 to preserve minus sign, so try to,
//                                               make shifts only on unsinged numbers
// 
// bitwise complement   (~) - unary operator , integer promotion is performed on its operand
// bitwise and          (&) - binary operator, arithmetic conversions are usually made on its operands 
// bitwise exclusive or (^) - binary operator, arithmetic conversions are usually made on its operands
// bitwise inclusive or (|) - binary operator, arithmetic conversions are usually made on its operands
// 
// ~, &, ^, | operators perform boolean opeartions on all bits in their operands
//
// complement(~) - produces complement of its operand with 0s replaced by 1s and 1s replaces by 0s
// and(&) - performs boolean and operation on all bits in both operands, so both bits must be 1
// exclusive or(^) - perform a boolean "or" operation on bits of both operands,
//                   producing 0 if both bits from both operands are 1
// inclusive or(|) - perform a boolean "or" operation on bits of both operands,
//                   producing 1 if at least 1 bit from both operands is 1
// 
// ~, &, ^ have precedence highter than |
// ~, &, ^, | precedence of all of them is lower then relational and equality operators
// &, ^, | have compound assignment forms: &=, ^=, |= like k2 &= i2

int main() {
    unsigned short i, j;

    i = 13;     // 13, 0000000000001101 in binary
    j = i << 2; // 52, 0000000000110100 in binary, see ? bits went left on 2 places, and 2 zeors were added at right end
    j = i >> 2; // 3,  0000000000000011 in binary, see ? bits went right 2 places, and 2 zeors were added at left end
    // did you notice ? we didnt change "i", we just used it for operations

    // to actually change "i" we need to assign to it the new value or use copound assignmet: <<= or >>=
    i <<= 2; // 52, 0000000000110100
    i >>= 2; // 13, 0000000000001101
    // bitwise operators have lower precedance than arithmetic operators btw, so 13 << 2 + 1 is 13 << (2 + 1)
    
    unsigned short i2, j2, k2;
    i2 = 21;      // 21   , 0000000000010101 
    j2 = 56;      // 56   , 0000000000111000
    k2 = ~i2;     // 65514, 1111111111101010
    k2 = i2 & j2; // 16   , 0000000000010000 
    k2 = i2 ^ j2; // 45   , 0000000000101101 
    k2 = i2 | j2; // 61   , 0000000000111101

    // we can use bitwsie operators to extract or modify data taht is stored in a small number of bits
    unsigned short nr;
    // we want to set the 4th bit of "nr", how ?
    // 
    // 1. in our example, we assume that the leftmost or "most significatn" bit is numbered 15,
    //    and the least significant is numbered 0(by the logic its the right most)
    // 2. the easies way to set bit 4th is to "or"(|) the value of "nr" with the constant,
    //    "0x0010"(this is usually called a "mask", in our case it contains 1 bit in position 4) 
    nr = 0x0000;   // 0000000000000000
    nr |= 0x0010;  // 0000000000010000
    // also, if we have the bit at needed place, we can use shift operator to shift it in needed direction
    unsigned short bit_pos;
    // nr |= 1 << bit_pos;
    // how does above work ? 
    // 0x0000 is a hexa decimal number, each digit of a hexa number is 4 bits wide, so right most digit is 0,
    // means 0000, second digit is 1 means 0001, if we take 0001 near 0000, we have 00010000 which gives us,
    // 4 bits moving to the left, why 4 if 1 is on 5th position ? because computers start from 0, so 0,1,2,3,4,
    // 4 bit left, which means it will end on 5th position, actually using mask is kind of not the right usage here,
    // a better approach would be (1 << 4) since we exactly know what happens, 1 bit 4 places left
    //
    // we want to clear a bit, how ?
    // 
    nr = 0x00ff;    // 0000000011111111
    nr &= ~0x0010;  // 0000000011111111 & 1111111111101111 = 0000000011101111
    // a better approach would be nr &= ~(1 << bit_pos)
    //
    // we want to test a bit, how ?
    //
    if (nr & 0x0010) {
        printf("the bit is set\n");
    }
    // a better approach would be nr & (1 << bit_pos)

    // actually there is an easy encryption techqnique where you have a key and you encrypt your desired,
    // symbol by this key and you get another key, then you encrypt again the key with the produced symbol,
    // to get the previous symbol
    // 
    //     00100110 (ASCII code for &)
    // XOR 01111010 (ASCII code for z)
    //     01011100 (ASCII code for \)
    //
    //     00100110 (ASCII code for &)
    // XOR 01011100 (ASCII code for \)
    //     01111010 (ASCII code for z)
    //
    // there are problems with encrypting some characters such as digits where the result could be a
    // control character which cant be printed
}

