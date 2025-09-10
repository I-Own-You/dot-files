# descriptor - gives the ability to customize attribute lookup, storage, deletion
# 1. it defines __get__, __set__, __delete__ methods
# 2. it can can have __set_name__ method which is used in cases:
#     1. a descriptor needs to know either the class where it was created
#     2. the name of class variable it was assigned to
#
#     __set_name__ will be called even if class is not a descriptor
# 3. is invoked with "." only, if invoked indirectly(vars(some_class)[descriptor_name]), it will just return,
#    the descriptor instance without invoking it.
# 4. works only as a class variable, as instance attribute it has no effect
# 5. is needed basically when you need a class variable that needs to do something when its looked up
# 6. __set__ and __delete__ are called data descriptors, __get__ non-data descriptor
# 7. data descriptor has priority over an instance attribute with the same name,
#    instance attribute has priority over non-data descriptor with the same name
# 8. to define a read only descriptor you must define __get__ and __set__(with raised error of AttributeError)


class Ten:  # Ten class is a descriptor
    def __get__(self, obj, objtype=None):
        return 10


class A:
    x = 5  # Regular class attribute
    # to use a descriptor you must store it as a class variable in a nother class
    y = Ten()  # Descriptor instance


a = A()  # Make an instance of class A
# the a.__dict__['x'] is looked up
a.x  # 5
# 1. __get__ method of the descriptor is called from Ten class
# 2. the value returned from __get__ is computed on demand(when you access it)
a.y  # 5

# DYNAMIC LOOKUPS

import os


class DirectorySize:
    # self = size from Directory
    # obj = g or s instance of Directory from below
    # objtype = Directory class
    def __get__(self, obj, objtype=None):
        return len(os.listdir(obj.dirname))


class Directory:
    size = DirectorySize()  # Descriptor instance

    def __init__(self, dirname):
        self.dirname = dirname  # Regular instance attribute


s = Directory("songs")
g = Directory("games")
# The songs directory has twenty files
s.size  # 20
# The games directory has three files
g.size  # 3
# Delete a game
os.remove("games/chess")
# File count is automatically updated
g.size  # 2

# MANAGES ATTRBIUTES
import logging

logging.basicConfig(level=logging.INFO)


class LoggedAgeAccess:
    def __get__(self, obj, objtype=None):
        value = obj._age
        logging.info("Accessing %r giving %r", "age", value)
        return value

    def __set__(self, obj, value):
        logging.info("Updating %r to %r", "age", value)
        obj._age = value


class Person:
    age = LoggedAgeAccess()  # Descriptor instance

    def __init__(self, name, age):
        self.name = name  # Regular instance attribute
        self.age = age  # Calls __set__()

    def birthday(self):
        self.age += 1  # Calls both __get__() and __set__()


mary = Person("Mary M", 30)  # The initial age update is logged
# INFO root:Updating 'age' to 30
dave = Person("David D", 40)
# INFO root:Updating 'age' to 40

vars(mary)  # The actual data is in a private attribute
# {'name': 'Mary M', '_age': 30}
vars(dave)
# {'name': 'David D', '_age': 40}

mary.age  # Access the data and log the lookup
# INFO root:Accessing 'age' giving 30
# 30
mary.birthday()  # Updates are logged as well
# INFO root:Accessing 'age' giving 30
# INFO root:Updating 'age' to 31

dave.name  # Regular attribute lookup isn't logged
# 'David D'
dave.age  # Only the managed attribute is logged
# INFO root:Accessing 'age' giving 40
# 40


class LoggedAccess:
    def __set_name__(self, owner, name):
        self.public_name = name
        self.private_name = "_" + name

    def __get__(self, obj, objtype=None):
        value = getattr(obj, self.private_name)
        logging.info("Accessing %r giving %r", self.public_name, value)
        return value

    def __set__(self, obj, value):
        logging.info("Updating %r to %r", self.public_name, value)
        setattr(obj, self.private_name, value)


# when this class is created, the __set_name__ from LoggedAccess is called with
# 1. name = LoggedAccess()
# 2. age = LoggedAccess()
# 3. so its there before we even create an instance of Person class
class Person:
    name = LoggedAccess()  # First descriptor instance
    age = LoggedAccess()  # Second descriptor instance

    def __init__(self, name, age):
        self.name = name  # Calls the first descriptor
        self.age = age  # Calls the second descriptor

    def birthday(self):
        self.age += 1


vars(vars(Person)["name"])
# {'public_name': 'name', 'private_name': '_name'}
vars(vars(Person)["age"])
# {'public_name': 'age', 'private_name': '_age'}

pete = Person("Peter P", 10)
# INFO root:Updating 'name' to 'Peter P'
# INFO root:Updating 'age' to 10
kate = Person("Catherine C", 20)
# INFO root:Updating 'name' to 'Catherine C'
# INFO root:Updating 'age' to 20

vars(pete)
# {'_name': 'Peter P', '_age': 10}
vars(kate)
# {'_name': 'Catherine C', '_age': 20}
