# 1. nested function
def outer(x):
    def inner(y):
        return x + y

    return inner


add_five = outer(5)
result = add_five(6)
print(result)  # 11


# 2. pass functions as arguments
def add(x, y):
    return x + y


def calculate(func, x, y):
    return func(x, y)


result = calculate(add, 4, 6)
print(result)  # 10


# 3. return function as value
def greeting(name):
    def hello():
        return "Hello, " + name + "!"

    return hello


greet = greeting("Atlantis")
print(greet())  # "Hello, Atlantis!"


# 4. a simple decorator example
def make_pretty(func):
    # define the inner function
    def inner():
        # add some additional behavior to decorated function
        print("I got decorated")

        # call original function
        func()

    # return the inner function
    return inner


# define ordinary function
def ordinary():
    print("I am ordinary")


# decorate the ordinary function
decorated_func = make_pretty(ordinary)
# call the decorated function
decorated_func()


# 5. a trick to use with "@" to decorate functions
@make_pretty  # here, ordinary2 is passed into make_pretty implicitly
def ordinary2():
    print("I am ordinary")


ordinary2()


# 6. adding parameters to the decorated function
def smart_divide(func):
    def inner(a, b):
        print("I am going to divide", a, "and", b)
        if b == 0:
            print("Whoops! cannot divide")
            return

        return func(a, b)

    return inner


@smart_divide
def divide(a, b):
    print(a / b)


divide(2, 5)
divide(2, 0)


# 7. adding parameters to the decorating function
def smart_divide2(message="I am going to divide"):
    # the point is to add a new function that will take the decorated function which wraps entire logic
    def decorator(func):
        def inner(a, b):
            print(message, a, "and", b)
            if b == 0:
                print("Whoops! cannot divide")
                return
            return func(a, b)

        return inner

    return decorator


@smart_divide2(message="Custom message:")
def divide2(a, b):
    print(a / b)


divide2(2, 5)
divide2(2, 0)


# 8. you can chain decorators
def star(func):
    def inner(*args, **kwargs):
        print("*" * 15)
        func(*args, **kwargs)
        print("*" * 15)

    return inner


def percent(func):
    def inner(*args, **kwargs):
        print("%" * 15)
        func(*args, **kwargs)
        print("%" * 15)

    return inner


# star(percent(printer))
@star
@percent
def printer(msg):
    print(msg)


printer("Hello")
