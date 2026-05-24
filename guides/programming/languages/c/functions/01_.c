// 1. a function is a block of code where statements are placed to be executed

// 1. "main" is the entry point where code starts execution, no other function executes beside "main"
// 2. the name must be exaclty lowercase "main", nothing else will work.
// 3. "int" before main indicates the function return an integer after execution (to the os in our case)
//    "void" would mean our function returns nothing from it,
//    but "main" cant be "void", only others
int main() {
    // 1. return keyword stops the execution of "main" and returns 0
    // 2. if theres no "return" the program will still terminate when no code is anymore to execute,
    //    but usually compiler gives a warning if no "0" is returned because of "int" type of "main",
    //    which wants us to return an integer.
    return 0;
}
