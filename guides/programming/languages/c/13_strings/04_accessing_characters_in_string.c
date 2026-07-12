#include <stdio.h>

// 1. we can use indexes to access elements of an array based string

int count_spaces(const char s[]) {
    int count = 0, i;
    for (i = 0; s[i] != '\0'; i++)
        if (s[i] == ' ')
            count++;
    return count;
}

int count_spaces_p(const char *p) {
    int count = 0;
    for (; *p != '\0'; p++)
        if (*p == ' ')
            count++;
    return count;
}


int main() {
    char s[] = "My st ri ng ";
    int spaces = count_spaces(s);

    printf("Input: \"%s\"\n", s);
    printf("Amount of spaces: %d\n", spaces);
    
    char s2[] = "My st ri ng s d f";
    spaces = count_spaces_p(s2);
    
    printf("Input: \"%s\"\n", s2);
    printf("Amount of spaces: %d\n", spaces);

}
