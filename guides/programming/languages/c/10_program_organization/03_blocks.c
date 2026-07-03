// 1. { } - is a block where any variable declaration becomes local to its { } with automatic storage duration,
//          its useful if you dont want to have a variable name occupied because you need it only for some,
//          code lines

int main() {
    int i = 1, j = 2;

    if (i < j) {
        // 1. allocated here
        int temp = i;
        i = j;
        j = temp;
    } // deallocated here
}
