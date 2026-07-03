
// 1. C compilers dont predict the order of subexpression evaluation, which means,
//    it just depends on the compilers which subexpressions will execute first,
//    THINGS CHANGE IF THESE ARE INVOLVED: logical and, logical or, conditionals, comma operator.

int main() {
   int a, b, c; 
   a = 5;
   // 1. this expression results in UB,
   //    the result will either be 6 if first assignment gets executed b = a + 2, b = 5 + 2, b = 7
   //    the resutl will either be 2 if second assignment gets executed a = 1, b = a + 2, b = 1 + 2, b = 3
   c = (b = a + 2) - (a = 1);
   // ALWAYS AVOID THIS.
   
   // 2. its not only the "=" operator, increment/decrement operators are prone to this too:
   int i, j;
   i = 2;
   // bad, 2 things can happen:
   //                           1. second i is incremented and then 2 * 3 happens
   //                           2. first i taken from memory and multiplied by second i, 3 *2 happens
   j = i * i++; // UB, using someting and altering it inside the same expresion. ALWAYS AVOID THIS.
}
