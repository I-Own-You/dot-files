#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <time.h>

#define NUM_SUITS 4
#define NUM_RANKS 13

// 1. any array can be constant if defind with "const" keyword before its type

// 2. a constant array should not be modified at all(not allowed by the program)

int main() {
    const char a[5] = {'A', 'B', 'C', 'D'};

    // 1. you can only use items from a constant array, not alter it at all
    printf("%c", a[0]);
    
    // a[0] = 'a'; // error

    // 2. an example of constant array usage
    bool in_hand[NUM_SUITS][NUM_RANKS] = {false};
    int num_cards, rank, suit;
    const char rank_code[] = {'2','3','4','5','6','7','8',
                              '9','t','j','q','k','a'};
    const char suit_code[] = {'c','d','h','s'};
    
    srand((unsigned) time(NULL));
    
    printf("Enter number of cards in hand: ");
    scanf("%d", &num_cards);
    
    printf("Your hand:");
    while (num_cards > 0) {
        suit = rand() % NUM_SUITS; /* picks a random suit */
        rank = rand() % NUM_RANKS; /* picks a random rank */
        
        if (!in_hand[suit][rank]) {
            in_hand[suit][rank] = true;
            
            num_cards--;
            
            printf(" %c%c", rank_code[rank], suit_code[suit]);
        }
    }
    printf("\n");
}

// "const" actually works not only for arrays but variables and some other things as well.
