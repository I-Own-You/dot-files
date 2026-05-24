// 1. you can assign to a variable using "=" symbol after NAME of the variable with a value of variable TYPE
// 2. assigning variables of some TYPE with another TYPE like float to int or int to float may work,
//    since int will transform to float and float to int but its never safe do so never do it.

int main() {
    int a, b;
    // 1. variable a is assigned value 5, value 5 is also a constant (it cannot change at runtime)
    a = 5;
    // 1. variable b is assigned value 6, value 6 is also a constant (it cannot change at runtime)
    b = 6;
    
    float c;
    // 1. when assigning to float variable types, int values will have .0 after 2 so 2.0
    // 2. always put "f" after the value is assigned, since compiler will warn about absence of it because,
    //    without "f" 2.0 is actually "double" type which "implicitly converses" into "float" since c is "flaot"
    // 3. you can assign "f" only if there is a "." decimal point with or without a digit after it,
    //    c = 5.f, c = 5.2f works but c = 5f does not, its an error
    c = 2.0f;

    // 1. you can also declare and assign at the same time to a variable.
    int d = 5;
}
