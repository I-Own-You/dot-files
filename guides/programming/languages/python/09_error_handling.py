# there are 2 kind of errors:
#   1. syntax errors
#   2. exceptions

# syntax errors: parsing errors, like broken code that cant be interprted
# while True print('Hello world') # error, since after True, we must have ":" for valid code

# exceptions:
#   1. occurs while executing valid code that causes a logic error
#   2. they are not fatal if handled
#   3. programs dont handle errors by themselves, its programmers duty to do so
# "2" + 2 # its a logical error since in python we cant concatenate string and int but its valid code

# python has a lot of builtin exceptions, some of them:
print(ZeroDivisionError, NameError, TypeError)
# they are not reserved keywords, just builtin classes

# how to actually handle an excepion programmatically:
counter = 10
while counter:
    counter -= 1
    # you try to do something
    try:
        x = int(input("Please enter a number: "))
        break
    # you except the error from "try" block, if any
    # 1. if "try" block has no error, then except will not fire
    # 2. if an error occurs, all lines below the line which created the error will be skipped and go to except
    # 3. except here catches only ValueError errors, so if you put something that int() cant parse,
    #    the error will be catched by the below exception
    # 4. if an error occurs inside try, but the except doesnt handle it, the error is passwed into outside try/except, if any
    #    1. if outside try/except doesnt handle the error it goes again outside untill it finds an except that,
    #       has the needed except with its error or no more try/except outside remains.
    #    2. an empty except without error catches everyting.
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")

# except can handle more than 1 error type, but will handle only one from it
counter = 10
while counter:
    counter -= 1
    try:
        # print(aloha)  # NameError
        10 / 0  # ZeroDivisionError
        int("a")  # TypeError
    # except will catch the first error occured inside try, which is NameError and thats it.
    except (ZeroDivisionError, TypeError, NameError):
        pass

# you can have multiple exceptions but only one will handle the error
elem = "a"
try:
    int(elem)  # error
    1 / 0  # error
# this will trigger
except TypeError:
    pass
# this will not trigger
except ZeroDivisionError:
    pass

# you can specify a variable after the exception error:
#   1. the variable will bound to the exception instance which has some, useful methods/properties
#   2. builtin exception types have __str__() to be able to print arguments without accessign the .args property
try:
    raise Exception("spam", "eggs")
except Exception as inst:
    print(type(inst))  # the exception type,        # <class 'Exception'>
    print(inst.args)  # arguments stored in .args,  # ('spam', 'eggs')
    print(inst)  # same as inst.__str__(),          # ('spam', 'eggs')
    # inst.args can be overriden in exception classes
    x, y = inst.args
    print("x =", x)  # x = spam
    print("y =", y)  # y = eggs

# 1. BaseException is the common base class for all exceptions
# 2. Exception is a subclass of BaseException, and its a base class for all non fatal exceptions
# 3. exceptioins that are not subclass of Exception are not typically handled, because usually they show program must exit.
#    some of them:
#        1. SystemExit raised by sys.exit()
#        2. KeyboardInterrupt usually raised wit CTRL-C or whatever

# Exception usually can be used as an exception for all errors to catch anything, but only as the last resort,
# because you must be always precise which error you need to handle and leave Exception at the end to hande it anyway

# usually, the Exception is used for printing/loggin and then re raising the error for outside try/except to haandle it
import sys  #

try:
    f = open("myfile.txt")
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error:", err)
except ValueError:
    print("Could not convert data to an integer.")
except Exception as err:
    print(f"Unexpected {err=}, {type(err)=}")
    raise

# try/except has an else clause that goes only after except, its called only if try block didnt raise any error
for arg in sys.argv[1:]:
    try:
        f = open(arg, "r")
    except OSError:
        print("cannot open", arg)
    else:
        print(arg, "has", len(f.readlines()), "lines")
        f.close()


# errors in try/except are handled from anywhere if triggered from try block
def this_fails():
    x = 1 / 0


try:
    this_fails()
except ZeroDivisionError as err:
    print("Handling run-time error:", err)

# using "raise" keyword you can raise errors
try:
    # 1. argument of raise must be an exception instance or a subclass of BaseException
    raise NameError("HiThere")
except:
    pass
try:
    # 2. you can call class without ( ), it will automatically instantiate like a shorthand
    raise ValueError
except:
    pass

# if you want to check if an error was raised but dont want to handle it, you can just raise it again inside except
try:
    raise NameError("HiThere")
except NameError:
    print("An exception flew by!")
    # raise

# you can chain exceptions
try:
    open("database.sqlite")
except OSError:
    raise RuntimeError("unable to handle error")
# 1. FileNotFoundError: [Errno 2] No such file or directory: 'database.sqlite'
# 2. RuntimeError: unable to handle error (raise RuntimeError("unable to handle error"))


# you can simplify the above code by specifying that an exception comes from another exception with "from" keyword
def func():
    raise ConnectionError


try:
    func()
except ConnectionError as exc:
    pass
    # raise RuntimeError("Failed to open database") from exc
# 1. ConnectionError
# 2. RuntimeError: Failed to open database (raise RuntimeError('Failed to open database') from exc)
# the point is, at the 2 error, there is "from exc" which gives context

# you can also disable the automatic exception chaingin with "from None"
# 1. the point is that by default if you raise an exception in except clause, the exception from try block will be attached,
#    in __context__ and __cause__ for the error raised inside except clause, and both erorrs will be shown,
#    first inside except, second from try,
#    but with from None you only tell python to show the raised error from within except clause and drop that from try
try:
    open("database.sqlite")
except OSError:
    pass
aloha = 2
# raise RuntimeError from None
# 1. RuntimeError (raise RuntimeError from None)

# you can define your exceptions(class) deriving from Exception directly/indirectly
# typically you put Error at the end of your personal error class

# there is a clause that is triggered no matter what inside try/except, its "finally"
try:
    raise KeyboardInterrupt
except:
    pass
finally:
    print("Goodbye, world!")
# how it works:
# 1. finally triggers as a last task before try block finishes, no matter exception was raised or not inside try
# 2. if an exception occurs and an except clause is present, its handled by it, if not, finally executes and then,
#    exception is reraised
# 3. if an exception occurs during except/else, finlly executes, then exception is reraised again
# 4. if finally has break/continue/return exceptions are not reraised
# 5. if try has break/continue/return, finally will execute till its own break/continue/return, so try has priority
# 6. if both try/finally have return, finally has priority


# you can group exceptions to raise them together with ExceptionGroup
def f2():
    excs = [OSError("error 1"), SystemError("error 2")]
    raise ExceptionGroup("there were problems", excs)


f2()
# + Exception Group Traceback (most recent call last):
# |   File "<stdin>", line 1, in <module>
# |     f()
# |     ~^^
# |   File "<stdin>", line 3, in f
# |     raise ExceptionGroup('there were problems', excs)
# | ExceptionGroup: there were problems (2 sub-exceptions)
# +-+---------------- 1 ----------------
#   | OSError: error 1
#   +---------------- 2 ----------------
#   | SystemError: error 2
#   +------------------------------------


# ExceptionGroup itself is an exception that can be raised
try:
    f2()
except Exception as e:
    print(f"caught {type(e)}: e")  # caught <class 'ExceptionGroup'>: e


# we can handle an exception from the group of a certain type using except with "*" at the end,
def f3():
    raise ExceptionGroup(
        "group1",
        [
            # exceptions insde exception groups must be instantiated, not types
            OSError(1),
            SystemError(2),
            ExceptionGroup("group2", [OSError(3), RecursionError(4)]),
            # the exception group number 2 will be reraised because the except* below doesnt handle it
        ],
    )


try:
    f3()
# except* used multiple times will extract every error of that type from the first level grpup at least,
# the amount of except* times appearing, a simple except would exit after the first except.
except* OSError as e:
    print("There were OSErrors")
except* SystemError as e:
    print("There were SystemErrors")
#
# There were OSErrors
# There were SystemErrors
#   + Exception Group Traceback (most recent call last):
#   |   File "<stdin>", line 2, in <module>
#   |     f()
#   |     ~^^
#   |   File "<stdin>", line 2, in f
#   |     raise ExceptionGroup(
#   |     ...<12 lines>...
#   |     )
#   | ExceptionGroup: group1 (1 sub-exception)
#   +-+---------------- 1 ----------------
#     | ExceptionGroup: group2 (1 sub-exception)
#     +-+---------------- 1 ----------------
#       | RecursionError: 4
#       +------------------------------------

# usually, when you raise an error, you give additional information within paranthesis ('custom info'),
# but there is a way to add more info inside exceptions notes list using .add_note(note), where note is a simple string,
# those notes appear after the message of the exception Exception('my message') on the next line in the traceback in order
# they were added
try:
    raise TypeError("bad type")
except Exception as e:
    e.add_note("Add some information")
    e.add_note("Add some more information")
    # raise
# TypeError: bad type
# Add some information
# Add some more information
