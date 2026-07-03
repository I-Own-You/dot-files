
// conditional expression - a way to evaluate an expression and produce a values based on its true/false state:
// expression ? first_value : second_value;
// 1. when expression is evaluated, it assignes the first_value if expression is true, second_value if its false.

#include <limits.h>
#include <stdio.h>

int main() {
    int a = 1 > 0 ? 1 : 0;
    printf("%d\n", a);

    
    int nr;
    printf("give a number between 0 and 1000 inclusively: ");
    scanf("%d", &nr);
    printf("%s\n", nr >= 500 ? "greater or equal to 500" : "smaller than 500");


    int nr1 = 1;
    float nr2 = 2.5f;
    // in ? : operator, if integer types are mixed, the higher type takes precedence but with right value
    printf("number will be of type float: %f", 1 == 1 ? nr1 : nr2); // 1.0f 
}
