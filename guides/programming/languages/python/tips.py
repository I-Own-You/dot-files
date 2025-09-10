# 1.
# simple assignment (=) never copies data.
#
# when you assign a list to a variable, it refers to the existing list,
# so if you change any data which is shared with others, it will modify for all.
my_list = [1, 2, 3]
my_new_list = my_list
id(my_list) == id(my_new_list)  # True
my_new_list.append(4)
print(my_list)  # [1,2,3,4]
# all slice operations return shallow copy:
# (basically means taking all values and put copies of it in new returned value) except objects,
# they still hold a reference
my_list2 = my_list[:]
my_list2.append(5)  # my_list2: [1,2,3,4,5]
print(my_list)  # [1,2,3,4]
# but if there would be an object inside the list, modifying it would still affect all shares in a shallow copy,
# only a deep copy would eliminate all the references.

# 2.
# assignment on the same line of multiple variables
a, b = 0, 1
b, a = a, b

# 3.
# .append(element) method on list variables is more efficient than list + [element]

# 4.
###########################################################################################
# VERY IMIPORTANT!!!!!!!
# 1. only modules(.py files), functions(def)/lambda, classes, comprehensions(list, set, dict) and generators
#    introduce a new SCOPE.
# 2. it means variables inside a new scope are not available outside it
# 3. so be aware a variable defined everywhere else will be available:
# example
for x in range(5):
    for y in range(5):
        for z in range(5):
            for a in range(5):
                for c in range(5):
                    if c == 1:
                        new_var = 20
                    try:
                        another_var = 30
                    except:
                        pass
                    pass
print(x, y, z, a, c, new_var, another_var)  # all are seen!!!
###########################################################################################

# 5.
# to check if 2 objects are the same you can use is/not is operator
True is True
False is not True
# to check a membership existence you can use in / not in operator
1 in (1, 2, 3)
2 not in [1, 3]

# 6.
import sys  # noqa

# how modules are imported and found ?
# 1. when you import a module called "car"
# 2. interpreter searche a builtin module named "car" from:
print(sys.builtin_module_names)
# 3. if not found there, it looks for a module called "car" in a list of folders inside:
print(sys.path)
# 4. this variable is initialized from:
#    1. folder containing the script or current folder if no file specified as script
#    2. PYTHONPATH environment variable(list of folders)
#    3. installation-dependendent default (site-packages folder handled by site module)
# 5. after initialization program can modify the sys.path
# 6. folder containing the script is put at the beggining of the search path so before stdlib so this means scripts from the
#    folder will load instead of the scripts from stdlib with the same name
#
# how python speeds up loading modules ?
# 1. python caches compiled versions of each module in the __pycache__ folder under the name module.version.pyc
# 2. because of the naming convention, it can store different versions, .etc
# 3. how it recompiles ?
#    1. its automatically, it checks the date modification of the source file and compiled date of the cache
# 4. python does not check the cache in 2 scenario:
#    1. modules loaded from the command line
#    2. if there is no source file:
#       1. to be able to support a cache without source file(compiled only) the compiled module must be in the source folder,
#          and there must be a source module
# 5. compiled module doesnt run faster than .py file, it just loads faster, tahts it.
# 6. you can compile multiple modules in a folder with "compileall" module


# 7
# in interactive mode(python interpreter) you can define some startup actions everytime you enter it but only interactive mode
# 1. you must define PYTHONSTARTUP=my_file.py
# 2. in this file you can have any action you need

# 8
# you can customize python by using "site" module
# 1. there are mainly 2 files to do so:
#     1. usercustomize.py taht must be created in user site specific folder which you can find like this:
#          1. import site; site.getusersitepackages(), ther result is your folder
#          2. this file will affect every invocation of python(not only interactive mode)
#          3. if you use python with "-s" argument, your file wont work, because "-s" disables autoimport of modules
#     2. sitecustomize.py must also be in its folder which you can find like this:
#          1. import site; site.getsitepackages(), the result is your folder
#          2. this file also affects every invocation of python
#          3. this file gets imported before usercustomize.py file, so its more like a global file for everyting,
#             like config for everyone, and then they can define usercustomize.py for themselves, usually its created,
#             by an admin or whatever above a simple user.

# 9
# isinstance() can be used to check an instance type:
# isinstance(obj, int) == True, if obj.__class__ is int or derived from int
#
# issubclass() can be used to check class inheritance:
# issubclass(bool, int) is True, since bool is a sublcass of int
# issublcass(flaot, int) is False, since flaot is not a subclass of int

# 10
# values considered false:
#     1. constants defined to be false: None and False
#     2. zero of any numeric type: 0, 0.0, 0j, Decimal(0), Fraction(0, 1)
#     3. empty sequences and collections: '', (), [], {}, set(), range(0)
