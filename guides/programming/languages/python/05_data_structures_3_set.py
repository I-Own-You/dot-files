# set
# 1. unordered collection without duplicate elements
# 2. sets support math operations like: union, intersection, differnece, symmetric difference, .etc
# 3. sets are created with {} or set()
# 4. set is mutable but with limitation, you can add/remove but not change elements inside like set[0] = 2

basket = {"apple", "orange", "apple", "pear", "orange", "banana"}
print(basket)  # duplicates will be removed
"orange" in basket  # check for membership with in keyword
"crabgrass" in basket
# set operations
a = set("abracadabra")  # {'a', 'b', .etc} without duplicates so unique letters
b = set("alacazam")
a - b  # letters in a but not in b
a | b  # letters in a or b or both
a & b  # letters in both a and b
a ^ b  # letters in a or b but not both

# set also supports comprehension
a = {x for x in "abracadabra" if x not in "abc"}  # rdr

# an empty set is created with set(), not {}, the {} will create a dict
my_empty_set = set()
