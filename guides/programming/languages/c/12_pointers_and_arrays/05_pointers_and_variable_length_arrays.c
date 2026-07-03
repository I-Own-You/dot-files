// 1. you can point to VLA arrays with pointers as well
void f(int n) {
    int a[n], *p;
    p = a;
}

// 2. if VLA is 2d+ array, type of pointer depends on the dimension
void f_2(int m, int n) {
    int a[m][n], (*p)[n];
    p = a; 
    
    // 1. pointer arithmetic works with VLA as well:
    int i = 0;
    for (p = a; p < a + m; p++) {
        (*p)[i] = 0;
        i++;
    }
}
