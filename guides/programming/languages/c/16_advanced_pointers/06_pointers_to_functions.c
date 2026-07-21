#include <stdio.h>

#define KEK 2

// 1. pointers actually can point to functions (since functions occupy memory in our program,
//    so everey function has an address like variables do)

// double - function return type
// (*f) - "f" is a pointer to function
// (double) - "f" function has a single argument of double type
double integrate(double (*f)(double), double a, double b);
// this is the same as above from the compilers view
double integrate(double f(double), double a, double b);

double return_number(double x);

void f(int a);

void new_cmd(void);
void open_cmd(void);
void close_cmd(void);
void close_all_cmd(void);
void save_cmd(void);
void save_as_cmd(void);
void save_all_cmd(void);
void print_cmd(void);
void exit_cmd(void);

 int main() {
     // 1. this is how you pass a functioin(pointer to function actually) as an argument,
     //    pay attention, "sin" has no parantheses, you dont call it, you pass it,
     //    this way C produces a pointer to "sin" function istead of genreating code for a,
     //    function call
     double result = integrate(return_number, 5.0, (double)KEK / 2);
     printf("%f", result);

     // 1. C treats pointers to functions as pointers to data, so we can manipulate it as other data,
     //    we can store pointer to function inside variables, or as elements inside an array or 
     //    as members of a structure or even return pointer to functions from a function
     //
     // variable that can store a pointer to a function
     void (*pf) (int); // or void pf(int); its the same
     // if we have a functioin of "void" type and with a single argument of "int" type, here is how we assign
     pf = f;
     // and here is how we would call our pointer to function
     (*pf)(5); // or pf(5);
     //
     // here is an array of pointers to functions
     void (*file_cmd[])(void) = {
         new_cmd,
         open_cmd,
         close_cmd,
         close_all_cmd,
         save_cmd,
         save_as_cmd,
         save_all_cmd,
         print_cmd,
         exit_cmd
     };
     // when a user chooses a number from 0 til 8, we could subscript out array and run,
     // the function on taht index
     int choose;
     scanf("%d", &choose);
     (*file_cmd[choose])(); // or file_cmd[choose]()
 }

void new_cmd(void) {;}
void open_cmd(void) {;}
void close_cmd(void) {;}
void close_all_cmd(void) {;}
void save_cmd(void) {;}
void save_as_cmd(void) {;}
void save_all_cmd(void) {;}
void print_cmd(void) {;}
void exit_cmd(void) {;}

void f(int a) { printf("%d", a); }

double integrate(double f(double), double a, double b) {
    // this is how you invoke a function which is passed by a pointer
    double y = (*f)(a); // double y = f(a);
    // this is the same as above, C allows this
    double yy = f(a);

    return f(a); // f(a) -> a, since return_number returns a number
}

double return_number(double x) {
    return x;
}
