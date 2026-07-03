
#define N 10

// 1. now, you know you can use pointers in for loops by arithmetic operations(you actually will never,
//    do it ince most compilers nowadays do better, or its very nieche to do so)

int main(void) {
    int a[N], sum, *p;

    sum = 0;
    // since pointers are numbers you can just check the memory address since a[N-1,.etc] < a[N] is
    // aalways true
    for (p = &a[0]; p < &a[N]; p++)
        sum += *p;

    sum = 0;
    p = &a[0];
    while (p < &a[N])
        sum += *p++; // *(p++) since ++ has precedence
}
// *p++ or *(p++) Value of expression is *p before increment; increment p later
// (*p)++         Value of expression is *p before increment; increment *p later
// *++p or *(++p) Increment p first; value of expression is *p after increment
// ++*p or ++(*p) Increment *p first; value of expression is *p after increment
