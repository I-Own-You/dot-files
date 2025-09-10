# although python doesnt have int/float as types itself aside of type like (a: int/float = value),
# the general type is *number* and underneath it is int/float/complex/.etc
a = 2  #         int
b = 3.5  #       float
b1 = 3j  #       complex
#
c = 17 / 3  #          5.666667, "/" always returns floating point
d = 17 // 3  #         5, "//" always discard the fractional part
e = 17 % 3  #          2, returns the remaining
f = 5**2  #            25, 5 * 5 = 25, so its power to operator
g = 2 * 3.5 - 1  #     6.0, mixing types always give floating point result

# text, type used to define text is str
#
# text enclosed inside "" or '' are the same
double_tick_str = "hello"
single_tick_str = 'hello'  # fmt: skip
# here, we need to escape the ', because the whole string is enclosed inside ''
another_string = 'hello\'t'  # fmt: skip
# here, we need to escape the ", because the whole string is enclosed inside ""
another_string2 = "hello\"t"  # fmt: skip
my_string = "'hey'"  # valid
another_my_string = '"hey"'  # valid
new_line = "hey\nits me"  # will print [hey] on the first line, [its me] on the second
escape_sign = "\\"  # you must enclose \ itself with \ becaue \ is used to escape
# formatting is preserved, so whitespace, tabs, .etc
span_multiple_lines = """\
        first line printed
        second line printed\
        still printed on second line because \\ at the end is used to remove \\n put automaticcaly\
        """
# its the same string as if it would be on one line, just more pleasant to look at
break_long_string = (
    "my very very vvery very very very ver long "
    "string string string string string string string"
)
#
str_operations1 = 3 * "a" + "b"  # aaab
str_operations2 = "a" + "b"  # ab
# here, you can concatenate just by putting it near, but dont do that, its confusing
str_operations3 = "p" "y"  # fmt: skip
# str_operations4 = str_operations3 "a" # is invalid, cannot concatenate variable and raw string literal without + operator
# str_operations5 = ('a' * 3) str_operations3 # invalid as well
# str_operations6 = ('a' * 3) "a" # invalid as well
str_operations7 = str_operations3 + "a"  # valid
