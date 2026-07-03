// 1. a massive problem porting programs acroos computers is that they can be of different size,
//    16 bit, 32, 64, .etc

// 2. C provides a statement "typedef" to define new names for our types
typedef int Quantity;
typedef long int ptrdiff_t;
typedef unsigned long int size_t;
typedef int wchar_t;

// 3. <stdint.h> header uses typedef statement to define names for integer types with a particular,
//    numbers of bits, like int32_t, int64_t, .etc

// 4. typedefs are more powerful than macros:
//    1. array and pointer types cannot be defined as macros
//       #define PTR_TO_INT int *
//       PTR_TO_INT p, q, r; == int * p, q, r; // int *p, int q, int r, only p is a pointer to p
//                                             // typedef dont have such problems, all would be pointers
//    2. typedefs defined outside functions are seen everywehere inside the file,
//       but if defined inside a function, they are seens only there, but macros replaces everywhere in the file.

int main() {
    // 1. you can now use the newly created type to assign to a variable:
    Quantity q; // q is int;
                // why even bother ? because when we port program to other pc,
                // we can just change the typedef above form int to long: typedef long Quantity, thats it,
                // but it wont solve everything in program, now printf/scanf would require "%ld" instead of "%d",
                // and conversions, .etc
}
