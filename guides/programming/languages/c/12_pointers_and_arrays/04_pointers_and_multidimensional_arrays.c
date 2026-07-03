
#define NUM_ROWS 10
#define NUM_COLS 10

// 1. pointers can point to multi dim arrays as well, or in fact to any dimensional arrays

int main() {
    int a[NUM_ROWS][NUM_COLS];
    int row, col;

    // 1. to define all elements as 0 we would create 2 fors and populate the 0 (skip the = {0} method)
    for (row = 0; row < NUM_ROWS; row++)
        for (col = 0; col < NUM_COLS; col++)
            a[row][col] = 0;

    // 2. since we know that pointers can now perform arithmetic based on arrays elements,
    //    and the fact that arrays itself are pointers to first element, we can do this:
    int *p;
    for (p = &a[0][0]; p <= &a[NUM_ROWS - 1][NUM_COLS - 1]; p++) {
        // p starts at [0][0] and gradually increments to [0][1], [0][NUM_COLS -1],
        // then, once last column reached, it goes [1][0] and so on untill [NUM_ROWS - 1][NUM_COLS - 1],
        // it works because p is a pointer to int as with "&a[0][0]" and it must go untill,
        // the address surpasses &a[NUM_ROWS-1][NUM_COLS-1], so its not about range as with,
        // indexes of an array, its about memories, so you cant do like &a[NUM_ROWS][NUM_COLS],
        // since [10][10] is not valid address in our array, because [10][10] is [9][9] right ?
        // you dont have the 11th element on the 11th row, only 10 rows + 10 columns
        *p = 0;
        // also be aware of the fact taht pointer here is for an int, not array,
        // so *(p+n) or p[n] would mean going to next int value, and if you are in an array,
        // it will print +n elements further, which will 99% lead to UB since it will want,
        // the next element after the last from the array
        //
        // also dont rely on [NUM_ROWS-1][NUM_COLS-1] as a boundary because:
        // 1. C standard does not guarantee correctness of comparisons involving last elemeent in all cases
        // 2. optimizations or assumptions can break layout (from compiler)
        // 3. logically unsafe as a general rule
        // the only valid is "&a[0][0] + NUM_ROWS * NUM_COLS" and &a[NUM_ROWS][0]
    } 

    // 3. to process rows of multi dim arrays you can do this:
    int i = 0;
    for (p = a[i]; p < a[i] + NUM_COLS; p++) {
        // it works because a[i] decays into pointer to first element inside a[i] row,
        // we could also do &a[i][0] but why bother, since first element of any row is,
        // by default the first.
        //
        // also, look closesly at the condition, + NUM_COLS, its important, since pointers are not,
        // like indexes where row goes to each row, here it goes by memmory address, which means p++,
        // will go to next element starting from a[i], so a[i] + NUM_COLS is 0 + NUM_COLS, so this,
        // for cycle modifies actually only 1 row, the a[i] itself from first element till the end one
        *p = 0;
    }

    // 4. 
    int j = 0;
    // pay attentioin to the expression of pointer here: (*row_p)[NUM_COLS], this construction,
    // means we have a pointer that can point to a row, not to an element inside a row, and since,
    // we deal with 2d array, we need the column size as well, since the amount of rows is always known
    int (*row_p)[NUM_COLS];
    for (row_p = &a[0]; row_p < &a[NUM_ROWS]; p++) {
        // pay attention to the construction: (*row_p)[j], *row_p inside ( ) are manadatory,
        // if we would have *row_p[j] it means take the j element of *row_p array and then,
        // dereference(indirection) it, which could point to garbage if j is out of bounds for "a",
        // so basically *row_p[j] == a[j][0] or *row_p[0+j][0], so you go to row, and then take,
        // the value (which is always the first element), so the final result is this:
        // p++ goes to next row, [j] gets the j elements, * gets the value, (*p)[j]
        (*row_p)[j] = 0; 
    }
    // 4.1 any array of different DIMENSION can use its name since all of them point to first row,
    //    anyway, this simplifies something:
    for(row_p = a; row_p < a + NUM_ROWS; p++) {
        (*row_p)[j] = 0;

    }

    // 5 also, we can pass a[i] to a function that wants only a 1d array so kind of trick,
    //   the function, a[i] is part of 2d but itself is pointer to first element inside [i] row,
    //   you would ask why ? think about a lot of rows, and you need only one of it, for example to,
    //   make something with it or find it, instead of parsing whole 2d array, just pass the row from it,
    //   but it masks the structure
}
