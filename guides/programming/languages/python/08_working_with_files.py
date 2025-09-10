# open() returns a file object(can be real file on disk, buffer, stdio, sockets, pipes, .etc)
# 1. file objects usually are of 3 types:
#    1. raw binary files
#    2. buffered bifnary file
#    3. text files
f = open("workfile", "w", encoding="utf-8")
# 1. first argument is the file opened
# 2. the mode in which we open:
#     1. 'r' opened for reading from (default, if mode is omitted)
#     2. 'w' opened for write to a file, if a file existed with the same name, it will be deleted
#     3. 'a' opened for appendting to a file at the end
#     4. 'r+' opened for both read/write
#     5. 'b' appended to the end of mode will open file in binary mode, it means read/write is performed in bytes objects,
#         it also means you cannot specify encoding if you open the file in binary mode
# 3. encoding keyword stands for the encoding of the file which you read/write from, if its not specified then the OS,
#    is responsible for the file type.
#    1. usually, the file is opened in text mode
#    2. "utf-8" is the modern encoding which all files should use
# 4. in text mode:
#    1. reading: convert platform-specific line endings (\n on Unix, \r\n on Windows) to just \n.)
#    2. writing: the default is to convert occurrences of \n back to platform-specific line endings.
#
#    this behind-the-scenes modification to file data is fine for text files,
#    but will corrupt binary data like that in JPEG or EXE files.
#    so use binary mode when reading and writing such files.
#
# 5. there are many other arguments.

# 1. to read some data from a file either in text mode(string returned) or binary mode(bytes returned) you can use .read(size?)
# 2. if you omit the size argument or its negative, then whole file will be read, if its larger than pc RAM youre cooked
# 3. in text mode, size will be the amount of characters returned
# 4. in binary mode, size will be the amount of bytes returned
f.read()  # will return the whole file
f.read()  # empty, because file returned all the content above

# 1. .readline() reads a single line from the file including '\n' on all lines except last line of file if there is not '\n'
# 2. if .readline() returns empty string, the end of the file is reached
# 3. a blank line('\n') means file contains a single blank line, but not empty
f.readline()  # 'This is the first line of the file.\n'
f.readline()  # 'Second line of the file\n
f.readline()  # ''

# 1. for looping through all file lines effiiently you could use for loop
for line in f:
    print(line, end="")
# This is the first line of the file.
# Second line of the file

# if you want a list of lines of a file you could use these code
lines_from_file = list(f)
same_lines_from_file = f.readlines()

# write to a file, it returns the number of character written
f.write("This is a test\n")

# to write something else than string you must conver them either to string(text  mode) or binary(binar y mode)
value = ("the answer", 42)
s = str(value)
f.write(s)

# you could use f.tell() to get the position in a file since the beggining as number of bytes in binary mode and,
# simple opaque number in text mode
print(f.tell())

# you could use f.seek(offset, whence) to change file object positions, how it works:
# 1. it adds [offset] to reference point(selected by [whence] argument)
# 2. if [whence] == 0, begginig of file (by default, if its omitted)
# 3. if [whence] == 1, current position of file
# 4. if [whence] == 2, end of the file
f2 = open("workfile", "rb+")
f2.write(b"0123456789abcdef")
f2.seek(5)  # Go to the 6th byte in the file
f2.read(1)
f2.seek(-3, 2)  # Go to the 3rd byte before the end
f2.read(1)
# 1. in text files(opened without 'b'), seeks relative to the beggining of the file are allowed exception is seek(0,2),
# 2. valid offset are those returned by f.tel() or 0, any other offset produces undefined behaviour
#
# there are many other methods to work on files, stdlib has them.


# usually you must use with open() instead of .open() files with try/finally because it always releases the resources
with open("workfile", encoding="utf-8") as ff:
    read_data = ff.read()
print(ff.closed)  # True
# using f.write() or f.close() without [with open()] could result in data not fully written even if programm ended succeessfully
ff.close()  # might not cause error, but does nothing since with open() already closed it
ff.read()  # error
# with works not only with files but with different resources that have cleanup logic
