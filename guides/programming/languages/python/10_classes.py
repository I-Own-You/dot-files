# 1. class is mainly use to collect lot of code together to work
# 2. class creates a new type of object allowing new instanes of that type to be created
# 3. class instances can have attributes attached to handle its state
# 4. class instances can have methods for modifying state
# 5. class is created at runtime and can be modified later in the program
# 6. classes in python provide all std feature of OOP:
#    1. incapsulation(1.collect all logic, 2.hide data, but its by conventioin, real hide is impossible in pure python)
#    2. inheritance
#    3. polymorhpism
# 7. classes create their own scope

# 1. objects are separate idntities with its state
# 2. objects can be assigned to different variables which will point to the same object in memory (called aliasing)
#     1. this is useful because if 2 variables point to the same object, modifying one, will share the other

# 1. namespace - mapping from name to objects
# 2. most namespaces are implemented as dictionaries
# 3. builtins() is a namespcae, .etc
# 4. object attributes also *kind of* form a namespace
# 5. modules are crreated at different moments and have different lifetimes
#    1. builtin names is created when python interpreter starts and is neve deleted
#    2. global namespace for a module is created when module definition is read and usually lasts untill python ends
#    3. executing a script that with name == __main__ also sets up its own namespace
#    4. function namespace is created when a function is invoked and forgot when return/error raised
#        1. recursive invokation have their own namespace

# 1. attribute
#     object.attribute # definition after "." is an attribute of an object
#     module.some_definition # now it must make sense
# 2. attributes can be read-only or writeable
#    1. writeable:
#       1. you can assign values to it, object.attribute = 10 (works for modules also)
#       2. you can modify them,         object.attribute = 2  (works for modules also)
#       3. you can delete them,         del object.attribute  (works for modules also)

# 1. scope: textual region in python where a namespace is directly accessible.
#    directly accessible: means that an unqualified reference to a name attempts to find the name in the namespace
# 2. scope is defined statically but are used dynamically
# 3. during execution, there are 3 or 4 nested scopes whose namespace are directly accessible:
#    1. innermost scope: searched first, contains local names
#    2. scope of any enclosing function: searched second up untill last enclosing scope reached, (this is not local scope)
#    3. near-last scope: current module global names
#    4. namespace containing builtin names
#
# 3.1
#    1. in global scope, the search is performed in near-last then namespace of builtin names skipping 1/2
#    2. to rebind a variable in innermost scope that comes outside innermost scope, you can use nonlocal keyword:
#       1. nonlocal same_name_from_outside, this modifies the variable outside innermost scope without creating it locally
#       2. if nonlocal is not used, variable is just recreated locally in the innermost scope namespace
#    3. if global/nonlocal is not used inside innermost scope, it creates a new variable in the namespace scope
#    4. global keyword is used to rebind a variable in the global scope, and modify it there
#    5. nonlocal keyword is used to rebind a varible from an enclosing scope, and modify it there

# example in practice for scope with global/nonlocal keywords
def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)


scope_test()
print("In global scope:", spam)
# After local assignment: test spam
# After nonlocal assignment: nonlocal spam
# After global assignment: nonlocal spam
# In global scope: global spam


# class objects have 2 type of operations
# 1. attriubte references
class MyClass:
    """A simple example class"""  # this is like functioin docs accessed via .__doc__

    i = 12345  # class attribute

    def f(self):  # class attribute and also object attribute
        return "hello world"


MyClass.i
MyClass.f

# 2. instantiation
x = MyClass()  # creates an empty object MyClass() and assigns it to local variable x


# classes can define an initial state for its instances with __init__
# 1. when an instantiation happens, __init__() is automatically invoked for the newly created instance
class SomeClass:
    def __init__(self):
        self.data = []


my_x = SomeClass()
my_x.data  # []


# __init__() can have arguments, they are given to class name during instantiation which goes to __init__() if any
class MyComplex:
    def __init__(self, realpart, imagpart):
        self.r = realpart
        self.i = imagpart


x2 = MyComplex(3.0, -4.5)
x2.r, x2.i

# instance objects
# 1. attributes of them are typically kind of its variable
x.counter = 1  # even though the counter attribute doesnt exist inside MyClass, you can assign it outside
while x.counter < 10:
    x.counter = x.counter * 2
print(x.counter)  # 16
# you can also remove attribute assigned outside, MyClass attributes can be removed too, but only if it belongs to the object
del x.counter
# 2. methods like sample functions which do something but belongs to its instance
x.f()  # 'hello world', this is how you call a method object
# since x.f is just a function underneath, you can store it in a variable and call it later
xf = x.f
while True:
    print(xf())
    break
# but the method f() inside MyClass has an argument, why it works without it ?
# x.f() == MyClass.f(x) where f(self) self == x, so self is the instance itself
# methods dont neccessarily need to specify "self" it could be any name, but by conventoin it should be "self"


# difference between class variable(attribute) and instance variables(attributes)
# 1. instalce variable: data unique to each instance
# 2. class variable: attributes and methods shared among all instances
class Dog:
    # so be aware, becaues if you would have a list here that would be modified by all instances,
    # they would all share the content.
    kind = "canine"  # class variable shared by all instances

    def __init__(self, name):
        self.name = name  # instance variable unique to each instance


d = Dog("Fido")
e = Dog("Buddy")
d.kind  # 'canine', shared by all dogs
e.kind  # 'canine', shared by all dogs
d.name  # 'Fido'
e.name  # 'Buddy'


# if there are common names between class/instance variables, the instance variable has priority
class Warehouse:
    purpose = "storage"
    region = "west"


w1 = Warehouse()
print(w1.purpose, w1.region)  # storage west
w2 = Warehouse()
w2.region = "east"
print(w2.purpose, w2.region)  # storage east


# you can also have functions outside class but assigned to variables inside class becoming methods
def f1(self, x3, y3):
    return min(x3, x3 + y3)


# dont rely too much on this, its confusing
class C:
    f = f1

    def g(self):
        return "hello world"

    h = g


# methods can call other variables/methods from its scope(class) by using method attributes with self
class Bag:
    def __init__(self):
        self.data = []

    def add(self, x):
        self.data.append(x)

    def addtwice(self, x):
        self.add(x)
        self.add(x)


# inheritance
# here, DerivedClassName becomes a subclass(derived class) from BaseClassName
# every class derives from the top class (object), its implicitly assigned
class BaseClassName:  # same as class BaseClassName(object)
    pass


class DerivedClassName(BaseClassName):
    pass


# you can have instead of a class any expression which in the end gives a class to derive from
# class DerivedClassName(some_module.BaseClassName):
#     pass
#
# 1. when a derived class is constructed, the base class is remember for future use
# 2. if you access an attriubte inside DerivedClassName and its missign, the resoltuion goes to the dervied class,
#    and to its dervied classes, .etc untill it find it or missing and an error reported
# 3. dervied class can override methods of their base classes and so on
#    1. usually its done for extending the method not for entire replacement
# 4. there is a way to call the base class method if a method with the same name exists in derived class:
#    1. my_base_class.method_name(self, arguments) # my_base_cass must be accessible in global scope
# 5. isinstance() can be used to check an instance type:
#    isinstance(obj, int) == True, if obj.__class__ is int or derived from int
# 6. issubclass() can be used to check class inheritance:
#    issubclass(bool, int) is True, since bool is a sublcass of int
#    issublcass(flaot, int) is False, since flaot is not a subclass of int


# multiple inheritance
#
# searching for attributes in such a scenario goes like this:
#
# 1. DerivedBase
# 2. Base1 and its base classes from left to right
# 3. Base2 and its base classes from left to right
# 4. Base3 and its base classes from left to right
#
# 5. its kind of more complex than above, in fact method resolution dynamically changes the order of checking to support,
#    calls for super(), its usually called call-next-method which is more powerful than in single inheritance approaches
class Base1:
    pass


class Base2:
    pass


class Base3:
    pass


class DerivedBase(Base1, Base2, Base3):
    pass


# private variables
# 1. they are typical variables inside class that cannot be accessed outside class, but they dont exist in python
# 2. but there exist a convention, if a variable is prefixed with "_", then it should be treated as non-public
# 3. if a variable is prfixed with "__" or more, is replaced with _classname__myvariable, where classname is the,
#    the current class we are in and "_" in front of it gets removed, its mostly done for names to not clash inside,
#    all the class chain from below to above(derive to base)
class Mapping:
    def __init__(self, iterable):
        self.items_list = []
        self.__update(iterable)

    def update(self, iterable):
        for item in iterable:
            self.items_list.append(item)

    __update = update  # private copy of original update() method


class MappingSubclass(Mapping):
    def update(self, keys, values):
        # provides new signature for update()
        # but does not break __init__()
        for item in zip(keys, values):
            self.items_list.append(item)


# 1. code passed to exec() or eval() does not consider the classname of the invoking class to be the current class,
#    this is similar to the effect of the global statement,
#    the effect of which is likewise restricted to code that is byte-compiled together.
# 2. same restriction applies to getattr(), setattr() and delattr(), as well as when referencing __dict__ directly.

# you can have kind of "structs" in python like this
from dataclasses import dataclass  # noqa


@dataclass
class Employee:
    name: str
    dept: str
    salary: int


john = Employee("john", "computer lab", 1000)
john.dept  # 'computer lab'
john.salary  # 1000
