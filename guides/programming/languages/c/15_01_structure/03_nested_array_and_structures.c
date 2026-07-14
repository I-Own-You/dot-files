#include <stdio.h>
#include <string.h>

#define FIRST_NAME_LEN 30
#define LAST_NAME_LEN 30

// 1. structures and arrays can be combined:
//    1. arrays can have structures as their elements
//    2. structures can contain arrays and structures as their members

// 1. structures as members of other strucutres
struct person_name {
    char first[FIRST_NAME_LEN + 1];
    char middle_initial;
    char last[LAST_NAME_LEN + 1];
};
//
struct student {
    // here is how you can have a member of structure type inside another structure
    struct person_name name;
    int id, age;
    char sex;
} student1, student2;

// strucutre needed for demonstration of array of structures
struct dialing_code {
    char *country;
    int code;
};

int main(void) {
    // 1. here is how you can access a member of a structure within your strucutre(the structure inside,
    //    the strucutre is actaully also a member btw)
    strcpy(student1.name.first, "Fred");
    // 2. this is actaully useful, if you would pass a structure to a function which wants the student person_name
    //    strucutre type, you could just do studen.person_name

    // 1. here is how you can store and manipulate array of strucutres
    //   usually you initialize an array of structures if it wont be modified during program, notice "const",
    //   so its just the same array actaully, jsut different type and more features 
    const struct dialing_code country_codes[] =
       {{"Argentina", 54}, {"Bangladesh", 880},
        {"Brazil", 55}, {"Burma (Myanmar)", 95},
        {"China", 86}, {"Colombia", 57},
        {"Congo, Dem. Rep. of", 243}, {"Egypt", 20},
        {"Ethiopia", 251}, {"France", 33},
        {"Germany", 49}, {"India", 91},
        {"Indonesia", 62}, {"Iran", 98},
        {"Italy", 39}, {"Japan", 81},
        {"Mexico", 52}, {"Nigeria", 234},
        {"Pakistan", 92}, {"Philippines", 63},
        {"Poland", 48}, {"Russia", 7},
        {"South Africa", 27}, {"South Korea", 82},
        {"Spain", 34}, {"Sudan", 249},
        {"Thailand", 66}, {"Turkey", 90},
        {"Ukraine", 380}, {"United Kingdom", 44},
        {"United States", 1}, {"Vietnam", 84}};

    // here is how you access them, usually it will be inside a loop, so you access the needed structure,
    // through indexes, then get the member, it can be nested on multiple levels so be aware, its easy,
    // to fall inside these constructions
    printf("%s", country_codes[0].country);
    printf("%d", country_codes[0].code);
}

