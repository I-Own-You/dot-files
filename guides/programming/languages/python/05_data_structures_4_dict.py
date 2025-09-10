# dict
# 1. dict is mutable
# 2. supports unpacking by (**) operator
# 3. keys must be immutable, values whatever, tuples can be used as keys but if no mutable elements are present
# 4. you can create a dict in different ways, some are using {} or dict(sequence)
# 5. dict supports comprehension
# 6. you can remove a key/value pair with "del" statememt

tel = {"jack": 4098, "sape": 4139}
tel["guido"] = 4127
tel  # {'jack': 4098, 'sape': 4139, 'guido': 4127}
tel["jack"]  # 4098
del tel["sape"]  # accessing this key below would cause an error
tel["irv"] = 4127
tel  # {'jack': 4098, 'guido': 4127, 'irv': 4127}
list(tel)  # ['jack', 'guido', 'irv'], in inserted order above
sorted(tel)  # ['guido', 'irv', 'jack'], sorted order of keys alphabetically
"guido" in tel  # True
"jack" not in tel  # False

# dict constructor can be used to construct a dict
dict(
    [("sape", 4139), ("guido", 4127), ("jack", 4098)]
)  # {'sape': 4139, 'guido': 4127, 'jack': 4098}

# dict comprehension
{x: x**2 for x in (2, 4, 6)}  # {2: 4, 4: 16, 6: 36}

# if keys are simple strings, you can omit ",'
dict(sape=4139, guido=4127, jack=4098)  # {'sape': 4139, 'guido': 4127, 'jack': 4098}

# you can use items() method to gain key/value pair in a loop
knights = {"gallahad": "the pure", "robin": "the brave"}
for k, v in knights.items():
    print(k, v)


# you can unpack a dict with ** notation
def parrot(voltage, state="a stiff", action="voom"):
    print("-- This parrot wouldn't", action, end=" ")
    print("if you put", voltage, "volts through it.", end=" ")
    print("E's", state, "!")


d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
parrot(**d)
