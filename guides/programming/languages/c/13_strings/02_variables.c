

// 1. in C, any one-dimensional array of characters can be used to store a string but,
//    it must contain a NULL CHARACTER at the end, otherwise its not considreded a string, or
//    it will just be very difficult to use it as a string, another problem is if you decide,
//    to have multiple NULL CHARACTERs, then it becomes literally hell.

// 2. finding the length of a string is literally done only in 1 way:
//    1. by counting the characters until NULL CHARACTER encountered,
//    2. using functions from stdlib (which do the same, actually...)

// 3. ALWAYS add length + 1 for your array based string for the NULL CHARACTER, if a program runs,
//    and you dont have '\0' UB will 99.9% happen, also stdlib functions rely on '\0' as well
// 3.1 it doesnt mean you will always have full array of strings, for example #define str_len 80, char str[str_len+1]
//     we could have a full array, we could have half, we could have 10% of it, its just a conveniece to declare,
//     the max amount possible of knowing usage; also, the length of the string is defined not by its max amount,
//     of length of the array but by the NULL CHARACTER (of course we must not go beyong array length anyway), but sill,
//     if we have full array of chars but every 10 index is '\0' it will literally stop at 10 index without going,
//     to last element inside array, this of course means you parse it for first NULL CHARACTER encountered;
//     so the rule is: you are responsible for the parsing logic, but it will usually be based on first '\0',
//     and all the time your character based array will have only one '\0' at the end, thus why we need +1 for length

int main() {
    // 1. initializing a string as an array of characters
    char date1[8] = "June 14"; 
    // 1.1 you could thing the above actually as of string literal since we have string literal at the right hand,
    //     C actaully sees this as this: char date1[8] = { 'J', 'u', 'n', 'e', ' ', '1', '4', '\0' };

    // 2. if the right hand string literal is shorted than actual length of the array,
    //    then C just appends NULL CHARACTERs beside last '\0'
    char date2[9] = "June 14"; // ['J', 'u', 'n', 'e', ' ', '1', '4', '\0', '\0']

    // 3. if your array is shorted than the right hand string literal but enough for the characters without,
    //    '\0' at the end, C will allow such things but its not a string anymore,
    //    and no NULL CHARACTER will be appended making the array just character based, not a string
    char date3[7] = "June 14"; // ['J', 'u', 'n', 'e', ' ', '1', '4']

    // 4. you can omit the length and let C compiler count for you which is useful, it will also add +1,
    //    for the length, so its like date4[8] in our case since "June 14" is 7 chars, +1 for '\0'
    char date4[] = "June 14";

    // 5. you can also make a string literal point to your character based array
    char alo[] = "ab";
    char *p = alo; // *p == 'a', *++p == 'b', p[2] == '\0'

    // 5. so, array based strings and pointer based string literal looks the same right ? both kind of,
    //    good relationship between pointer and array but there is a crucial difference:
    //    1. pointer based string litreals cannot be changed
    //    2. array based strings can change
    char *pp = "a"; // ['a', '\0']
    *pp = 'b'; // it must be error right ? and it is, its UB, but C allow such nonsesne for backward compat.
    // 
    // this is allowed
    char aka[] = "ab"; // ['a', 'b', '\0']
    aka[0] = 'b'; // ['b', 'b', '\0']
    
}
