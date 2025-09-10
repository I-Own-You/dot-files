# json module in python can take python data and convert it to a string representation (serializing)
# desearilization is the reverse of serialization

import json

x = dict(kek=2)
json_str = json.dumps(x)
print("1", json_str)

# if you have a file in which you want to store the serialized data you can use
f = open("kek.json", "w+")
json.dump(x, f)
# to decode the data from the file in which you stored json, you can use
# you need to chagne the position within the file because the json.dump(x, f) wrote to the file and now the position is at,
# the end, and json.load(f) will try to read from the end, which is nothing, which occures into an error
f.seek(0)
xx = json.load(f)
print("2", xx)

# more coplex data types like classes needs more complex typing, json module from stdlib has tutorial

# there is also pickle protocol which allows serialization/desearilization of python complex code
