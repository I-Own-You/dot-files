// 1. when a computer performs an operation on operands, they must be of the same size,
//    and stored the same way.
// 1.1 but C compiler can combine different types and then generates instrucitons to convert
//     some operands to different types for the hardware to be able to evaluate the expressoin

// 2. there are 2 types of data conversion:
//    1. implicit - when programmer doesnt know, the C compiler does it automataically
//    2. explicit - when programmer does it by himself using cast operator
// 
// 2.1 implicit conversion occurs when:
//     1. operands in an arithmetic or logical expression are of different types.
//     2. when type of expressoin on the right is not the same as on the left variable.
//     3. when the type of an argument doesnt in a funciton call differs from the function parameter
//     4. when the type of an expressioon in "return" statement differs from the functioin return type
//
// 2.2 for integers, if we mix types, usually they all are converted to a type that can hold both of them
//     int + float -> float, as an example, since float is larger than int, and losing "." is not good
// 2.2.1 integer types mixed with floating types are always converted to floating type both,
//       integer types -> float -> double -> long double
// 2.2.2 float values are converted to higher flaoting types if needed: float -> double -> long double
// 2.2.3 integer types mixed are converted like this: 
//       _Bool -> char -> signed char -> unsigned char -> short -> unsinged short -> int -> unsigned int ->
//       long -> unsigned long -> long long -> unsigned long long

// 3. a signed operand combined with unsinged operand the signed operand is converted into unsigned if 
//    unsigned accomodates both types, otherwise it converts unsigned to signed, if signed accomodates instead.
// 3.1 mixing signed and unsigned should never occur, it produces too much bugs.
// 3.2 every type can be covnerted into _Bool(0,1)

int main() {
    // 1. implicit conversions:
    char c;
    short int s;
    int i;
    unsigned int u;
    long int l;
    unsigned long int ul;
    float f;
    double d;
    long double ld;
    i = i + c;   /* c is converted to int */
    i = i + s;   /* s is converted to int */
    u = u + i;   /* i is converted to unsigned int */
    l = l + u;   /* u is converted to long int */
    ul = ul + l; /* l is converted to unsigned long int */
    f = f + ul;  /* ul is converted to float */
    d = d + f;   /* f is converted to double */
    ld = ld + d; /* d is converted to long double */
    
    char c1;
    int i1;
    float f1;
    double d1;
    i1 = c1; // c1 converts into int
    f1 = i1; // i1 converts into float
    d1 = f1; // f1 converts into double

    int int_number;
    i = 842.555; // float types assigned to integer types drops the decimal part, i = 842
    i = -842.555; // -842

    char char_too_small;
    int int_too_small;
    float float_too_small;
    char_too_small = 1000; //     UB, value surpases type capability
    int_too_small = 1.0e20; //    UB
    float_too_small = 1.0e39f; // UB

    // 2. explicit conversions
    // 2.1 C provides a cast expressoin which can convert a type into another with a form: ( type-name ) expression
    float ff, fract_part;
    fract_part = ff - (int) f; // f -> int, then since ff is float, f -> float for the operation to be performed,
                               // so you kind of dropped the decimal part but made it float again
    // 2.2 the precedence of casting is as unary operators + and -:
    float quotient;
    int dividend, divisor;
    quotient = (float) dividend / divisor; // ((float) dividend) / divisor
    // 2.3 casting can also prevent overflows
    long ik;
    int jj = 1000;
    i = jj * jj; // if a pc cannot represent the result of 2 ints, we will have errors
    i = (long) jj * jj; // now both operands will cast into long which would probably represent the result
    
}
