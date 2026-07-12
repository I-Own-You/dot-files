

int main() {
    // 1. this way you have an issue, not all string literals will have exactly 8 characters,
    //    and will be padded with \0, which means ineficiency since compiler at compiler time,
    //    gave 8 bytes for each element inside planets, '\0' still occupies memory
    //    9 elements, 8 bytes per elements =  9 * 8 = 72 bytes consumes planets variablee
    char planets[][8] = {"Mercury", "Venus",  "Earth",   "Mars", "Jupiter",
                         "Saturn",  "Uranus", "Neptune", "Pluto"};

    // 2. array of pointers which point to string literals, now each string literal,
    //    consumes exactly length + 1 elements, but its a string literal after all,
    //    you cannot change it as you could above with array
    char *planets_2[] = {"Mercury", "Venus",  "Earth",   "Mars", "Jupiter",
                         "Saturn",  "Uranus", "Neptune", "Pluto"};

    // difference:
    //    array of strings:
    //       1. contiguous memory
    //       2. modifiable strings
    //       3. cache-friendly
    //       4. wasted sapce
    //  
    //    array of pointers to string literals:
    //       1. less wasted memory
    //       2. string lengths are different for each string
    //       3. pointers to each string takes memory (we basically have an array of memory addresses around our RAM)
    //       4. string literals cannot be modified
    //    
}
