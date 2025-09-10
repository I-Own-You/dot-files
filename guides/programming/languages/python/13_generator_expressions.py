# you can create a generator without use of function and "yield" keyword

# 1. they are typically used for an enclosing function
# 2. they are more compact then full generators
# 3. less versatile than full generators
# 4. more memory friendly than equivalent list comprehension

sum(i * i for i in range(10))  # sum of squares

xvec = [10, 20, 30]
yvec = [7, 5, 3]

sum(x * y for x, y in zip(xvec, yvec))  # dot product

unique_words = set(word for line in page for word in line.split())
valedictorian = max((student.gpa, student.name) for student in graduates)
data = "golf"

list(data[i] for i in range(len(data) - 1, -1, -1))
