# tuples
# 1. tuples are immutable, but they can have mutable elements which can be modified
# 2. they usually are access via unpacking(*) or by index
# 3. you can create a tuple in different ways, some are using () or tuple()
# 4. tuple doesnt support comprehension, (x for x in range(10)) would create a generator instead

t = 12345, 54321, "hello!"  # (12345, 54321, "hello")
t[0]  # 12345

# Tuples may be nested:
u = t, (1, 2, 3, 4, 5)  # ((12345, 54321, "hello"), (1,2,3,4,5))

# Tuples are immutable:
# t[0] = 88888 # invalid, tuples are immutable

# but they can contain mutable objects:
v = ([1, 2, 3], [3, 2, 1])  # ([1, 2, 3], [3, 2, 1])
v[0].append(4)
v[1].pop()
print(v)
v  # ([1,2,3,4], [3,2])

# tuple containing 0 elements
empty_elem_tuple = ()

# tuple containing 1 elements
# ("hey") is not valid, "hey", is valid and ("hey",) is also valid, so "," is needed anyway
single_elemt_tuple = ("hey",)

# unpacking a tuple into variables
arb_tuple = (1, 2, 3)
z, x, y = arb_tuple  # arb_tuple must have the same length as variables on the left
