# 1. arguments in functions are passed by value, objects by refernce value to it, so they are mutable for all who shares.
# 2. all functions return explicitly the None if no return value is present., print(my_func) will return None
def fib(n):
    # if the first statement is a string literal, it acts as documentation for the function that you can access,
    # only the first string literal will act as it.
    """Print a Fibonacci series less than n."""
    """wont show in the docs"""
    a, b = 0, 1
    while a < n:
        print(a, end=" ")
        a, b = b, a + b
    print()


# Now call the function we just defined:
fib(2000)


# here, retries and reminder have default value, so no need to specify when calling the funciton
def ask_ok(prompt, retries=4, reminder="Please try again!"):
    while True:
        reply = input(prompt)
        # in keyword tests if a sequences contains a value
        if reply in {"y", "ye", "yes"}:
            return True
        if reply in {"n", "no", "nop", "nope"}:
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError("invalid user response")
        print(reminder)


# ask_ok("hey")  # valid
# ask_ok("hey", "hey")  # valid
# ask_ok("hey", "hey", "hey")  # valid
# ask_ok("hey", reminder="hey")  # valid
# ask_ok("hey", retries="hey")  # valid
# ask_ok("hey", reminder="hey", retries="hey")  # valid
# ask_ok(prompt=2)  # even this is valid, even though prompt is not keyword argument
# ask_ok(
#     reminder="a", prompt=2
# )  # also valid, even though prompt goes second, but guarded by keyword name


# arguments evaluation
i = 5


def f(arg=i):
    print(arg)


i = 6
f()  # 5, since the arguments of a functions are evaluated at the defintion of that function, but only once,


# why its important? because L is initialized with [], but is called below 3 times, since the value is initialized,
# at the functin definition only ONCE, it remembers the L=[] while the gc has access to function, it can lead to bugs
def f2(a, L=[]):
    L.append(a)
    return L


print(f(1))  # [1]
print(f(2))  # [1, 2]
print(f(3))  # [1, 2, 3]
#
# this, would eliminate that problem
# def f(a, L=None):
#     if L is None:
#         L = []
#     L.append(a)
#     return L


# we can pack arguments into tuples with * and dictionaries with **, tuples must come before dictionaries
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])


cheeseshop(
    "Limburger",
    "It's very runny, sir.",  # into tuple
    "It's really very, VERY runny, sir.",  # into tuple
    shopkeeper="Michael Palin",
    client="John Cleese",
    sketch="Cheese Shop Sketch",
)  # keyword arguments will go as dictionary values here


# position and keyword arguments difference
def standard_arg(arg):
    print(arg)


def pos_only_arg(arg, /):
    print(arg)


def kwd_only_arg(*, arg):
    print(arg)


def combined_example(pos_only, /, standard, *, kwd_only):
    print(pos_only, standard, kwd_only)


standard_arg(2)

standard_arg(arg=2)

pos_only_arg(1)

# pos_only_arg(arg=1) # invalid, only pos args

# kwd_only_arg(3) # invalid, only kws args

kwd_only_arg(arg=3)

# combined_example(1, 2, 3) # invalid, third arg must be kwd

combined_example(1, 2, kwd_only=3)

combined_example(1, standard=2, kwd_only=3)

# combined_example(pos_only=1, standard=2, kwd_only=3) # invalid, first arg must be pos


def foo(name, **kwds):
    return "name" in kwds


# error, name will unpack and go to first argument as name = 2 which leads to second argument defined:
# 1. name = 1
# 2. name = 2
foo(1, **{"name": 2})


def foo2(name, /, **kwds):
    return "name" in kwds


# no error
foo2(1, **{"name": 2})


# lambda expressions
#
# just anonymous functions with a single expression allowed
def make_incrementor(n):
    return lambda x: x + n


f = make_incrementor(42)
f(0)  # 42
f(1)  # 43

pairs = [(1, "one"), (2, "two"), (3, "three"), (4, "four")]
pairs.sort(key=lambda pair: pair[1])
pairs  # [(4, "four"), (1, "one"), (3, "three"), (2, "two")]


# example of a function documentation standard
def my_function():
    """Do nothing, but document it.

    No, really, it doesn't do anything.
    """
    pass


print(my_function.__doc__)
# Do nothing, but document it.
#
# No, really, it doesn't do anything.


# function annotations
def ff(ham: str, eggs: str = "eggs") -> str:
    print("Annotations:", f.__annotations__)
    print("Arguments:", ham, eggs)
    return ham + " and " + eggs


ff("spam")
# Annotations: {'ham': <class 'str'>, 'return': <class 'str'>, 'eggs': <class 'str'>}
# Arguments: spam eggs
# 'spam and eggs'
