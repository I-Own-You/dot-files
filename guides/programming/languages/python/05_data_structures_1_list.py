# 1. lists are mutable except string literals
# 2. you can create a list in different ways, some are using [] or list()

# strings under the hood is a list, but immutable
my_string = "py"
# index_of_first_char = "p"
index_of_first_char = my_string[0]
# index_of_first_char = "y", [-1] means last character like len(str_operations3) - 1
index_of_first_char2 = my_string[-1]
# index_of_first_char3 = "p", second charater from the end
index_of_first_char3 = my_string[-2]
#
# strings can be sliced, under the hood they are a list anyway
str_example = "hello"
slice_from_string = str_example[0:2]  #  he, from 0 inclusive till 2 exclusive
slice_from_string2 = str_example[2:5]  # llo
slice_from_string3 = str_example[:5]  # hello, from 0 inclusive till 5 exlusive
slice_from_string4 = str_example[-3:]  # llo, -3,-2,-1
slice_from_string5 = str_example[:2] + str_example[2:]  # hello
slice_from_string6 = str_example[4:100]  # o, no error since its a range
slice_from_string7 = str_example[100:]  # "", no error since its a range
# slice_from_string8 = str_example[len(str_example)]  # error, index out of range
# str_example[0] = "s"  # error, strings are immutable
slice_from_string9 = len(str_example)  # 5, returns the length of a sequence

# aside form strings, lists are mutable sequences
my_list = [1, 2, 3]
first_element = my_list[0]  # 1, they are subscriptable as well
new_list = my_list + [4, 5, 6]  # [1,2,3,4,5,6]
new_list[0] = 10  # they are mutable
#
# 1. same as new_list[len(new_list):] = [7]
# 2. same as new_list = new_list + [7]
# 3. but .append() is more efficient
new_list.append(7)  # new_list is now [10,2,3,4,6,7]
#
# 1. same as new_list[len(new_list):] = [8,9]
# 2. same as new_list = new_list + [8,9]
# 3. the difference is that append([8,9]) will add as a list, .extend([8,9]) will unpack as elements
new_list.extend(
    [8, 9]
)  # new_list is now [10,2,3,4,6,7,8,9], with append() it would be [10,2,3,4,6,7,[8,9]]
# there are many more methods on lists.
#
my_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
my_numbers[4:6] = [50, 60]  # my_numbers: [1, 2, 3, 4, 50, 60, 7, 8, 9, 10]
my_numbers[4:6] = []  # my_numbers: [1, 2, 3, 4, 7, 8, 9, 10]
my_numbers[:] = []  # my_numbers: [], same as my_numbers.clear()
len_of_my_numbers = len(my_numbers)  # 10
#
list_to_nest = [1, 2, 3]
nested_list = [list_to_nest, list_to_nest, list_to_nest]  # [[1,2,3], [1,2,3], [1,2,3]]

# list comprehension
# 1. a way to create lists with certain specifics in one line
squares = []
for x in range(10):
    squares.append(x**2)
squares_lambda = list(map(lambda x: x**2, range(10)))
# this is the list compreheension, which is more elegant and clean
squares = [x**2 for x in range(10)]
#
# another complex example
# the (x, y) is creating a tuple with 2 elements, you could have [](list) or {}(dict) or a method like sum(x,y)
kind_of_ugly = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
# same as, the order of for for if is the same as you notice
combs = []
for x in [1, 2, 3]:
    for y in [3, 1, 4]:
        if x != y:
            combs.append((x, y))

# you can use "del" statement to remove an element, entire list, a range from a list and much more:
my_2_list = [1, 2, 3, 4, 5]
del my_2_list[0]  # my_2_list = [2,3,4,5]
del my_2_list[0:2]  # my_2_list = [4,5]
del my_2_list[:]  # my_2_list = []
del my_2_list  # my_2_list is entirely removed a name and cannot be referenced anymore

# you can use enumerate() to get index/value in a loop
for i, v in enumerate(["tic", "tac", "toe"]):
    print(i, v)

# to loop through multiple sequences and get their elements there is zip() useful function
questions = ["name", "quest", "favorite color"]
answers = ["lancelot", "the holy grail", "blue"]
for q, a in zip(questions, answers):
    print("What is your {0}?  It is {1}.".format(q, a))

# to loop in a reversed order in a sequence therer is reversed() funciton
for i in reversed(range(1, 10, 2)):
    print(i)

# to loop in a sorted order in a sequence therer is sorted() funciton
# it also returns a new list (bear in mind, it can affect performance)
basket = ["apple", "orange", "apple", "pear", "orange", "banana"]
for fruit in sorted(basket):
    print(fruit)

# you can eliminate duplicates by using set on a sequence, add sorted and you get sorted sequnce of unique elements
basket = ["apple", "orange", "apple", "pear", "orange", "banana"]
for f in sorted(set(basket)):
    print(f)

# you can unpack a list with * notation
my_another_list = [1, 2, 3]
list(range(*my_another_list))

# some trick with "*"
trick_list = [1] * 5  # [1,1,1,1,1]
