# most containers can be looped over with for loop
for element in [1, 2, 3]:
    print(element)
for element in (1, 2, 3):
    print(element)
for key in {"one": 1, "two": 2}:
    print(key)
for char in "123":
    print(char)
for line in open("myfile.txt"):
    print(line, end="")

# why ? because they all implement iterators and precisely __iter__()
# 1. for calls __iter__() on the container object
# 2. __iter__() returns an object that dfines a method __next__() which accesses the elements inside the container one at a time
# 3. when there are no more elements, __next__() raises a StopIteration which tells loop to terminate
# 4. __iter__() can be called with builtin function iter()
# 5. __next__() can be called with buitlin function next()
s = "abc"
it = iter(s)
it  # <str_iterator object at 0x10c90e650>
next(it)  # "a"
next(it)  # "b"
next(it)  # "c"
next(it)  # raises the error StopIteration


# this is how you would create an iterable for your container
class Reverse:
    """Iterator for looping over a sequence backwards."""

    def __init__(self, data):
        self.data = data
        self.index = len(data)

    def __iter__(self):
        # can return just self, because class defines __next__
        return self

    # if __next__ is defined, then __iter__ can just return self
    def __next__(self):
        if self.index == 0:
            raise StopIteration
        self.index = self.index - 1
        return self.data[self.index]


rev = Reverse("spam")
iter(rev)  # <__main__.Reverse object at 0x00A1DB50>

for char in rev:
    print(char)
