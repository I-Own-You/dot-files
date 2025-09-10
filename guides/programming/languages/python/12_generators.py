# generators are a powerful way to create iterators
# 1. they are written as regular functions but use "yield" to return a value
# 2. each time __next__() is called on it, generator resumes where it let off(it remembers all data and statement last executed)


def reverse(data):
    for index in range(len(data) - 1, -1, -1):
        yield data[index]


for char in reverse("golf"):
    print(char)
# "f"
# "l"
# "o"
# "g"

# 1. anything done with generators can be done with class iterators, the point is, generator handles __iter__() and __next__()
#    for you by default
# 2. again, data is remembered between calls(yield)
# 3. StopIteration is raised also automatically for you
