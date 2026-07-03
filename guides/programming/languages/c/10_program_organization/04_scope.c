

// 1. when you define an identifier, you actually can hide other with the same name,
//    so there are different scopes which means the inner you go the more is hide from outer:

int i;

void f (int i ) {
    i = 1; // i is from parameter
}

void g (void) {
    int i = 2; 

    if (i > 0) {
        int i;
        i = 3; // i is from inside if, not funciton
    }

    i = 4; // i is from inside the function at the top
}

void h(void) {
    i = 5; // i is from global variable at the top of the program
}

int main() {
    
}

// this is how a program would be organized in a file:
// 
//              #include directives
//              #define directives
//              Type definitions
//              Declarations of external variables
//              Prototypes for functions other than main
//              Definition of main
//              Definitions of other functions
