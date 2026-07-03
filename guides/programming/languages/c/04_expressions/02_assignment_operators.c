// 1. "=" is the operator copy a value from another variable/constant/expression into a variable.

int main() {
    int a, b, c;
    a = 5; // a == 5
    b = a; // b == 5
    c = 10 * a + b; // c == 55, (10 * 5) + 5 = 55
    
    // 1. if someting to be assigned is not the same type as the variable, its converced into,
    //    the type of the variable, if possible.
    float d = a; // c == 5.0f
    a = 22.5f; // a == 22
    // 2. "=" operator is right associative:
    int alpha, beta, gama;
    alpha = beta = gama = 0; // alpha = ( beta = ( gama = 0 )), which order is this:
                             // 1. gama = 0,
                             // 2. beta = gama,
                             // 3. alpha = beta
    // 3. be aware of chaining "=" opeartors:
    int r1;
    float r2;
    r2 = r1 = 33.3f; // 1. r1 = 33
                     // 2. r2 = r1, r2 == 33.0f NOT 33.3f
    // 4. "=" operator requires an L-value at its left opearnd, this means a variable,
    //    which is itself an object in computers memory which can store something:
    // 12 = i; error, a number
    // i + j = 0; error, an expression
    // -i = j; error, an expression
    //

    // 1. compound assignemt:
    int k, j;
    // 2. usually same as k = k + 1 but has situations where its hard to read
    k += 1; 
    // 3. kind of hard to understand now, right ?
    k *= k + 2; // k = k * (k + 2)
    // 4. =+ IS NOT THE SAME AS +=
    k =+ 2; // k = +2
    // 5. weird example
    k += j += k; // k = k + ( j = ( j + k) ) => k = k + j + k
    //
    // try to avoid compund assignment since its easy to make mistakes.
    
}
