#include <stdio.h>

// "if" statement allows to choose between statments to execute based on an expression it evaluates (0 or 1)

int main() {
    // true
    if (1) printf("yes its 1\n");
    // true
    if (1 >= 1 && 2 < 3) 
        printf("yes 1 is equal or higher than 1 and 2 is lower than 3\n");
    
    // false 
    if (0) printf("");
    // false
    if (!1) 
        printf("");
    // true, since "a" evaluates into 1 and 1 is considered true, a++ would not be true
    int a = 0;
    if (++a) printf("will execute\n");

    // 1. compound statements are a way to tell the compiler we want a block of code to be executed,
    //    as a single statement, usually by putting { } around it, it helps with isolation of code flow,
    //    here variables are not visibile outse { } where they are defined
    int b = 5;
    {
        int b = 10; // you actually shadow the outside b, you cant access it, only this b can be accessed
        printf("%d\n",b); // 10
    }
    printf("%d",b); // 5
    // 1.1. compound statements are useful for if statements as well (and not only them):
    if (1) {
        int calcuate_something = 1 + 2 + 3; // only local visibility, so you dont polutte outside identifiers
        printf("result: %d\n", calcuate_something);
    }

    // 2. "if" statement has an optional "else" clause which executes statements only,
    //    when "if" epxression evaluates to false(0):
    if (0) printf("");
    else printf("nice");
    // or like this
    if (0)
        printf("");
    else
        printf("nice");
    // 2.1 its a better approach to jsut encapsulate into { } the if/esle statments
    if (0) {
        printf("");
    } else {
        printf("nice");
    }
    // or like this (not a nice view)
    if (0) { printf(""); }
    else { printf("nice"); }

    // 3. if/else statements can be nested as much as you want, so better put { } if you dont want,
    //    to sink and read a lot of errors jsut because you forgot to put somewhere { } and failed logic
    if (1) {
        if (1) {
            if (2) {
                if (0) {
                    
                } else {
                    
                }
            } else {
                
            }
        } else {
            
        }
    } else {
        
    }

    // 4. cascaded if/else statements is a way to test something outside else clause without creating
    //    a lot of nested ifs with "else if" helper:
    int c = 0;
    if (c == 1) {}
    else if (c == 2) {}
    else if (c == 0) { printf("nice\n"); }
    else {}
    // 4.1 "else if" is just an ordinary "if" but convenient to not put it inside another "else" nesting

    // 5. braces are especially important with "danglin" esle clause because the C speicifcation explicitly,
    //    tells that first encountered "else" is combines with first encountered "if" taht doesnt have an "else"
    //    clause if { } are not involved:
    if (1) printf("will execute\n");
        if (0) printf("will not execute\n");
    else printf("which if ?\n"); // this "else" is for inner "if", not outer!!!
    // with braces its different:
    if (1) { printf("will execute\n"); 
        if (0) printf("will not execute\n"); }
    else { printf("which if ?\n"); } // this "else" is for outer "if", not inner!!!
    
    // 6. remember, only one if will be executed from whole branches of if/else if
}
