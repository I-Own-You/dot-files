import random

# if else clause
if random.randint(0, 10) <= 5:
    print("less than 5")
elif (
    random.randint(0, 10) == 5
):  # elif is else if, its optional, can be as many as you want
    print("its 5!")
else:  # optional
    print("more than 5")
# you can use and/or/not as Boolean expression
if True and True:
    pass
elif random.randint(0, 10) <= 5 or random.randint(0, 10) == 0:
    pass
elif not (random.randint(0, 10) == 10):
    pass
elif random.randint(0, 10) < random.randint(0, 10) < random.randint(0, 10):
    pass
else:
    pass
# here, you can use and/or/not as general values
my_fruit_1, my_fruit_2, my_fruit_3 = False, "", "lemon"
take_a_fruit = my_fruit_1 or my_fruit_2 or my_fruit_3  # "lemon"
# you can also use like a ternary operator but python specific, this ternary can be used anywhere
take_a_fruit_ternary = my_fruit_3 if my_fruit_3 == "lemon" else "nothing"

# for statement
my_list = [1, 2, 3, 4, 5]
# typical for in other languages let you iterate over a number with a condition and incrementing it,
# in python, its just iterating over a sequence in its order of appearance.
for nr in my_list:
    kek = 2
    print("number: ", nr)
# if you need to iterate over a sequence of numbers there is range() function
for i in range(5):  # 0,1,2,3,4
    print(i)
for i in range(5, 10):  # 5,6,7,8,9
    print(i)
for i in range(0, 10, 3):  # 0,3,6,9
    print(i)
for i in range(-10, -100, -30):  # -10, -40, -70
    print(i)
for i in range(len(my_list)):  # 0,1,2,3,4, so its indexes
    print(i)
# but in most cases if you need indexes and values you can use enumerate() func
# enumerate has a second option argumen which stand for starting index.
for idx, val in enumerate(my_list):
    print("index: ", idx, "\n", "value: ", val)
#
# range() function itself in most cases behave as a list but its not, its an object that returns the next item,
# in the sequence without creating the list, saving space, so an iterable.
sum(range(4))  # 6, 0+1+2+3=6, sum() takes an iterable and takes item one by one

# while statement
while random.randint(0, 10) != 5:
    pass

# break and continue
for nr in range(random.randint(0, 20)):
    if nr != 10:
        continue
    elif nr % 5 == 0:
        break

# loops also have else clause, they fire only if for/while loops terminated naturally, it means no,
# break/return/raised error occured before terminating.
for nr in range(random.randint(0, 20)):
    print(nr)
else:
    print("for finished normally")  # will print because no break/return/error occured
#
while random.randint(0, 20) != 10:
    pass
else:
    print("number 10 found!")  # will print because no break/return/error occured


# pass statement is used when you didnt yet implement the functionality
def my_func():
    pass  # without this, python would complain


# match/case, its basically a swithc/case based on pattern matching
# only the first case encountered as true will fire and exit match.
def http_error(status):
    do_i_pass = random.randint(0, 1)
    match status:
        case 400 | 403 | 401:  # you can combine case options
            return "Bad request"
        case 404:
            return "Not found"
        # you can also add a guard with if clause, if false, goest ot next case
        case 418 if bool(do_i_pass):
            return "I'm a teapot"
        #
        # if status would be a tuple/list/dict you could get needed amount of elements and then unpack it as a name like:
        # case [x,y, *rest/_] or
        # case (x,y,*rest/_) or
        # case {"f_key": x, "s_key": y, **rest} would capture the "f_key" and "s_key" from a dictionary as x,y
        #
        # you can also capture something and assigna nother name like:
        # case (Point(x1, y1), Point(x2, y2) as p2) and now you can call the value by p2
        #
        # literals are compared by equality but True/False/None by identity with (is, it checks the memmory)
        #
        # _ here is a "variable" wildcard that gets to execute if no case matches like default
        case _:
            return "Something's wrong with the internet"

    point = (0, 0)
    match point:
        # you can unpack values from the match into a variable and use it inside the case
        case (0, 0):
            pass
        case (0, y):
            print(y)
        case (x, 0):
            print(x)
        case (x, y):
            print(x, y)
        case _:
            raise ValueError("not a point")


#
def where_is():
    class Point:
        def __init__(self, x, y):
            self.x = x
            self.y = y

    point = Point(0, 0)
    match point:
        case Point(x=0, y=0):
            print("Origin")
        # here, y on the right side will be the value from point.y and assigned to y from Point in the case
        # Point.x will be assigned to 0 and then it will check if this object matches point in match clause
        case Point(x=0, y=y):
            print(f"Y={y}")
        case Point(x=x, y=0):
            print(f"X={x}")
        case Point():
            print("Somewhere else")
        case _:
            print("Not a point")


#
def another_match_example():
    class Point:
        # this is used so when we use in case like Point(x=x,y=y) now just Point(x,y)
        __match_args__ = ("x", "y")

        def __init__(self, x, y):
            self.x = x
            self.y = y

    points = [Point(1, 2), Point(0, 0)]
    match points:
        case []:
            print("No points")
        case [Point(0, 0)]:
            print("The origin")
        case [Point(x, y)]:
            print(f"Single point {x}, {y}")
        case [Point(0, y1), Point(0, y2)]:
            print(f"Two on the Y axis at {y1}, {y2}")
        case _:
            print("Something else")
