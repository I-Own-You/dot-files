# transoforms and returns data
#
# abs() - return absolute value of a number
# ascii() - return a string containing a printable representation of an object, escapes non-ASCII characters in the string
# bin() - return binary representation of a number prefixed with "0b" as string
# chr() - return string represetnation(character) of an integer
# ord() - if the argument is a one-character string, return the Unicode code point of that character.
# complex() - convert a single string/number/imaginary+real part into complex number
# float() - return a floating-point number constructed from a number or a string.
# int() - return an integer object constructed from a number or a string, or return 0 if no arguments are given.
# hex() - convert an integer number to a lowercase hexadecimal string prefixed with “0x”.
# oct() - convert an integer number to an octal string prefixed with “0o”.
# str() - return a str version of object
# repr() - return a string containing a printable representation of an object.
# format() - convert a value to a “formatted” representation, as controlled by format_spec.
# sorted() - return a new sorted list from the items in iterable.
# round() - return number rounded to ndigits precision after the decimal point.
# pow() - return base to the power exp
# min() - return the smallest item in an iterable or the smallest of two or more arguments.
# max() - return the largest item in an iterable or the largest of two or more arguments.
# zip() - iterate over several iterables in parallel, producing tuples with an item from each one.
# sum() - sums start and the items of an iterable from left to right and returns the total.

# iterable/iterator
#
# aiter() - return an asynchronous iterable
# anext() same as next() but for async iterators
# enumerate() - return an enumerate object
# filter() - construct an iterator from those elements of iterable for which function is true
# range() - returns an iterable
# iter() - return an iterator object for an iterable
# next() - retrieve the next item from the iterator by calling its __next__() method.
# reversed() - return a reverse iterator.
# map() - return an iterator that applies function to every item of iterable, yielding the results.

# true/false check
#
# bool() - return a boolean representaion of a value
# all() - return if all elements of iterable all True or if iterable is empty
# any() - return if any element of iterable is True, False if iterable is empty
# callable() - returns True if an object is callable(has __call__)

# debugger
#
# breakpoint() - invokes debugger when called

# returns new data type
#
# bytearray() - return a new array of bytes that is mutable
# bytes() - return an object with new sequnce of immutable data
# list() - constructs a list from an iterable
# tuple() - returns a tuple
# dict() - constructs a dictonary
# set() - returns a set
# frozenset() - return a new frozenset object, optionally with elements taken from iterable.

# object operations
# hasattr() - the result is True if the string is the name of one of the object’s attributes, False if not.
# getattr() - return the value of the named attribute of object. name must be a string.
# setattr() - the function assigns the value to the attribute, provided the object allows it.
# delattr() - removes an attribute from an object
# hash() - return the hash value of the object (if it has one).
# id() - return the “identity” of an object. (2 objects can have same memmory)
# isinstanceof() - return True if the object argument is an instance of the classinfo argument, or of a
#                  (direct, indirect, or virtual) subclass thereof.
# issubclass() - return True if class is a subclass (direct, indirect, or virtual) of classinfo.
# object() -  1. this is the ultimate base class of all other classes.
#             2. it has methods that are common to all instances of Python classes.
#             3. when the constructor is called, it returns a new featureless object.
#             4. the constructor does not accept any arguments.
#             5. object instances do not have __dict__ attributes,
#                so you can’t assign arbitrary attributes to an instance of object.
# property() - return a property attribute.
# super() - return a proxy object that delegates method calls to a parent or sibling class of type.
# memoryview() - return a “memory view” object created from the given argument.

# help functions
#
# print() - print objects to the text stream file, separated by sep and followed by end.
# input() - stores input provided by user into a variable
# len() - return the length (the number of items) of an object.
# open() - open file and return a corresponding file object.
#           sep, end, file, and flush, if present, must be given as keyword arguments.
# dir() - without arguments, return the list of names in the current local scope.
#         with an argument, attempt to return a list of valid attributes for that object.
# divmod() - return a pair of numbers consisting of their quotient and remainder when using integer division.
# type() - with one argument, return the type of an object.
# slice() - return a slice object representing the set of indices specified by range(start, stop, step).

# related to local variables/modules namespaces
#
# vars() - return the __dict__ attribute for a module, class, instance, or any other object with a __dict__ attribute.
# locals() - return a mapping object representing the current local symbol table
# globals() - return the dictionary implementing the current module namespace.

# advanced stuff
#
# compile() - compiles source into a code or AST object
# eval() - the expression argument is parsed and evaluated as a Python expression (technically speaking, a condition list)
#          using the globals and locals mappings as global and local namespace.
# exec() - this function supports dynamic execution of Python code.
# help() - invoke the built-in help system.
# __import__() - the function imports the module name,
#                potentially using the given globals and locals to determine how to interpret the name in a package context.

