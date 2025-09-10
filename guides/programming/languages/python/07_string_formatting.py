# you can read more about string formatting rules inside strings module of stdlib

# if you want just a quick representation of string version of something, you could use str() or repr()
# 1. str() returns human readable version of something
# 2. repr() generates a representation that can be understood by python interpreter or give an error if it cant
# 3. if you try to str(an_object), and an_object doesnt have a human readable form, it will return the same as repr()
s = "Hello, world."
str(s)  # "Hello, world."
repr(s)  # ""Hello, world.""
str(1 / 7)  # "0.14285714285714285"
x = 10 * 3.25
y = 200 * 200
s = "The value of x is " + repr(x) + ", and y is " + repr(y) + "..."
print(s)  # The value of x is 32.5, and y is 40000...
hello = "hello, world\n"
hellos = repr(hello)
print(hellos)  # "hello, world\n"
print(repr((x, y, ("spam", "eggs"))))  # "(32.5, 40000, ('spam', 'eggs'))"

table = {"Sjoerd": 4127, "Jack": 4098, "Dcab": 7678}
for name, phone in table.items():
    print(f"{name:10} ==> {phone:10d}")

# you can use python code inside strings using f"", f'', f"""""" (aka, formatted string)
#
# some important things about string formatting
# 1.thisi is the signature: {field_name [alignemnt][sign][width][.precision][type]}
#   1. if no [alignment] is explicitly set, then:
#       1. strings are aligned to the left
#       2. numbers are aligned to the right
#   2. if no [sign] is specified:
#       1. "-" is set by default, which means "-" will appear only for negative numbers
#       2. "+", always appears for positive number
#       3. " ", a space is put in front of positive numbers and a "-" is put in front of negative numbers
#   3. [width] is 0 by default unless specified
#   4. [.precision] is set to default for whole number to show unless constraint applied
#   5. [type] is str() or repr() by default unless specified

year = 2016
event = "Referendum"
f"Results of the {year} {event}"  # "Results of the 2016 Referendum"

# some example
table = {"Sjoerd": 4127, "Jack": 4098, "Dcab": 7678}
for name, phone in table.items():
    print(f"{name:10} ==> {phone:10d}")
# Sjoerd     ==>       4127
# Jack       ==>       4098
# Dcab       ==>       7678

# an example of how to convert a value before its formatted
animals = "eels"
print(f"My hovercraft is full of {animals}.")  # My hovercraft is full of eels.
print(f"My hovercraft is full of {animals!r}.")  # My hovercraft is full of 'eels'.
# !r converts with repr()
# more examples: !a converts to ascii(), !s converts to str()

# an example of how to extend the expression to its value without typing it
bugs = "roaches"
count = 13
area = "living room"
print(f"{bugs=} {count=} {area=}")  # bugs='roaches' count=13 area='living room'
print(f"{bugs=!s} {count=:.2f} {area=}")  # you can even use format rules here

# you can also use str.format() but it requires more manual typin
yes_votes = 42_572_654
total_votes = 85_705_149
percentage = yes_votes / total_votes
# 1. ":-9", ":" start of formatting rules, "-" sign used only for negative numbers, "9" 9 columns for the result,
#    so the number 42572654 has 8 columns width, 1 column at the left is added.
# 2. ":2.2%", ":" start of formatting rules, "2" 2 columns align to right,
#    ".2" how many digits to allow after the fraction(.),
#    "%" multiplies number by 100, and display it with addition of "%" sign at the end
print("{:-9} YES votes {:2.2%}".format(yes_votes, percentage))
# ' 42572654 YES votes  49.67%'

# another example of str.format() with empty {}
print(
    'We are the {} who say "{}!"'.format("knights", "Ni")
)  # We are the knights who say "Ni!"


# another example of str.format() with indices
print("{0} and {1}".format("spam", "eggs"))  # spam and eggs
print("{1} and {0}".format("spam", "eggs"))  # eggs and spam

# another example of str.format() with keyword in {}
print(
    "This {food} is {adjective}.".format(food="spam", adjective="absolutely horrible")
)  # This spam is absolutely horrible.

# another example of str.format() with mix of {} and indices
print(
    "The story of {0}, {1}, and {other}.".format("Bill", "Manfred", other="Georg")
)  # # The story of Bill, Manfred, and Georg.

# another example of str.format() with using a dictionary and indices to access the value within
table = {"Sjoerd": 4127, "Jack": 4098, "Dcab": 8637678}
print("Jack: {0[Jack]:d}; Sjoerd: {0[Sjoerd]:d}; Dcab: {0[Dcab]:d}".format(table))
# you could also do this by passing the dictionary by **(unpacking)
table = {"Sjoerd": 4127, "Jack": 4098, "Dcab": 8637678}
print("Jack: {Jack:d}; Sjoerd: {Sjoerd:d}; Dcab: {Dcab:d}".format(**table))
# taking all local varibles from vars() function
table = {k: str(v) for k, v in vars().items()}
message = " ".join([f"{k}: " + "{" + k + "};" for k in table.keys()])
print(
    message.format(**table)
)  # basically replaces the "{" + k + "};" with table[k] which gives the value

# another example of str.format()
for x in range(1, 11):
    print("{0:2d} {1:3d} {2:4d}".format(x, x * x, x * x * x))
#  1   1    1
#  2   4    8
#  3   9   27
#  4  16   64
#  5  25  125
#  6  36  216
#  7  49  343
#  8  64  512
#  9  81  729
# 10 100 1000
#
# there is an old hack to layout the string which are no more used which gives the same result
for x in range(1, 11):
    print(repr(x).rjust(2), repr(x * x).rjust(3), end=" ")
    print(repr(x * x * x).rjust(4))
#  1   1    1
#  2   4    8
#  3   9   27
#  4  16   64
#  5  25  125
#  6  36  216
#  7  49  343
#  8  64  512
#  9  81  729
# 10 100 1000

# if you need to pad numbers with 0 you can use str.zfill(), it also respects -/+ signs
"12".zfill(5)  # '00012'
"-3.14".zfill(7)  # '-003.14'
"3.14159265359".zfill(5)  # '3.14159265359'

# old way of string fomatting with "%" which should not be used anymore
import math  # noqa

print("The value of pi is approximately %5.3f." % math.pi)
