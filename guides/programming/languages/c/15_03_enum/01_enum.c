#include <stdio.h>
#include <string.h>

// 1. enumeration - a way to give names to numbers
// 1.1 why useful ? image you have a lot of statuses which mean different things, like,
//     success, error, update, .etc, use string ? be real...
//     what if we could have same names but assigned numbers to it which means those statuses ?

enum { SUCCESS, UPDATE, RELOAD, ERROR } s1, s2;

// 2. identifiers in the same enclosing scope with that enum cannot have names from within enum,
// int SUCCESS = 0; // error

// 3. constants inside enum are similar to macros constant, but they are not equiavalent,
//    how exactly ? enum declared inside a function is visible only to that function

// 4. you can use enumeration tag or typedef enum to have a name for an enum
enum status_codes { SUCCESS1, UPDATE1, RELOAD1, ERROR1 };
typedef enum { SUCCESS2, UPDATE2, RELOAD2, ERROR2 } t_status_code;

// 5. by default, C treats enum constants as integers and assigns them numbers starting from 0, then 1,2,3,4,.etc
// 5.1 you can start the counting from different number by specifying the first, or let it start as 0,
//     and then specify another constant a number and rest constants after it will be prev_number + 1,
//     you can even give all the constatns arbitrary numbers and none of them will be auto incremented
enum status_code_defined { SUCCESS3, UPDATE3 = 5, RELOAD3, ERROR3 = 520}; // 0, 5, 6, 520

int main() {
    enum status_codes status1, status2;
    t_status_code status3, status4;

    // and yes, here actaully a meaningful knowledge, even though enum constant are just numbers,
    // if a variable of some enum type is declared a constant from another enum, an implicit casting,
    // will happen, bear this in mind, only constants from an enum wihtout a name and constants from,
    // enum type of the variable can assign to the variable for it to not be casted
    status1 = SUCCESS1; // ok, its from status_codes enum
    status1 = SUCCESS; //  ok, its globally defined enum {};
    status1 = SUCCESS2; // ok, but will implicitly cast SUCCESS2 like (enum status_codes) SUCCESS2,
                        //     since SUCCESS2 is from t_status_code enum

    // this is how you basically use it
    if (status1 == SUCCESS1) {
        printf("nice\n");
    }
}

// remember, enum constants are just numbers under the hood, it can be used anywhere a number can,
// even store as indexes for an array and getting elements like: my_array[spain], my_array[italy], .etc
