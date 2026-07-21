#include <stdio.h>
#include <stdlib.h>
#include <string.h>


// 1. linked list will be an example of a combinations usage of structures, pointers and 
//    dynamic allocation

struct node {
    int value;
    // "structn node" is a simple structure tag, so next variable is of type "struct node *",
    // so a pointer which points to a strucut node type
    //
    // a member can have a type of the structure which he is declared only with addition
    // of "struct tag/type name" in front of variable, which means a struct tag works,
    // and a typdef defined struct also works, but you will need "struct" in front of the type name:
    // struct Node *next; if you would have typedef struct {int value; struct Node *next;} Node;
    //
    // whats *next actually holds ? the address of addition structure, thats it, it knows nothing,
    // about it, it just points to an address of struct node type, why not a simple variable without a pointer ?
    // because a compiler must know the size of the variable, so it must know the next -> next -> next -> .etc
    // but it doesnt know how many we will have, right ? so its an inifinite lookup, pointer fixes it,
    // the structure is there on this address, thats it, and its also NULL without initialization
    struct node *next;
    // without a structure name so "anonymous" there is no way to have a member point to the structure
};

struct node *add_to_list(struct node *list, int n);

int main(void) {
    // we set the first node as NULL since list initially is empty
    struct node *first = NULL;

    // we need a temporary node that will eventually be inserted into the list but not yet
    struct node *new_node;

    // we need to allocate memory for the new node (since each node points to a structure)
    new_node = malloc(sizeof(struct node));

    // now we give a value to our node
    (*new_node).value = 10; // (*new_node) is needed inside ( ) because "." has priority over *
    // but its very tedious to write all the tiime (*my_pointer) so C provides a shortcut: ->
    new_node->value =  10;
    // -> is an lvalue, you can use it as you can use variables:
    // scanf("%d", &new_node->value);
    // precedence of -> is the same as "." so, its among the highest ones

    // what the hell, we are giving new node the head of the list ????? yes, why ??
    // because its LIFO in our case, everytime we input a new node, we basically make it head,
    // and other nodes are not lost, their are just next in out hierarchy of pointers where,
    // every new node becomes previous when another one is inserted which becomes the head
    // 
    new_node->next = first;
    // why can we do this ? because remember, new_node points to a block in memory of "struct node" size,
    // so we allocate again and again memory for it and just repeat the process of giving values and assigning,
    // next node as head by doing first = new_node, and new_node->next = first gets all the previous nodes
    new_node = malloc(sizeof(struct node));
    new_node->value = 20;
    new_node->next = first;
    first = new_node;
    
    // at some point you will want a function that can automate the nodes addition, pay attention to the fact,
    // that the functioin doesnt modify the first node, it only passes for previous nodes to assign,
    // and then function returns the newly created node and then assign it to first node
    first = add_to_list(first, 10);
    first = add_to_list(first, 20);
}

// adding a node to the list
struct node *add_to_list(struct node *list, int n) {
    struct node *new_node;
    
    new_node = malloc(sizeof(struct node));
    
    if (new_node == NULL) {
        printf("Error: malloc failed in add_to_list\n");
        exit(EXIT_FAILURE);
    }

    new_node->value = n;
    new_node->next = list;
    
    return new_node;
}

// searching for a node in a list, 4 versions
struct node *search_list(struct node *list, int n) { 
    struct node *p;
    for (p = list; p != NULL; p = p->next) {
        if (p->value == n) {
            return p;
        }
    }
    return NULL;
    
    // what list points to now ? it points to a local memory which is killed when function ends,
    // since all local variable inside functions have automatic storage
    // 
    // list = &(struct node){.value=10,.next=NULL};
    //
    // trying to return it creates a dangling pointer, this is why you knew returning local pointers is UB,
    // but didnt know why because the address that is returned is still pointed to by the variable which receives the,
    // function result, but doing something with it is UB, you basically would have to assign NULL to it,
    // since free() isnt needed because the pointer was local and after function execution it was,
    // freed automatically
    //
    // return &(struct node){.value=10,.next=NULL}; // UB
}
struct node *search_list2(struct node *list, int n) { 
    for (; list != NULL; list = list->next) {
        if (list->value == n) {
            return list;
        }
    }
    return NULL;
}
struct node *search_list3(struct node *list, int n) {
    for (; list != NULL && list->value != n; list = list->next) {
        ;
    }
    // or a while, since we have only the condition
    while (list != NULL && list->value != n) {
        list = list->next;
    }
    return list;
}
struct node *search_list4(struct node *list, int n) {
    return list;
}

// deleting a node from the list
struct node *delete_from_list(struct node *list, int n) {
    // this is one of multiple techniques to performa deletion of a node from a list
    
    // we maintain the current and previous node
    struct node *cur, *prev;

    // perform a loop to find the node and maintain the previous node
    for (cur = list, prev = NULL;
         cur != NULL && cur->value != n;
         prev = cur, cur = cur->next);
    // you can actually drop the second condition check and do everything in for loop with continue, .etc,
    // but this version above is cleaner, for/while loop body would be needed probably in more hard cases,
    // where you need to perform something more
    
    // check if node wasnt found
    if (cur == NULL) {
        return list; /* n was not found */
    }
    
    // check if its actually the first node that is needed since above in for cycle,
    // we have cur = list, prev = NULL, if prev = cur never happened it means the condition
    // cur->value != n was satisfied before first cycle so we just delete the node by,
    // giving the actuall head node its next node
    if (prev == NULL) {
        list = list->next; /* n is in the first node */
    }
    
    // perform the deletion by giving the previous node the next node of the current node we found
    else {
        prev->next = cur->next; /* n is in some other node */
    }
    
    // release the memory of the current node we found
    free(cur);
    
    return list;
}

// Ordered list:
// 1. A linked list whose nodes are kept in sorted order (ascending or descending).
// 2. When inserting a new node, it must be placed in the correct position so that the list remains sorted.
//
// so if you chose ascending order, it means every new node must be bigger then previous nodes,
// and if its not, you traverse the list until you find the needed node and update the list
