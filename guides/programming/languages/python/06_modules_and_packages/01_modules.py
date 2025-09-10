# module
# 1. basically a python file or a python script that has some functionality which can be used outside of it
# 2. mostly if contains definitions and some statements
# 3. module has a name(my_program) and suffix(.py) so my_program.py
# 4. you can access the module name inside the module via __name__ variable
# 5. it can have executable statements:
#     1. they are executed only once when module name is encountered in an import statement(kind of initializing the module)
#     2. if the file is executed as a script
# 6. modules can import other modules, its not mandatory to import at the top but is an elegant way of doing so
# 7. a module is imported once in interpreter session (python terminal), so if you change it, you must restart session or
#    use importlib.reload()

# this lines imports only the fibo name, not all names from its module within
import fibo

fibo.fib(5)
fibo.fib2(5)
print(fibo.__name__)  # 'fibo'
# you could assign the function to a variable
my_fib = fibo.fib

# this line imports the names from within module directly but not the fibo name itself
from fibo import fib, fib2  # noqa  "noqa is for ruff to not complain about top level import"

fib(5)
fib2(10)

# this line imports all names except those starting with _, do not use this at all, many bugs!!!
from fibo import *  # noqa

# you can change the name of an imported module with "as" keyword
import fibo as my_fibo  # noqa

my_fibo.fib(10)
my_fibo.fib2(10)

# you can also change the name of an imported name from within module with "as" keyword
from fibo import fib as my_fib  # noqa

my_fib(5)

# when you execute such code [python my_file.py args](script), this way, __name__ is set to __main__
# you could have a block code inside the my_file.py file which will also execute if it has below code:
if __name__ == "__main__":
    import sys

    fib(int(sys.argv[1]))
# so it means a module can be executed as a script triggering this code block and also imported somewhere and used,
# for its content outside of this block code because the above code will run only if you execute a module as a script.

# python has a lot of builtin modules (stdlib)
import sys  # noqa
import math  # noqa
import random  # noqa
# but some modules are platform specific so available on some, not available on others.
# .etc

# you can find out which names does a module contain with "dir()" function
dir(sys)
# without argumetn to "dir()", it just lists the variable names you defined locally + some builtin
dir()
# "dir()" does not list the builtin functions/variables, for this you want the "builtins" module and "dir(builtins)"
import builtins  # noqa

dir(builtins)
