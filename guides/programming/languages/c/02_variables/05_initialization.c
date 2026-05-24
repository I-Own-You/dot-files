// 1.   some variables are automatically set to 0 when programs starts to execute, but most are not.
// 1.1. a variable that doesnt have a default value and is not initialized is calleed an uninitialized variable,
//      accessing an uninitialized variable may yield a number or even may crash a program.
// 1.2. global variables (outside functoins) and static variables (both global/local) with "static"
//      before TYPE like this: static int a; are always initialized with a default value of its type,
//      BUT LOCAL VARIABLES ARE NOT, always give them default values, before you use them.

int main() {
    // 1. these are called initializers since every variable gets its value at declartion step
    int hei = 1, length = 2, width = 3, volume = 4;
    // 2. here only one variable is initialized
    float pro, loss = 2.0f;
    // 3. also you can declare a lot of variables without being initialized
    int a, b, c;
    // 4. a good approach is to declare a variable when you need it so be aware about declaring,
    //    a lot of variables on one line if you dont need them right away and much later
}
