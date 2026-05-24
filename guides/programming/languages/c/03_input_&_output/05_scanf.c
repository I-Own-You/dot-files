#include <stdio.h>

int main() {
    int sphere_radius;
    float pi = 3.14159;
    
    printf("Give a radius for the sphere: ");
    // 1. remember to not put any text inside "scanf" function, it parses only raw input,
    //    so putting a text here will mean "scanf" wants exactly that text to be entered,
    //    so: scanf("Enter a number: %d", &sphere_radius) will actually want exaclty input,
    //    inside "" or it fails and sphere_radius remains unchanged (often a default value given) 
    //    example: scanf("ab   %d", &sphere_radius) will want ab<your number here> in order,
    //    to parse the number given, also if there is a space between the placeholder(%d) in our case,
    //    and something before it and then some characters again, no matter how many spaces there is,
    //    you can just ignore it and input only characters and value of needed type like this:
    //    "ab5", "ab    5" it will work, with spaces after the placeholder it doesnt matter if you type it.
    // 2. putting a "\n" at the end in a "scanf" also makes the program wait for the input for,
    //    a non white-space character which hangs the program after a number is printed if user,
    //    didnt know about this.
    scanf("%d", &sphere_radius);
    
    float sphere_volume = (4.f / 3.f) * pi * (sphere_radius * sphere_radius * sphere_radius);
    
    printf("Sphere volume is: %f\n", sphere_volume);
}
